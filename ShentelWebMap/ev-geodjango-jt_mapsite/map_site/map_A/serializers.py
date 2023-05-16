from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import Marker, design, FiberCable, SpliceClosure

class MarkerSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Marker
        fields = ("id", "name", "issue")
        geo_field = "location"

class DesignSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = design
        fields = ('ogc_fid', 'globalid', 'muuid',  'mav_site', 'node_type', 'node_config', 'label', 'inventory_status', 'comments', 'gis_id', 
                  'symbol_id', 'created_user', 'last_edited_user',  'eversource_id', 'approved')
        geo_field = "wkb_geometry"

class FiberCableSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = FiberCable
        fields = ('ogc_fid', 'placement', 'cable_use', 'status', 'hierarchy', 'owner', 'workorderid', 'globalid', 'cable_type', 'muuid', 'name', 'shape_length')
        geo_field = "wkb_geometry"

class SpliceClosureSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = SpliceClosure
        fields = ('ogc_fid', 'closure_make', 'closure_size', 'closure_use', 'closure_splicecapacity', 'hierachy', 'placement', 'status', 'owner', 'globalid', 'structureid', 'name')
        geo_field = "wkb_geometry"