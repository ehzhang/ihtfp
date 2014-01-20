/**
 *  __ __  __ ______  ____ ____
 *  || ||  || | || | ||    || \\
 *  || ||==||   ||   ||==  ||_//
 *  || ||  ||   ||   ||    ||
 *  -- --  --   --   --    --
 *
 *  Server-side code.
 *
 *  Generate a password based on a list of adjectives, adverbs, and nouns.
 *
 */

/**
 * Generate a password from the text assets.
 */
generatePassword = function () {
  var adjs = Assets.getText('text/adjectives.txt').split('\n'),
      advs = Assets.getText('text/adverbs.txt').split('\n'),
      nouns = Assets.getText('text/nouns.txt').split('\n');

  var adj = adjs[Math.floor(Math.random() * adjs.length)],
      adv = advs[Math.floor(Math.random() * advs.length)],
      noun = nouns[Math.floor(Math.random() * nouns.length)];

  return adv + '-' + adj + '-' + noun;
}