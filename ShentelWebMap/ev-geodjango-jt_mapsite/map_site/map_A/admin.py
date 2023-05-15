from django.contrib.gis import admin

from map_A.models import Marker, design


@admin.register(Marker)
class MarkerAdmin(admin.GISModelAdmin):
    list_display = ("name", "issue", "location")

@admin.register(design)
class designAdmin(admin.GISModelAdmin):
    list_display = ("globalid", "node_type", "wkb_geometry")