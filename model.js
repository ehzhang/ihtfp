// ihtfp data model
// Loaded on both the client and the server

///////////////////////////////////////////////////////////////////////////////
// Feels

/*
 Each feel is represented by a document in the Feels collection:
 
 owner: user id
 x, y: Number (screen coordinates in the interval [0, 1])
 title, description: String
 public: Boolean
 invited: Array of user id's that are invited (only if !public)
 rsvps: Array of objects like {user: userId, rsvp: "yes"} (or "no"/"maybe")
 */