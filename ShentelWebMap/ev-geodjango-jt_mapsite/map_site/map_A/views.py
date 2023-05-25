from django.shortcuts import render, redirect
from .models import design, Marker
from django.views.generic.base import TemplateView
from .forms import MarkerForm
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json
from django.contrib.gis.geos import Point
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import FiberCableSerializer, SpliceClosureSerializer
from .models import FiberCable, SpliceClosure
#from django.contrib.auth.decorators import login_required

class designMapView(TemplateView):
    template_name = "map.html"

class MarkersMapView(TemplateView):
    template_name = "map.html"

def homepage(request):
    return render(request, "home.html")

def input_view(request):
    if request.method == "POST":
        form = MarkerForm(request.POST)
        if form.is_valid():
            marker = form.save(commit=False)
            marker.save()
            return redirect("homepage")

    form = MarkerForm()
    return render(request, "input.html", {"form": form})


###################################################################################################################################################################





# class CombinedMapView(APIView):
#     def get(self, request):
#         fibercables = FiberCable.objects.all() # limit to first 10 records
#         spliceclosures = SpliceClosure.objects.all()  # limit to first 10 records

#         fibercable_serializer = FiberCableSerializer(fibercables, many=True)
#         spliceclosure_serializer = SpliceClosureSerializer(spliceclosures, many=True)

#         return Response({
#             'fibercables': fibercable_serializer.data,
#             'spliceclosures': spliceclosure_serializer.data
#         })



class CombinedMapView(APIView):
    def get(self, request):
        fibercables = FiberCable.objects.all()[:3300]  # limit to first 10 records
        spliceclosures = SpliceClosure.objects.all()[:1000]  # limit to first 10 records

        fibercable_serializer = FiberCableSerializer(fibercables, many=True)
        spliceclosure_serializer = SpliceClosureSerializer(spliceclosures, many=True)

        return Response({
            'fibercables': fibercable_serializer.data,
            'spliceclosures': spliceclosure_serializer.data
        })



###############################################################################################################################################################################################################################################
#@login_required #for once login autheticate is set up
@csrf_exempt #IDT THIS IS A GREAT SOLUTION. SECURITY THING? WITHOUT THIS THOUGH {% csrf_token %} NEEDS TO BE CALLED IN HHTML WITHIN FORM TAG
#BUT WERE NOT USING A FORM TAG BECAUSE THE POST IS HAPPENING FROM JS.
def deserialize_map_json(request):
    if request.method == 'POST':
        try:
            #print(request.POST['created_user'])
            #^POST doesnt work it is always empty. i think because we arnt using a form. so decode body instead
            req_decode = request.body.decode("utf-8")
            
            #because we decoding request from byte it seems like its not fully in json format anymore. bool values like "true" instead of true
            #but it does make a dict which is useful
            req_decode_loads = json.loads(req_decode)
            print(req_decode_loads)

            #conditionals to fix non-json-y bool
            
            if req_decode_loads['approved'] == 'true':
                approved = True
            if req_decode_loads['approved'] == 'false':
                approved = False
            if req_decode_loads['approved'] == 'null':
                approved = None

            created_user = req_decode_loads['created_user']# if we needed to change this attribute, include in update method below

            #update  feature's approval  from popup. filter by primary key (fgc_id in database). django api refers to primary key as 'id'
            design.objects.filter(pk=req_decode_loads['id']).update(approved=approved)
            return HttpResponse("Status Updated!")
        
        except:
            return HttpResponse("something went wrong with post")
        
    else: 
        return render(request, "home.html")
    

@csrf_exempt
def create_marker(request):
    if request.method == 'POST':
        try:
            req_decode = request.body.decode("utf-8")
            req_decode_loads = json.loads(req_decode)
            print(req_decode_loads)

            #name = req_decode_loads['properties']['name']# if we needed to change this attribute, include in update method below
            issue = req_decode_loads['comment']# if we needed to change this attribute, include in update method below

            #create geometry
            latitude = float(req_decode_loads['latitude'])
            longitude = float(req_decode_loads['longitude'])
            pnt = Point(longitude, latitude)

            #both updating and creating will be made by this view
            if req_decode_loads['action'] == 'update':
                Marker.objects.filter(pk=req_decode_loads['id']).update(issue=issue, location=pnt)
                return HttpResponse("Status Updated!")
            if req_decode_loads['action'] == 'create':
                Marker.objects.create(issue=issue, location=pnt)
                return HttpResponse("Status Updated!")

        except:
            return HttpResponse("something went wrong with post")  
    else: 
        return render(request, "home.html")
