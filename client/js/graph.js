/**
 *  __ __  __ ______  ____ ____
 *  || ||  || | || | ||    || \\
 *  || ||==||   ||   ||==  ||_//
 *  || ||  ||   ||   ||    ||
 *  -- --  --   --   --    --
 *
 *  Graph visualization code.
 *
 *  Graph view is an alternate view to main grid view.
 *
 */

// Colors used by highcharts line graph
var emotionDullColors = {
  happy: "#ffa71d",
  meh: "#808080",
  sad: "#3a90e5",
  angry: "#e94e54",
  excited: "#fec81a",
  stressed: "#50c12f",
  proud: "#ab62cc",
  romantic: "#ff7ba9"
}

var emotionColors = {
  happy: "#ff9200",
  meh: "#696969",
  sad: "#2285e5",
  angry: "#e93a43",
  excited: "#feb403",
  stressed: "#33c11a",
  proud: "#9b51cc",
  romantic: "#ff67ab"
}


/**
 Returns an object of the format {"happy": 1, "sad": 3}.
 */
Template.graph.emotionCounts = function (date) {
  var emotions, emotionCounts;
  if (typeof(date) === 'undefined') {
    emotions = getEmotions();
  } else {
    emotions = getEmotions(date);
  }
  if (emotions && emotions.length > 0) {
    emotionCounts = _.countBy(emotions);
  } else {
    // if no feels, return null
    return null;
  }

  return emotionCounts;
}

/**
 * Calls emotionCounts with the proper parameters given which page the user is on.
 * Like emotionCounts, returns an object of the format {"happy": 1, "sad": 3}.
 * @returns {*}
 */
Template.emotionPie.emotionPieCounts = function () {
  var emotionCounts;
  if (Session.get("account")) {
    // If user is on accounts page, get all feels data
    emotionCounts = Template.graph.emotionCounts();
  } else {
    // If user is on main feed page, get feels data from past day
    emotionCounts = Template.graph.emotionCounts(Session.get("startDate"));
  }
  return emotionCounts;
}

/**
 * Calls emotionCounts to return emotion counts per day
 * for the past duration (int) days. Returns an object of the format:
 * [{
 *    name: 'happy',
 *    data: [1,3,2,4,5,7,0]
 *  },
 *  {
 *    name: 'sad',
 *    data: [0,2,1,6,3,1,1]
 * }]
 */
Template.graph.emotionDurationCounts = function (date, duration) {
  var emotionWeekCounts = {
    "happy": [],
    "meh": [],
    "sad": [],
    "angry": [],
    "excited": [],
    "stressed": [],
    "proud": [],
    "romantic": []
  };

  for (var i = 0; i < duration; i++) {
    var emotionDayCount = Template.graph.emotionCounts(date);
    for (var key in emotionWeekCounts) {
      var count = 0;
      if (emotionDayCount && emotionDayCount.hasOwnProperty(key)) {
        count = emotionDayCount[key];
      }
      emotionWeekCounts[key] = [count].concat(emotionWeekCounts[key]);
    }
    date.setDate(date.getDate() - 1);
  }

  var emotionWeekCountsFormatted = _.map(
    _.pairs(emotionWeekCounts),
    function (pair) {
      return {
        name: pair[0],
        data: pair[1],
        color: emotionColors[pair[0]],
        marker: {
          symbol: 'circle',
          radius: 0
        }
      };
    }
  );

  return emotionWeekCountsFormatted;
}

Template.graph.lastDurationDays = function (duration) {
  var days = [],
    date = Session.get("startDate");

  for (var i = 0; i < duration; i++) {
    var formatDate = (date.getMonth() + 1).toString() + "/" + date.getDate().toString();
    days = [formatDate].concat(days);
    date.setDate(date.getDate() - 1);
  }
  return days;
}

/**
 *Returns an object of the format {"happy": 0.25, "sad": 0.75}. For the pie chart.
 */
Template.emotionPie.emotionPiePercentages = function () {
  var emotionPiePercentages = {    // default to 0
    "happy": 0,
    "meh": 0,
    "sad": 0,
    "angry": 0,
    "excited": 0,
    "stressed": 0,
    "proud": 0,
    "romantic": 0
  };

  var emotionPieCounts = Template.emotionPie.emotionPieCounts();

  if (emotionPieCounts) {
    var total = _.reduce(_.values(emotionPieCounts), function (memo, num) {
      return memo + num;
    });
    for (var key in emotionPieCounts) {
      if (emotionPiePercentages.hasOwnProperty(key)) {
        var percentage = emotionPieCounts[key] / total * 100;
        emotionPiePercentages[key] = percentage < 1 ? '<1' : Math.round(percentage);
      }
    }
  }
  return emotionPiePercentages;

}

