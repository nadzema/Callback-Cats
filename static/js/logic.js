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
    d3.json('../resources/team_avg.json').then(function(team_data) {

        team_data.forEach(team_stats => {
            ba =  team_stats["batting_avg"];
            era = team_stats["earn_run_avg"];
            team = team_stats["team_name"];
            lat = team_stats['lat'];
            lng = team_stats['lng'];
            console.log(team_stats);
            console.log(ba);

            data.forEach(stadium => {

                address = stadium['address'];

            
                var marker = L.circleMarker([lat, lng], {
                    radius: era * 3,
                    opacity: 1,
                    fillOpacity: .9,
                    color: "black",
                    stroke: true,
                    weight: .5,
                    fillColor: colormydot (ba),
                }).addTo(myMap);

                marker.bindPopup("<h3>" + "Team: " + team +
                    "</h3><hr><h3>  2019 Batting Average: " + ba  + "</h3><hr><h3>  2019 Earn Run Avg: " + era +  "</h3>")
                .addTo(myMap);

            });    
        });

        var legend = L.control({ position: "bottomright" });
        legend.onAdd = function() {
            var div = L.DomUtil.create("div", "info legend");
            // console.log(marker_quake)
            var limits = [0, 0.240, 0.250, 0.260];
            var colors = ["red", "orange", "yellow", "green"];
            var labels = [];

    
        // Add min & max
        var legendInfo = "<h1>MLB Batting Average</h1>" +
          "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + limits[3] + "</div>" +
          "</div>";
    
        div.innerHTML = legendInfo;
    
        limits.forEach(function(limits, index) {
          labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });
    
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
      };
    
      // Adding legend to the map
      legend.addTo(myMap);
    });
})

//////////////////////////////////////////////////////////////////////////////////////
// d3.json('../resources/team_avg.json').then(function(team_data) {

    function colormydot (ba) { 
        // if team_ba is between 0 and 0.24 color it red
        //  if team_ba is between 0.24 and 0.25 color it orange
        // if team_ba is between 0.25 and 0.26 color it yellow
        // if team_ba is greater than 0.26 color it green

        if (ba <= 0.240) {
            return "red";
        }
        else if (ba <= 0.250) {
            return "orange";
        } 
        else if (ba <= 0.260) {
            return "yellow";
        }
        else {
            return "green";
        }

    };



//     var legend = L.control({ position: "bottomright" });
//     legend.onAdd = function() {
//         var div = L.DomUtil.create("div", "info legend");
//         // console.log(marker_quake)
//         var limits = [0, 0.24, 0.25, 0.26];
//         var colors = ["red", "orange", "yellow", "green"];
//         var labels = [];
//         var color_legend = []
//         colors.push(color_legend);

//     // Add min & max
//     var legendInfo = "<h1>MLB Batting Avg.</h1>" +
//       "<div class=\"labels\">" +
//         "<div class=\"min\">" + limits[0] + "</div>" +
//         "<div class=\"max\">" + limits[3] + "</div>" +
//       "</div>";

//     div.innerHTML = legendInfo;

//     limits.forEach(function(limits, index) {
//       labels.push("<li style=\"background-color: " + color_legend[index] + "\"></li>");
//     });

//     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//     return div;
//   };

//   // Adding legend to the map
//   legend.addTo(myMap);
