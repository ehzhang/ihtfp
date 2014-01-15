// ihtfp data model
// Loaded on both the client and the server

///////////////////////////////////////////////////////////////////////////////
// Feels

/*
 Each feel is represented by a document in the Feels collection:
 username: String user name
 anon: Boolean
 text: String
 emotion: String out of the set {Happy, Sad, Meh}
 hearts: Integer representing number of 'hearts'
 timestamp: Date
 */

Feels = new Meteor.Collection("feels");