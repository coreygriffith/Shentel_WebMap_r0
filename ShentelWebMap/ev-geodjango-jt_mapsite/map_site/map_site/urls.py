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
from django.contrib import admin
from django.urls import include, path
from map_A import views


urlpatterns = [
    path("", views.homepage, name="homepage"),
    path('admindfsgdahfddfhnzdewehjncb/', admin.site.urls),
    path("api/", include("map_A.api")),
    path("map_A/", include("map_A.urls"), name="mappage"),
    #path("deserial/", views.deserialize_map_json, name = 'deserial'),
]
