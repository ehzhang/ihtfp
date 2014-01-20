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
 * Methods for the
 */
Meteor.methods({
  newUser: function (username, email) {
    console.log(username + ' and ' + email + ' and ' + generatePassword());
  }
  });