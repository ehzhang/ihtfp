/**
 *  __ __  __ ______  ____ ____
 *  || ||  || | || | ||    || \\
 *  || ||==||   ||   ||==  ||_//
 *  || ||  ||   ||   ||    ||
 *  -- --  --   --   --    --
 *
 *  Server-side javascript.
 *  Code here is server-specific, (no client-side access).
 *
 *  TODO: be able to publish a daily emotion, without
 *        having the client load an entire day's worth of posts.
 */

/**
 * Today's date for the server!
 * @type {Date}
 */
var today = new Date();
var start = today.setHours(0,0,0,0);

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
 * @param limit: limit of how many to query
 *
 * Returns the cursor for a set of feels, according to recency
 */
function getFeels(startDate, endDate, limit) {

  if (!endDate) {
    return Feels.find(
      {
        timestamp: {$gte: startDate}
      },
      {
        sort: {timestamp: -1},
        limit: limit
      });
  } else {
    return Feels.find(
      {
        timestamp: {$gte: start, $lt: endDate}
      },
      {
        sort: {timestamp: -1},
        limit: limit
      });
  }
}