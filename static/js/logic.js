//Create the different types of maps

var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "MLB Data; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
});

var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "MLB Data <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "MLB Data <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
});
  

// Create a map object

var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: satellite
});



var baseMaps = {
"Satellite": satellite,
"StreetMap": streetmap,
"Light" : light
};

L.control.layers(baseMaps, {
    // collapsed: false
}).addTo(myMap);


// Store our API endpoint inside queryUrl

d3.json('../resources/stadiums.json').then(function(data) {

    console.log(data)

    
//     function colormydot (depth) { 
//         // if depth is between 0 and 150 color it green
//         //  if depth is between 151 and 300 color it yellow
//         // if depth is between 301 and 450 color it orange
//         // if depth is greater than 450 color it red

//         if (depth <= 5) {
//             return "green";
//         }
//         else if (depth <= 10) {
//             return "yellow";
//         } 
//         else if (depth <= 15) {
//             return "orange";
//         }
//         else {
//             return "red";
//         }

//     };

    data.forEach(stadium => {
        lat = stadium['lat'];
        lng = stadium['lng'];
        team = stadium['team'];
        address = stadium['address'];
        console.log(lat);
        
        var marker = L.circleMarker([lat, lng], {
            radius: 10,
            opacity: 1,
            fillOpacity: .9,
            color: "black",
            stroke: true,
            weight: .5,
            fillColor: 'red',
        }).addTo(myMap);

        marker.bindPopup("<h3>" + "Team: " + team +
            "</h3><hr><h3>" + "Address: " + address +  "</h3>")
        .addTo(myMap);
    })
});

//         // console.log(marker)

        

    

//         marker_quake.push(marker);
//         mag_quake.push(mag);
//         colors_quake.push(fillColor);

          

//     });


//     var legend = L.control({ position: "bottomright" });
//     legend.onAdd = function() {
//         var div = L.DomUtil.create("div", "info legend");
//         console.log(marker_quake)
//         // var limits = marker.options.limits;
//         // var colors = marker_quake.options.fillColor;
//         var labels = [];

//     // Add min & max
//     var legendInfo = "<h1>Earthquake Magnitude</h1>" +
//       "<div class=\"labels\">" +
//         "<div class=\"min\">" + mag_quake[0] + "</div>" +
//         "<div class=\"max\">" + mag_quake[mag_quake.length - 1] + "</div>" +
//       "</div>";

//     div.innerHTML = legendInfo;

//     mag_quake.forEach(function(mag_quake, index) {
//       labels.push("<li style=\"background-color: " + colors_quake[index] + "\"></li>");
//     });

//     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//     return div;
//   };

//   // Adding legend to the map
//   legend.addTo(myMap);
// //   console.log(mag)
