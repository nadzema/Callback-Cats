// // **************BOX PLOT FOR BATTING AVERAGE**********************************************************

// only uncomment one PLOTLY BOXPLOT at a time for it to work// 

d3.json('/ba_day').then(function(ba_day) {

  d3.json('/ba_night').then(function(ba_night) {

    console.log(ba_day.map(d => d.batting_avg));
    console.log(ba_night.map(d => d.batting_avg));

    var trace1 = {
      y: ba_day.map(d => d.batting_avg),
      name: "DAY GAMES",
      type: "box",
      boxpoints: "all"
    };
    
    var trace2 = {
      y: ba_night.map(d => d.batting_avg),
      name: "NIGHT GAMES",
      type: "box",
      boxpoints: "all"
    };
    
    var data = [trace1, trace2];

    var layout = {
      title: "BATTING AVERAGES DURING NIGHT AND DAY GAMES",
      yaxis: { title: "Batting Average"}
    };
    
    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("plot", data, layout);

  });
});


// //     // *************  BOXPLOT FOR EARN RUN AVERAGES *******************************************************
d3.json('/era_day').then(function(era_day) {

  d3.json('/era_night').then(function(era_night) {

    console.log(era_day.map(d => d.earn_run_avg));
    console.log(era_night.map(d => d.earn_run_avg));

    var trace3 = {
      y: era_day.map(d => d.earn_run_avg),
      name: "DAY GAMES",
      type: "box",
      boxpoints: "all"
    };
    
    var trace4 = {
      y: era_night.map(d => d.earn_run_avg),
      name: "NIGHT GAMES",
      type: "box",
      boxpoints: "all"
    };
    
    var data = [trace3, trace4];

    var layout = {
      title: "EARN RUN AVERAGE DURING NIGHT AND DAY GAMES",
      yaxis: { title: "EARN RUN AVERAGE"}
    };
    
    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("plot2", data, layout);

  });
});


//     //    ******************** Part 5  PIE CHAT FOR Batting AVG ***************************************************

d3.json('/ba_day').then(function(ba_day) {

  d3.json('/ba_night').then(function(ba_night) {   
    
  
    var data = [{
        labels: ["Batting Average Day", "Batting Average Night"],
        values: (ba_day.map(d => d.batting_avg), ba_night.map(d => d.batting_avg)),
        title: "Pie Chart for Batting Averages",
        marker: {
          colors: ['red', "blue"]
        },
        type: 'pie'
      }];

    var layout = {
      height: 400,
      width: 500
    };

    Plotly.newPlot("plot3", data, layout);

  });
});

    // ******************** Part 6  PIE CHAT FOR Earn Run AVG ***********************************************************

d3.json('/era_day').then(function(era_day) {

  d3.json('/era_night').then(function(era_night) {   

    var data = [{
        labels: ["Earn Run Average Day", "Earn Run Average Night"],
        values: (era_day.map(d => d.earn_run_avg), era_night.map(d => d.earn_run_avg)),
        title: "Pie Chart for Earn Run Average",
        marker: {
          colors: ['red', "blue"]
        },
        type: 'pie'
      }];

    var layout = {
      height: 400,
      width: 500
    };

    Plotly.newPlot("plot4", data, layout);

    //******Checking to see if earn run averages are accurate*******//

    // var x = era_day.map(d => d.earn_run_avg);
    // for ( var i = 0; i < x.length; i ++){
      
    //   var avg = (x[i] / x.length) * x.length
    // }
    // console.log(avg);
  });
});


