import os
import json
os.environ.setdefault('DJANGO_SETTINGS_MODULE','uber.settings')
import django
django.setup()

from django.contrib.gis.geos import Point
import csv 

from driver.models import AllData


def main():
    print("am working")

    json_data = "data/data.json"

    with open(json_data, 'r') as myfile:
        jdata = json.load(myfile)
        # csv_reader = csv.DictReader(csv_file)
        
        for line in jdata:
            pid = line['pid']
            name = line['name']
            lat = line['latitude']
            lng =  line['longitude']
            vicinity = line['vicinity']
            rating = line['rating']
            coord = Point(float(lng),float(lat))
            print(pid)
            data = AllData(pid=pid,name=name,rating=rating,vicinity=vicinity,geom=coord)
            data.save()

if __name__ == "__main__":
    main()

