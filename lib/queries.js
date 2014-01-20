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
        limit: limit,
        fields: {username: 0}
      });
  } else {
    return Feels.find(
      {
        timestamp: {$gte: start, $lt: endDate}
      },
      {
        sort: {timestamp: -1},
        limit: limit,
        fields: {username: 0}

      });
  }
}

/**
 * Get a set of feels from a specific date range.
 * If no end date, receives all information until the now.
 * Not limited, simply returns all data in this range.
 *
 * @param startDate: Date object, start date of query
 * @param endDate: Date object, end date of query
 * @returns miniMongo Cursor for a set of feels.
 *
 * TODO: Weird stuff going on, will investigate...
 *
 * Looks like subscribing to only the emotions field merges into the
 * total Feels, making it tricky for lazy load to work.
 * The daily emotion will most likely have to be computed server-side...
 */
//getEmotions = function(startDate, endDate) {
//  if (!endDate) {
//    return Feels.find(
//      {
//        timestamp: {$gte: startDate}
//      },
//      {
//        sort: {timestamp: -1},
//        fields: {timestamp: 1, emotion: 1}
//      });
//  } else {
//    return Feels.find(
//      {
//        timestamp: {$gte: start, $lt: endDate}
//      },
//      {
//        sort: {timestamp: -1},
//        fields: {timestamp: 1, emotion: 1}
//      });
//  }
//}