import subprocess, os, json
from datetime import datetime
'''ok so dates are brought in as big int. im just using a big int field to hold them and then update to a timestamp.
would be even better if function/trigger'''
folder=r'/home/jtrebilcock/Documents/working/Node_ogrtest.geojson'
db_connection="host=localhost dbname=mapbox_test user=jt password=jt12345"


def json_date_night(in_json):
    with open(folder, 'r') as f:
        j = json.load(f)

    #j = json.load(in_json)

    for feature in j['features']:
        #print(feature)
        for field, value in feature['properties'].items():
            if field in ['last_edited_date', 'created_date']:
                if len(str(value)) > 10:
                    #value = int(value/1000)
                    #print(value)
                    #feature['properties'][field] = str(datetime.fromtimestamp(value)).split(' ')[0]
                    feature['properties'][field] = value
                    
        #print(feature)
       
    out_j = json.dumps(j)
    #print(out_j)
    return out_j


    
def submittal(folder,db):
    cmd='ogr2ogr -f "PostgreSQL" PG:"host=localhost user=jt password=jt12345 dbname=mapbox_test" /home/jtrebilcock/Documents/working/Node_ogrtest.geojson -nln map_A_test -append'
    subprocess.Popen(cmd, universal_newlines=True, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE).communicate()


test = json_date_night(folder)

submittal(test,db_connection)