from django.urls import path
from rest_framework import routers

from map_A.viewsets import MarkerViewSet, designviewSet
from map_A.views import CombinedMapView

router = routers.DefaultRouter()
router.register(r"markers", MarkerViewSet)
router.register(r"design", designviewSet)

# Include the URLs from the router
urlpatterns = router.urls

# Append your CombinedMapView to the urlpatterns
urlpatterns += [
    path('combined_map/', CombinedMapView.as_view(), name='combined_map'),
]