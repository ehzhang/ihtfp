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
 *
 * TODO: MAKE THIS QUERY THING BETTAH, MAYBE WHEN MORE SOBER
 */
getFeels = function (limit, filter, startDate, endDate) {
  if (filter && emotions.indexOf(filter) >= 0) {
    return Feels.find({
      emotion: filter
    }, {
      sort: {timestamp: -1},
      limit: limit,
      fields: {username: 0}
    })
  }

  if (!startDate) {
    return Feels.find({

    }, {
      sort: {timestamp: -1},
      limit: limit,
      fields: {username: 0}
    })
  }

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
        timestamp: {$gte: startDate, $lt: endDate}
      },
      {
        sort: {timestamp: -1},
        limit: limit,
        fields: {username: 0}
      });
  }
}
/**
 * Query all of the feels that are relevant to a specific username.
 * @param username: String
 * @returns {*|Cursor|219|1103|79|590}
 */
getUserFeels = function (username) {
  return Feels.find({
    username: username
  }, {
    sort: {timestamp: -1}
  });
}

/**
 * Add certain properties of the User data that isn't published
 * normally.
 * @returns {*|Cursor|219|1103|79|590}
 */
getUserData = function () {
  return Meteor.users.find(
    {
      _id: this.userId
    }, {
      fields: {createdAt: 1}
    })
}

/**
 * Returns array of all emotions sorted by recency,
 * beginning at some start date if defined.
 * @param startDate
 * @returns {*|Cursor|219|1103|79|590}
 */
getEmotions = function () {
  var startDate = arguments[0];
  if (startDate) {
    return Feels.find(
      {
        timestamp: { $gte: startDate }
      },
      {
        fields: {emotion: 1},
        sort: {timestamp: -1}
      }).map(function (item) {
        return item.emotion;
      });
  } else {
    return Feels.find(
      {}, {
        fields: {emotion: 1},
        sort: {timestamp: -1}
      }).map(function (item) {
        return item.emotion;
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