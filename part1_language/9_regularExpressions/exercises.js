// Use https://debuggex.com to experiment with and visualize regular expressions upon strings
/* RegExp Golf - writing the least number of code characters as possible to solve a problem (regex problem in this case ) */

// Fill in the regular expressions

verify(/ca[rt]/,  // "car" and "cat"
       ["my car", "bad cats"],
       ["camper", "high art"]);

verify(/pr?op/,  // "pop" and "prop"
       ["pop culture", "mad props"],
       ["plop", "prrrop"]);

verify(/ferr(et|y|ari)/,  // "ferret", "ferry", and "ferrari"
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

verify(/ious\b/,  // ending in "ious"
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

verify(/\s[.,:;]/,  // whitespace character followed by a ".", ",", ":", or ";"
       ["bad punctuation ."],
       ["escape the period"]);

verify(/\w{7}/,  // a word longer than six letters
       ["Siebentausenddreihundertzweiundzwanzig"],
       ["no", "three small words"]);

verify(/\b[^\We]+\b/i,  // a word without "e" or "E"
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape", "BEET"]);


function verify(regexp, yes, no) {
    // Ignore unfinished exercises
    if (regexp.source == "...") return;
    for (let str of yes) if (!regexp.test(str)) console.log(`Failure to match '${str}'`);
    for (let str of no) if (regexp.test(str)) console.log(`Unexpected match for '${str}'`);
}

/* Quoting Style */
let text = "'I'm the cook,' he said, 'it's my job.'"
// Change this call.
console.log(text.replace(/(\b'|'\b)/g, "\""))
// -> "I'm the cook", he said, "it's my job."

/* Numbers Again */
