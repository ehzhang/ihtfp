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
 * This publish is limited for lazy-loading
 */
Meteor.publish("feels", getFeels);

/**
 * Publish the record set of all feels felt by a specific user.
 */
Meteor.publish("userFeels", getUserFeels)

/**
 * Publish relevant user information
 */
Meteor.publish("userData", getUserData);

/**
 * Meteor publish a set of feels of only the emotion field for a date range.
 * This publish receives the entire set in the date range.
 */
//Meteor.publish("emotions", getEmotions)

/**
 * Methods for the server to execute.
 */
Meteor.methods({
  newUser: function (username, email) {
    var password = generatePassword();
    var userId = Accounts.createUser({
      username: username,
      email: email
    })
    Accounts.sendEnrollmentEmail(userId);
  }
});