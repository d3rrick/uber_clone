from django.shortcuts import render
from driver.models import TestDriver,AllData
from django.core.serializers import serialize
from django.http import HttpResponse


def home(request):
    return render(request, 'base.html')

def test_data(request):
    drivers = serialize('geojson', TestDriver.objects.all())
    return HttpResponse(drivers, content_type='json')

def all_data(request):
    drivers = serialize('geojson', AllData.objects.all())
    return HttpResponse(drivers, content_type='json')
