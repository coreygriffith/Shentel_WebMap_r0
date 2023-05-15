from django.contrib.gis.db import models


class Marker(models.Model):
    name = models.CharField(max_length=255)
    issue = models.CharField(max_length=255)
    location = models.PointField()

    def __str__(self):
        return self.name
    class Meta():
        managed = False
        db_table = "map_A_marker"
    
# joe migrate this so that we can see about making features from a geojson
class design(models.Model):
    #name = models.CharField(max_length=255)
    node_type = models.IntegerField()
    #geometry = models.PointField()
    created_user = models.CharField(max_length=255)
    globalid = models.CharField(max_length=50)
    #objectid = models.IntegerField()
    muuid = models.CharField(max_length=50)
    eversource_id = models.CharField(max_length=255)
    mav_site = models.CharField(max_length=255)
    node_config = models.IntegerField()
    label = models.CharField(max_length=255)
    inventory_status = models.IntegerField()
    gis_id = models.CharField(max_length=255)
    symbol_id = models.CharField(max_length=255)
    #created_date = models.DateField(null=True, blank=True)
    last_edited_user = models.CharField(max_length=255)
    last_edited_date = models.DateField(null=True, blank=True)
    wkb_geometry = models.PointField(srid=4326)
    comments = models.CharField(max_length=255)
    approved = models.BooleanField(default=None, null=True)
    ogc_fid = models.IntegerField(primary_key = True)

    def __str__(self):
        return self.ogc_fid

    class Meta():
         managed = False
         db_table = "map_A_test"

############################################################################################


class FiberCable(models.Model):
    ogc_fid = models.IntegerField(primary_key = True)
    placement = models.IntegerField()
    cable_use = models.IntegerField()
    status = models.IntegerField()
    hierarchy = models.IntegerField()
    owner = models.BigIntegerField()
    workorderid = models.CharField(max_length=100, null=True)
    globalid = models.UUIDField()
    cable_type = models.BigIntegerField()
    muuid = models.CharField(max_length=38)
    name = models.CharField(max_length=100, null=True)
    shape_length = models.FloatField(null=True)
    wkb_geometry = models.LineStringField(null=True)

    class Meta:
        managed = False
        db_table = "fibercable"

####################################################################################

class SpliceClosure(models.Model):
    ogc_fid = models.IntegerField(primary_key = True)
    closure_make = models.IntegerField()
    closure_size = models.IntegerField()
    closure_use = models.IntegerField(null=True)
    closure_splicecapacity = models.IntegerField(null=True)
    hierarchy = models.IntegerField()
    placement = models.IntegerField()
    status = models.IntegerField()
    owner = models.BigIntegerField()
    globalid = models.UUIDField()
    structureid = models.CharField(max_length=38)
    name = models.CharField(max_length=100, null=True)
    wkb_geometry = models.PointField(null=True)

    class Meta:
        managed = False
        db_table = "spliceclosure"