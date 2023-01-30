// Use https://debuggex.com to experiment with and visualize regular expressions upon strings
/* RegExp Golf - writing the least number of code characters as possible to solve a problem (regex problem in this case ) */

// Fill in the regular expressions

verify(/ca[rt]/,  // car and cat
       ["my car", "bad cats"],
       ["camper", "high art"]);

verify(/pr?op/,  // pop and prop
       ["pop culture", "mad props"],
       ["plop", "prrrop"]);

verify(/ferr(et|y|ari)/,  // ferret, ferry, and ferrari
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

verify(/\w+ious\b/,  // Any word ending in ious
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

verify(/\s[.,:;]/,  // A whitespace character followed by a period, comma, colon, or semicolon
       ["bad punctuation ."],
       ["escape the period"]);

verify(/\w{6}/,  // A word longer than six letters
       ["Siebentausenddreihundertzweiundzwanzig"],
       ["no", "three small words"]);

verify(/\b[^eE]+\b/,  // A word without the letter e (or E)
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape", "BEET"]);


function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (let str of yes) if (!regexp.test(str)) {
    console.log(`Failure to match '${str}'`);
  }
  for (let str of no) if (regexp.test(str)) {
    console.log(`Unexpected match for '${str}'`);
  }
}