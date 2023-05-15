"""map_site URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from map_A.views import designMapView, MarkersMapView, input_view, deserialize_map_json, create_marker, CombinedMapView

app_name = "map_A"

urlpatterns = [
    path("", input_view, name="input"),
    path("map/", designMapView.as_view(), name='map'),
    path("deserial/", deserialize_map_json, name='deserial'),
    path("create_note_pt/", create_marker, name='create_note_pt'),
    path('api/combined_map/', CombinedMapView.as_view(), name='combined_map')
]
