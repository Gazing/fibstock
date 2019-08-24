import requests
import csv
import json
import pandas as pd
import pymongo

input = input('Enter company name: ')
url = 'https://newsapi.org/v2/everything?q=' + input + '&pageSize=100&apiKey=efd324e53e494216b672fcea329bb317'

response = requests.get(url)
jsonRes = response.json()

myclient = pymongo.MongoClient("18.219.233.150:27017")
database = myclient['fibstock']
collection = database['news']

for res in jsonRes.get('articles'):
    row = {
        'title': res.get('title'),
        'link': res.get('url'),
        'publishedAt': res.get("publishedAt")
    }
    collection.insert_one(row)
print(collection)
myclient.close()
