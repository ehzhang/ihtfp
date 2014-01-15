if (Meteor.isClient) {

  Meteor.subscribe("feels", function() {
    console.log("I GOT THE FEELS!");
  });

  Template.hello.greeting = function () {
    return "Welcome to ihtfp.";
  };

  Template.hello.events({
    'click' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("feels", function () {
    return Feels.find();
  });
}