Template.graph.account = function () {
  return Session.get("account");
}

Template.graph.rendered = function () {


  // Emotion Pie Chart Code

  // get and format data
  var emotionPieCounts = Template.emotionPie.emotionPieCounts();
  if (emotionPieCounts) {
    // if there are emotions, create pie chart.
    var pie_data = _.map(
      _.pairs(emotionPieCounts),
      function (pair) {
        return {
          emotion: pair[0],
          count: pair[1]
        };
      }
    );

    var w = 350,                        //width
      h = 350,                            //height
      r = 175;                            //radius

    var vis = d3.select("#emotion-pie")
      .append("svg:svg")              //create the SVG element inside the <body>
      .data([pie_data])                   //associate our data with the document
      .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
      .attr("height", h)
      .append("svg:g")                //make a group to hold our pie chart
      .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
      .outerRadius(r - 7)
      .innerRadius(r - 40);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
      .sort(null)
      .value(function (d) {
        return d.count;
      });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
      .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
      .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
      .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
      .attr("class", "slice");    //allow us to style things in the slices (like text)

    arcs.append("svg:path")
      .attr("class", function (d, i) {
        return "graph " + pie_data[i].emotion;
      }) //set the color for each slice to be chosen from the color function defined above
      .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function
  }

// Feels line graph

  Template.graph.lineChartCallbacks = function () {
    $("tspan:contains('Highcharts.com')").attr("opacity", "0.2")
    $.each($(".highcharts-legend-item rect"), function (index, obj) {
      $(obj).attr("rx", "0")
        .attr("ry", "0")
        .attr("height", "28")
        .attr("width", "28")
        .attr("cursor", 'pointer');
    });

    $.each($(".highcharts-legend-item tspan"), function (index, obj) {
      $(obj).remove();
    });
  }

  Template.graph.getLineChartJSON = function (duration) {
    var categories = Template.graph.lastDurationDays(duration),
      line_data = Template.graph.emotionDurationCounts(Session.get("startDate"), duration);
    return {
      chart: {
        type: 'area',
        backgroundColor: null,
        height: 400,
        width: Session.get("account") ? '550' : '1000'
      },
      title: {
        text: null
      },
      xAxis: {
        title: {
          text: null,
          style: {
            fontFamily: "Raleway, sans-serif",
            fontSize: 20,
            color: "white",
            fontWeight: 100
          }
        },
        categories: categories,
        tickInterval: duration > 7 ? 2 : 1,
        tickmarkPlacement: 'on',
        gridLineWidth: 0,
        labels: {
          style: {
            fontFamily: "Raleway, sans-serif",
            fontSize: 14,
            color: "white",
            fontWeight: 100,
            padding: 10
          }
        }
      },
      yAxis: {
        title: {
          text: '# feels',
          style: {
            fontFamily: "Raleway, sans-serif",
            fontSize: 20,
            color: "white",
            fontWeight: 100
          }
        },
        gridLineWidth: 0,
        labels: {
          formatter: function () {
            return this.value;
          },
          style: {
            fontFamily: "Raleway, sans-serif",
            fontSize: 14,
            color: "white",
            fontWeight: 100,
            padding: 10
          }
        }
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: '#FFFFFF',
          lineWidth: 0,
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false
              }
            }
          }
        },
        series: {
          fillOpacity: 1
        }
      },
      series: line_data,
      tooltip: {
        enabled: false
      },
      legend: {
        borderWidth: 0,
        itemWidth: 40
      }
    }
  }

  $('#feels-week-line').highcharts(Template.graph.getLineChartJSON(7), Template.graph.lineChartCallbacks);
  $('#feels-month-line').highcharts(Template.graph.getLineChartJSON(30), Template.graph.lineChartCallbacks)

// Graph template fading effects!

// Check to see if this template hasn't been rendered before.
// If it hasn't, then do a thing! (transition)
  if (!this._rendered) {
    this._rendered = true;
    $('#graph').transition('fade up in', 500);
  }

}

// When the template is destroyed, reset the _rendered variable to false.
Template.graph.destroyed = function () {
  this._rendered = false;
}