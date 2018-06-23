var mymap;
var ctlRouting;
var waypoints=[]

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
            console.log(waypoints)

        }
    });

    geocoder.geocode({ 'address': spAdress }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();
            waypoints.push(L.latLng(latitude,longitude))
            console.log(waypoints)
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