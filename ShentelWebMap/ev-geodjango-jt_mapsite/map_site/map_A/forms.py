#from django import forms
from .models import design, Marker
from django.contrib.gis import forms
#import floppyforms as forms

class designForm(forms.ModelForm):
    
    file = forms.FileField()

    class Meta():
        model = design
        exclude = ('approved','globalid', 'created_user', 'geometry', 'node_type')

class MarkerForm(forms.ModelForm):
    name = forms.CharField(required=True)
    location = forms.PointField(widget=
        forms.OSMWidget(attrs={'map_width': 800, 'map_height': 500, 'template_name': 'gis/openlayers-osm.html',
                               'default_lon': -71.18086608853581, 'default_lat': 42.368153586120975, 'default_zoom': 5}))

    class Meta:
        model = Marker
        exclude = ('',)