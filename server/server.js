/**
 * METEOR server side javascript
 */


Meteor.publish("feels", function () {
  console.log("I'M SENDING THE FEELS! " + Feels.find().count());
  return Feels.find();
});