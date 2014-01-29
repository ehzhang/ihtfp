/**
 *  __ __  __ ______  ____ ____
 *  || ||  || | || | ||    || \\
 *  || ||==||   ||   ||==  ||_//
 *  || ||  ||   ||   ||    ||
 *  -- --  --   --   --    --
 *
 *  Client-side code.
 *
 *  Code to manage the email templates.
 *
 */

Accounts.emailTemplates.siteName = "ihtfp. anonymous, real-time feels";
Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "Welcome to ihtfp! It's nice to have you, " + user.username;
}

Accounts.emailTemplates.enrollAccount.text = function (user, url) {
  return "Thanks for signing up for ihtfp! Just one last step: " +
    "to activate your account and set your password, simply click the link below: \n\n" +
    url;
}

Accounts.emailTemplates.resetPassword.subject = function (user) {
  return "[ihtfp] Password reset for " + user.username + "!";
}

Accounts.emailTemplates.resetPassword.text = function (user, url) {
  return "To reset your password, just visit the link below! \n\n " +
    url;
}