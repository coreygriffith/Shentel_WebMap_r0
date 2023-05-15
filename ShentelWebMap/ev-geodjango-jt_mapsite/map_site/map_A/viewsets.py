from rest_framework import viewsets
from rest_framework_gis import filters

from map_A.models import Marker
from map_A.models import design
from map_A.serializers import MarkerSerializer
from map_A.serializers import DesignSerializer


class MarkerViewSet(viewsets.ReadOnlyModelViewSet):
    #set the location as a field to filter our markers, and then a filter based on the bound box
    bbox_filter_field = "location"
    filter_backends = (filters.InBBoxFilter,)
    #also return all our Marker instances, without limitations or filters
    queryset = Marker.objects.all()
    serializer_class = MarkerSerializer

class designviewSet(viewsets.ReadOnlyModelViewSet):
    #set the location as a field to filter our markers, and then a filter based on the bound box
    bbox_filter_field = "wkb_geometry"
    filter_backends = (filters.InBBoxFilter,)
    #also return all our Marker instances, without limitations or filters
    queryset = design.objects.all()
    serializer_class = DesignSerializer