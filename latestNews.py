import requests
import csv
import json
import pandas as pd
import pymongo

# input = input('Enter company name: ')


companies = ["Nvidia", "Adobe", "Twitter", "Comcast", "AT&T", "Verizon", "News Corp.", "Fox", "Walmart", "Target", "Costco"]

myclient = pymongo.MongoClient("18.219.233.150:27017")
database = myclient['fibstock']
collection = database['news']
coll = []
check = {}

for company in companies:
    url = 'https://newsapi.org/v2/everything?q=' + company + '&pageSize=100&apiKey=efd324e53e494216b672fcea329bb317'

    response = requests.get(url)
    jsonRes = response.json()


    for res in jsonRes.get('articles'):
        row = {
            'title': res.get('title'),
            'link': res.get('url'),
            'publishedAt': res.get("publishedAt")
        }
        if (row["title"] not in check):
            coll.append(row)
            check[row["title"]] = 1

collection.insert_many(coll)

myclient.close()
