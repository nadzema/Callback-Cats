/* global Plotly */
var ba_all =
    `http://127.0.0.1:5000/`;

var ba_day =
  `http://127.0.0.1:5000/ba_day`;

var ba_night =
    `http://127.0.0.1:5000/ba_night`;   

var era_day = 
    `http://127.0.0.1:5000/ba_day`;

var era_night = 
    `http://127.0.0.1:5000/ba_night`;

/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

// function buildPlot() {
  d3.json(ba_day).then(function(data) {

    // Grab values from the data json object to build the plots
    var batting_avg = data.batting_avg;
    console.log(batting_avg);
 
    // var stock = data.dataset.dataset_code;
    // var startDate = data.dataset.start_date;
    // var endDate = data.dataset.end_date;
    // var dates = unpack(data.dataset.data, 0);
    // var closingPrices = unpack(data.dataset.data, 4);

    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: batting_avg,
      x: batting_avg,
      y: batting_avg,
      line: {
        color: "#17BECF"
      }
    };

    var data = [trace1];

    var layout = {
      title: `Batting_avg`,
      xaxis: {
        range: [batting_avg, batting_avg],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("plot", data, layout);

  });
// }

buildPlot();
