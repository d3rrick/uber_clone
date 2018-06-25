
var mymap;
var ctlRouting;
var waypoints=[];
var jsnBuffer;
var pointlyrbuffer;
var routeit=function routepoints(waypoints){
        ctlRouting = L.Routing.control({
            plan: L.Routing.plan(waypoints, {
                       createMarkers: function(waypoints) {
                           return (L.marker(waypoints[0]).bindPopup("s"),L.marker(waypoints[1]).bindTooltip("Test Label", {permanent: true, direction: 'right'}))
       
                       },
         routeWhileDragging: true,
         }),
         router: L.Routing.mapbox('pk.eyJ1IjoiZGVyeSIsImEiOiJjaWY5anJyN3YwMDI5dGNseHoyZzM4Z3R4In0.dToOXYIZ30LH_7VtFbKW4A')
       }).addTo(mymap)
    
    }
$('#getroute').click(function(e){
    var stAdress=$("#start").val()
    var spAdress=$("#stop").val()
    var start
    var stop
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': stAdress }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();
            waypoints.push(L.latLng(latitude,longitude))
          

        }
    });
    geocoder.geocode({ 'address': spAdress }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();
            waypoints.push(L.latLng(latitude,longitude))
        }
    });
    // console.log(waypoints)
    routeit(waypoints)
    // e.preventDefault()

    
});

$(document).ready(function(){
    mymap = L.map('map').setView([-1.300561, 36.784549], 20);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);


    var moringa = [-1.300561, 36.784549]
    var icn ="/static/img/mrk.svg"
    var icnAvailable ="/static/img/not.svg"
    var myIcon = L.icon({
        iconUrl: icn,
        iconSize:[40, 60],
        iconAnchor:[20, 60],
        popupAnchor: [0, -53]
        });

    var marker = L.marker(moringa,{icon:myIcon}).addTo(mymap)
    

    var lyrLawyers = L.geoJSON.ajax('http://127.0.0.1:8000/test_data').addTo(mymap);
    var all_data = L.geoJSON.ajax('http://127.0.0.1:8000/all_data').addTo(mymap);
    

    marker.on('click', function(e){
        // buffer nearest drivers by a radius of 1 km
        var points = [];
        var buffered_data =[];
        var point = {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [36.784549,-1.300561]
            }
          };
          if (pointlyrbuffer){
              pointlyrbuffer.remove()
          }
          else{
            jsnBuffer = turf.buffer(point, 10, 'kilometers');
            pointlyrbuffer = L.geoJSON(jsnBuffer,{style:{color:'pink', dashArray:'5,5', fillOpacity:0.3}}).addTo(mymap);
            mymap.fitBounds(pointlyrbuffer.getBounds())

            var searchWithin = turf.polygon(jsnBuffer.geometry.coordinates);
        
            function styleFunction(feature){
                {icon:myIcon}
            }

            for (var i=0; i<lyrLawyers.toGeoJSON().features.length; i++){
                var pt = turf.point(lyrLawyers.toGeoJSON().features[i].geometry.coordinates,{properties:lyrLawyers.toGeoJSON().features[i].properties});
                 
                  if (turf.inside(pt, searchWithin) == true){
                        
                        L.geoJson(pt,{
                            pointToLayer: function(feature, latlng){
                            var att = feature.properties;
                            return L.marker(latlng, {
                                icon: L.icon({
                                    iconUrl: icnAvailable,
                                    iconSize: [35, 38],
                                    iconAnchor: [12, 28],
                                    popupAnchor: [0, -25]
                                  }),
                               riseOnHover: true
                            })
                        }
                        }).addTo(mymap);
                        }
                    };
            
          }
    })
})

function GetLatlong(address){
    var latitude;
    var longitude;

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();
            return [parseFloat(latitude),parseFloat(longitude)]
        }
    });  
}

    //     ctlRouting.on('routeselected', function(e) {
    //       var route = e.route;
    //       var line = L.polyline(route.coordinates),
    //       animatedMarker = L.animatedMarker(line.getLatLngs());
    //       mymap.addLayer(animatedMarker);
    //       console.log(route.coordinates);
    //     });


    // var line = L.polyline([[-1.300561, 36.784549],[-1.304561,  36.484549],[-1.305561,  36.584549]]),
    // animatedMarker = L.animatedMarker(line.getLatLngs());
    // mymap.addLayer(animatedMarker);




    // var marker = L.marker([-1.300561, 36.784549]).bindPopup("jdjjdjd").addTo(mymap)
    // mymap.on('click', function(e){
    //     alert('clicked')
    // })

    //   ctlRouting = L.Routing.control({waypoints, 
    //     createMarkers: function(waypoints) {
    //                             return (L.marker(waypoints[0]).bindPopup("start"),L.marker(waypoints[1]).bindPopup("stop"))             
    //                             },
    //       router: L.Routing.mapbox('pk.eyJ1IjoiZGVyeSIsImEiOiJjaWY5anJyN3YwMDI5dGNseHoyZzM4Z3R4In0.dToOXYIZ30LH_7VtFbKW4A')}).addTo(mymap);
         //   ctlRouting = L.Routing.control({waypoints, 
    //    
    //       router: L.Routing.mapbox('pk.eyJ1IjoiZGVyeSIsImEiOiJjaWY5anJyN3YwMDI5dGNseHoyZzM4Z3R4In0.dToOXYIZ30LH_7VtFbKW4A')}).addTo(mymap);
        
    