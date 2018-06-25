from django.db import models
from django.contrib.gis.db import models as geomodels



class TestDriver(models.Model):
    name = models.CharField(max_length=250)
    icon = models.CharField(max_length=250)
    description = models.CharField(max_length=250)
    geom = geomodels.PointField(srid=4326)
    objects=geomodels.GeoManager()

class AllData(models.Model):
    pid = models.CharField(max_length=250)
    name = models.CharField(max_length=250)
    geom = geomodels.PointField(srid=4326)
    vicinity = models.CharField(max_length=255)
    rating = models.FloatField()
    objects=geomodels.GeoManager()
