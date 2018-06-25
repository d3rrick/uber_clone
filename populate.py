import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','uber.settings')
import django
django.setup()

from django.contrib.gis.geos import Point
import csv 

from driver.models import TestDriver


def main():
    print("am working")

    csv_data = "data/data.csv"

    with open(csv_data, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        
        for line in csv_reader:
            name = line['name']
            icon = line['icon']
            lat = line['latitude']
            lng =  line['longitude']
            description = line['vicinity']
            coord = Point(float(lng),float(lat))
            data = TestDriver(name=name, icon=icon, description=description,geom=coord)
            data.save()

if __name__ == "__main__":
    main()

# import csv
# import requests
# import urllib.request, json 
# # import pandas as pd


# def get_bustops():
#     base_url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={},{}&radius={}&type={}&keyword={}&key=AIzaSyBLkJ1gRz6kZflxbqI74k3IEwETD943EtQ'
#     INPUT_FILE = "towns_coords.csv"
#     types = ['airport', 'amusement_park', 'aquarium', 'art_gallery', 'atm', 'bakery', 'bank', 'bar', 'beauty_salon', 'book_store', 'bus_station', 'cafe', 'campground', 'car_dealer', 'car_rental', 'car_repair', 'car_wash', 'casino', 'cemetery', 'church', 'city_hall', 'clothing_store', 'convenience_store', 'courthouse', 'dentist', 'doctor', 'electrician', 'electronics_store', 'embassy', 'fire_station', 'funeral_home', 'furniture_store', 'gas_station', 'gym', 'hair_care', 'hardware_store', 'hindu_temple', 'home_goods_store', 'hospital', 'insurance_agency', 'jewelry_store', 'laundry', 'lawyer', 'library', 'liquor_store', 'local_government_office', 'locksmith', 'lodging', 'meal_delivery', 'meal_takeaway', 'mosque', 'movie_rental', 'movie_theater', 'moving_company', 'museum', 'night_club', 'painter', 'park', 'parking', 'pet_store', 'pharmacy', 'physiotherapist', 'plumber', 'police', 'post_office', 'restaurant', 'roofing_contractor', 'rv_park', 'school', 'shoe_store', 'shopping_mall', 'spa', 'stadium', 'storage', 'store', 'subway_station', 'supermarket', 'synagogue', 'taxi_stand', 'train_station', 'transit_station', 'travel_agency', 'veterinary_care']
#     x = -1.2921
#     y = 36.8219
#     z = 'nairobi'
#     r = 8999999
#     ls=[]
#     for k in types:
#         with urllib.request.urlopen(base_url.format(x,y,r,k,z)) as url:
#             lawyer_details_data = url.read()
#             lawyer_details_response = json.loads(lawyer_details_data)
#             lawyer_object = None
#             if lawyer_details_response:
#                 try:
#                     cd = lawyer_details_response['results']
#                     for data in cd:	
#                         d = {}
#                         d['pid']=data['id']				
#                         d['name'] = data['name']
#                         d['latitude'] =data['geometry']['location']['lat']
#                         d['longitude'] = data['geometry']['location']['lng']
#                         d['vicinity'] = data['vicinity']
#                         d['rating'] = data['rating']
#                         ls.append(d)
#                 except:
#                     pass
#     print(ls)
#     return [dict(i) for i in set([tuple(d.items()) for d in ls])]