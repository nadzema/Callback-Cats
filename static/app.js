// d3.csv("joined_data.csv").then(function(data)
// {
//     console.log(data[0])
//     var game_id = data.map(d => d.game_id)
//     console.log(game_id)
//     var team_name = data.map(d => d.team_name)
//     console.log(team_name)


// **************BOX PLOT FOR BATTING AVERAGE**********************************************************

    var trace1 = {
        y: batting_avg.ba_day,
        name: "DAY GAMES",
        type: "box",
        boxpoints: "all"
      };
      
      var trace2 = {
        y: batting_avg.ba_night,
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


    // *************  BOXPLOT FOR EARN RUN AVERAGES *******************************************************
      

      var trace3 = {
        y: earn_run_avg.era_day,
        name: "DAY GAMES",
        type: "box",
        boxpoints: "all"
      };
      
      var trace4 = {
        y: earn_run_avg.era_night,
        name: "NIGHT GAMES",
        type: "box",
        boxpoints: "all"
      };
      
      var data = [trace3, trace4];
      
      var layout = {
        title: "EARN RUN AVERAGES DURING NIGHT AND DAY GAMES",
        yaxis: { title: "Earn Run Average"}
      };
      
      // Plot the chart to a div tag with id "plot"
      Plotly.newPlot("plot", data, layout);

    //    ******************** Part 5  PIE CHAT FOR DAY GAMES ***************************************************

    

var trace5 = {
    labels: ["Batting Average", "Earn Run Average"],
    values: [],
    type: 'pie'
  };
      
  var data = [];

var layout = {
  title: "Pie Chart for Day Games",
};

Plotly.newPlot("plot", data, layout);


// ******************** Part 6  PIE CHAT FOR DAY GAMES ***********************************************************

var trace6 = {
    labels: ["Batting Average", "Earn Run Average"],
    values: [  ],
    type: 'pie'
  };
      
  var data = [];

var layout = {
  title: "Pie  Chart for Night Games",
};

Plotly.newPlot("plot", data, layout);


