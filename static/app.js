// d3.csv("joined_data.csv").then(function(data)
// {
//     console.log(data[0])
//     var game_id = data.map(d => d.game_id)
//     console.log(game_id)
//     var team_name = data.map(d => d.team_name)
//     console.log(team_name)

    var trace1 = {
        y: batting_avg.ba_day,
        name: "DAY GAMES",
        type: "box",
        boxpoints: "all"
      };
      
      var trace2 = {
        y: batting_avg.ba-night,
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
      

