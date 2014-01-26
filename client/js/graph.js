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

// Colors used by d3
var emotionColors = {
  happy: "#ffa71d",
  meh: "#808080",
  sad: "#3a90e5",
  angry: "#e94e54",
  excited: "#fec81a",
  stressed: "#50c12f",
  proud: "#ab62cc",
  romantic: "#ff7ba9"
}

/**
 Returns an object of the format {"happy": 1, "sad": 3}. For the pie chart.
 */
Template.graph.emotionCounts = function () {
  var emotionCounts,
      emotions;
  if (Session.get("account")) {
    // If user is on accounts page, get all feels data
    emotions = getEmotions();
  } else {
    // If user is on main feed page, get feels data from past day
    emotions = getEmotions(Session.get("startDate"))
  };

  if (emotions.length > 0) {
    emotionCounts = _.countBy(emotions);
  } else {
    // if no feels, return null
    return null;
  }

  return emotionCounts;
}

/**
 *Returns an object of the format {"happy": 0.25, "sad": 0.75}. For the pie chart.
 */
Template.graph.emotionPercentages = function () {
  var emotionPercentages = {    // default to 0
    "happy": 0,
    "meh": 0,
    "sad": 0,
    "angry": 0,
    "excited": 0,
    "stressed": 0,
    "proud": 0,
    "romantic": 0
  };

  var emotionCounts = Template.graph.emotionCounts();
  if (emotionCounts) {
    var total = _.reduce(_.values(emotionCounts), function (memo, num) {
      return memo + num;
    });
    for (var key in emotionCounts) {
      if (emotionPercentages.hasOwnProperty(key)) {
        emotionPercentages[key] = parseInt(emotionCounts[key] / total * 100);
      }
    }
  }
  return emotionPercentages;

}

Template.graph.account = function () {
  return Session.get("account");
}

Template.graph.rendered = function () {


  // Emotion Pie Chart Code

  var emotionCounts = Template.graph.emotionCounts();
  if (emotionCounts) {
    // if there are emotions, create pie chart.
    var data = _.map(
      _.pairs(emotionCounts),
      function (pair) {
        return {
          emotion: pair[0],
          count: pair[1]
        };
      }
    );

    var w = 360,                        //width
      h = 360,                            //height
      r = 180;                            //radius

    var vis = d3.select("#emotion-pie")
      .append("svg:svg")              //create the SVG element inside the <body>
      .data([data])                   //associate our data with the document
      .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
      .attr("height", h)
      .append("svg:g")                //make a group to hold our pie chart
      .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
      .outerRadius(r)
      .innerRadius(5/6 * r);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
      .value(function (d) {
        return d.count;
      });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
      .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
      .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
      .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
      .attr("class", "slice");    //allow us to style things in the slices (like text)

    arcs.append("svg:path")
      .attr("fill", function (d, i) {
        return emotionColors[data[i].emotion];
      }) //set the color for each slice to be chosen from the color function defined above
      .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function
  }



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