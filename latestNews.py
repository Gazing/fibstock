import requests
import csv
import json
import pandas as pd
import pymongo
from psaw import PushshiftAPI

api = PushshiftAPI()


input = input('Enter company name: ')
news = list(api.search_submissions(subreddit='news',
                                filter=['title', 'url', 'num_comments', 'author', 'score', 'created_utc'],
                                limit=150000))

myclient = pymongo.MongoClient("18.219.233.150:27017")
database = myclient['fibstock']
collection = database['news']

coll = []
for submission in news:
    coll.append({
        'title': submission.title,
        'link': submission.url,
        'publishedAt': submission.created_utc,
        'author': submission.author
    })

collection.insert_many(coll)

myclient.close()
