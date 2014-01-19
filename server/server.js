/**
 * METEOR server side javascript
 */

/**
 * Today's date for the server!
 * @type {Date}
 */
var today = new Date();
var year = today.getYear(),
  month = today.getMonth(),
  day = today.getDay();
var start = new Date(year, month, day);

/**
 * Meteor publishes a set of feels based on the getFeels function.
 */
Meteor.publish("feels", getFeels);

/**
 * Get a set of feels from a specific date range.
 * If no end date, receives all information until the now.
 *
 * @param start: Date object, start date of query
 * @param end: Date object, end date of query
 *
 * Returns the cursor for a set of feels, sorted by recency.
 */
function getFeels(startDate, endDate) {
  if (!endDate) {
    return Feels.find({ timestamp: {$gte: startDate}});
  } else {
    return Feels.find({ timestamp: {$gte: start, $lt: endDate}});
  }
}