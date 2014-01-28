/**
 *  __ __  __ ______  ____ ____
 *  || ||  || | || | ||    || \\
 *  || ||==||   ||   ||==  ||_//
 *  || ||  ||   ||   ||    ||
 *  -- --  --   --   --    --
 *
 *  Client-side code.
 *
 *  Functions to change back and forth between pages.
 *  All session variable sets are done here.
 *
 */

/**
 * Reset the limit of how many posts to load initially.
 */
resetLimit = function () {
  if(Session.equals("limit", 100)) {
    Session.set("limit", 99);
  } else {
    Session.set("limit", 100);
    console.log(Session.get("limit") + 'supposed to reset');
  }
}

/**
 * Switches the view to the account page.
 */
switchToAccount = function () {
  if (!Session.get("account")) {
    // Switching pages, reset the active flag.
    Session.set("active", false);
    // Switch to the account page
    Session.set("account", true);
    // Show the grid first.
    Session.set("grid", true);
    // Show all
    Session.set("filter", "all");
    return false;
  }
  return false;
}

/**
 * Switch to the community page (main feed)
 */
switchToCommunity = function () {
  if (Session.get("account")) {
    // Reset the active flag when switching pages.
    Session.set("active", false);
    // Reset the limit for the query
    resetLimit();
    // Switch to the main feed.
    Session.set("account", false);
    // Show the grid.
    Session.set("grid", true);
    // Set the filter to show all.
    Session.set("filter", "all");
    return false;
  }
  return false;
}

/**
 * Switch to the graphs view.
 */
switchToGraphView = function () {
  // update grid session variable if not already set
  if (Session.get("grid")) {
    // make 'active' false only if on main feed
    if (!Session.get("account")) {
      Session.set("active", false);
    }
    resetLimit();
    Session.set("filter", 'all');
    Session.set("grid", false);
  }
  return false;
}

/**
 * Switch to the grid view.
 */
switchToGridView = function () {
  // update 'grid' session variable if not already set
  if (!Session.get("grid")) {
    // make 'active' false only if on main feed
    if (!Session.get("account")) {
      Session.set("active", false);
    }
    resetLimit();
    Session.set("filter", 'all');
    Session.set("grid", true);
  }
  return false;
}

/**
 * Filter the feed by a certain emotion.
 * @param emotion (String)
 */
showFilteredBy = function (emotion) {
  if (!Session.get("account")) {
    // Only set the active flag to false on the main feed.
    // On the account page, the data is all found, and filtered
    // on the client side instead of the server
    Session.set("active", false);
  }
  resetLimit();
  Session.set("filter", emotion);
}