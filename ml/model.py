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
for i in range(len(news_preds)):
    mentions = []
    for name in companyNames:
        if (name.lower() in news[i]["title"].lower()):
            mentions.append(name)
    
    for mention in mentions:
        fibstock.companies[mention].news.insert_one({
            'title': news[i]["title"],
            'link': news[i]["link"],
            'publishedAt': news[i]["publishedAt"],
            'isFake': False if news_preds[i] == 0 else True
        })




