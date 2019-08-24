import pymongo
import numpy as np
import pandas as pd

import matplotlib.pyplot as plt
from IPython.display import display, HTML

from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer

from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.naive_bayes import MultinomialNB
from sklearn import metrics
from sklearn.metrics import accuracy_score, recall_score, precision_score, confusion_matrix


mongoClient = pymongo.MongoClient("mongodb://18.219.233.150:27017")
fibstock = mongoClient["fibstock"]

print("Collecting data from db:")
trainingDataCursor = fibstock.train.find()

trainingData = []

for doc in trainingDataCursor:
    trainingData.append(doc)

df = pd.DataFrame.from_dict(trainingData)
display(df)

contextCursor = fibstock.trainContext.find()

print("Collecting context data...")

contextData = []

for doc in contextCursor:
    contextData.append(doc)

df_context = pd.DataFrame.from_dict(contextData)
display(df_context)

nb_context = MultinomialNB(alpha = 0.36)
cvec_context = CountVectorizer(ngram_range=(1, 3))
df_context["isRelevant"] = df_context["isRelevant"].map({False: 0, True: 1})

X2 = df_context["title"]
y2 = df_context["isRelevant"]

print("Training context model:")

X2_train, X2_test, y2_train, y2_test = train_test_split(X2,
                                                    y2,
                                                    random_state=42,
                                                    stratify=y2)
cvec_context.fit(X2_train)

X2cvec_train = cvec_context.transform(X2_train)
X2cvec_test = cvec_context.transform(X2_test)

nb_context.fit(X2cvec_train, y2_train)
print("score:")
print(nb_context.score(X2cvec_test, y2_test))

nb = MultinomialNB(alpha = 0.36)
cvec = CountVectorizer(ngram_range=(1, 3))

df["isFake"] = df["isFake"].map({"FALSE": 0, "TRUE": 1})

X = df["title"]
y = df["isFake"]

print("Training...")
X_train, X_test, y_train, y_test = train_test_split(X,
                                                    y,
                                                    random_state=42,
                                                    stratify=y)

# Fit and transform the vectorizor
cvec.fit(X_train)


Xcvec_train = cvec.transform(X_train)
Xcvec_test = cvec.transform(X_test)

# Fit the classifier
nb.fit(Xcvec_train,y_train)

# create predictions
print("Prediction score:")
preds = nb.predict(Xcvec_test)
print(nb.score(Xcvec_test, y_test))

print("Moving onto news:")

news = []

for doc in fibstock.news.find():
    news.append(doc)

df_news = pd.DataFrame.from_dict(news)

news_cvec = cvec.transform(df_news["title"])

news_preds = nb.predict(news_cvec)

print("news predictions:")
print(news_preds)

print("Pushing to db:")

companyNames = []
for doc in fibstock.companies.find():
    companyNames.append(doc["name"])

modeledNews = []
context_vec = cvec_context.transform(df_news["title"])
context_preds = nb_context.predict(context_vec)

for i in range(len(news_preds)):
    mentions = []
    for name in companyNames:
        if (name.lower() in news[i]["title"].lower()):
            mentions.append(name)
    

    if (context_preds[i] == 1):
        modeledNews.append({
            'title': news[i]["title"],
            'link': news[i]["link"],
            'publishedAt': news[i]["publishedAt"],
            'isFake': False if news_preds[i] == 0 else True,
            'mentions': mentions
        })

fibstock.modeledNews.insert_many(modeledNews)

count = {False: 0, True:0}
for doc in modeledNews:
    count[doc["isFake"]] += 1

print(count)
print("score:")
print(count[False] / (count[False] + count[True]))



