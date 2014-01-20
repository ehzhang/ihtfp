/**
 *  __ __  __ ______  ____ ____
 *  || ||  || | || | ||    || \\
 *  || ||==||   ||   ||==  ||_//
 *  || ||  ||   ||   ||    ||
 *  -- --  --   --   --    --
 *
 *  Shared space for query functions!
 *
 */


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
getFeels = function(startDate, endDate, limit) {

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