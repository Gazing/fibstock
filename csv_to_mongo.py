import csv
import json
import pandas as pd
import pymongo

import sys, getopt, pprint

#CSV to JSON Conversion
csvfile = open('./data/trainReal.csv', 'r')
reader = csv.DictReader( csvfile )
myclient = pymongo.MongoClient("18.219.233.150:27017")
database = myclient['fibstock']
collection = database['trainingData']
header= ["title", "link", "publishedAt", "isFake"]

for each in reader:
    row={}
    for field in header:
        row[field]=each[field]
    collection.insert_one(row)
myclient.close()
