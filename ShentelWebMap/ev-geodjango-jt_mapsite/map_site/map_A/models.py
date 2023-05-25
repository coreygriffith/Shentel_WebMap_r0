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
    ogc_fid = models.AutoField(primary_key=True)
    placement = models.CharField(max_length=100)
    cable_use = models.CharField(max_length=100)
    status = models.IntegerField()
    hierarchy = models.CharField(max_length=100)
    owner = models.CharField(max_length=100)
    workorderid = models.CharField(max_length=100, null=True, blank=True)
    globalid = models.UUIDField()
    cable_type = models.CharField(max_length=100)
    muuid = models.UUIDField()
    name = models.CharField(max_length=100, null=True, blank=True)
    shape_length = models.FloatField(null=True)
    wkb_geometry = models.LineStringField(null=False)

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = "fibercable"

####################################################################################

class SpliceClosure(models.Model):
    ogc_fid = models.AutoField(primary_key=True)
    closure_make = models.CharField(max_length=100)
    closure_size = models.CharField(max_length=100)
    closure_use = models.CharField(max_length=100, null=True, blank=True)
    closure_splicecapacity = models.IntegerField(null=True, blank=True)
    hierachy = models.IntegerField()
    placement = models.CharField(max_length=100)
    status = models.IntegerField()
    owner = models.CharField(max_length=100)
    globalid = models.UUIDField()
    structureid = models.UUIDField()
    name = models.CharField(max_length=100, null=True, blank=True)
    wkb_geometry = models.PointField(null=False)

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = "spliceclosure"