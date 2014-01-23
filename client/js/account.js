/**
 *  __ __  __ ______  ____ ____
 *  || ||  || | || | ||    || \\
 *  || ||==||   ||   ||==  ||_//
 *  || ||  ||   ||   ||    ||
 *  -- --  --   --   --    --
 *
 *  Client-side code.
 *
 *  Code specific for the accounts page.
 *
 */

Session.setDefault("accountsReady", false);

Template.account.rendered = function () {

};

Template.account.events({

});

Template.account.username = function () {
  return Meteor.user().username;
}