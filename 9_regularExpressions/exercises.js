// Use https://debuggex.com to experiment with and visualize regular expressions upon strings
/* RegExp Golf - writing the least number of code characters as possible to solve a problem (regex problem in this case ) */

// Fill in the regular expressions

verify(/.../,
       ["my car", "bad cats"],
       ["camper", "high art"]);

verify(/.../,
       ["pop culture", "mad props"],
       ["plop", "prrrop"]);

verify(/.../,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

verify(/.../,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

verify(/.../,
       ["bad punctuation ."],
       ["escape the period"]);

verify(/.../,
       ["Siebentausenddreihundertzweiundzwanzig"],
       ["no", "three small words"]);

verify(/.../,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape", "BEET"]);


function verify(regexp, yes, no) {
    // Ignore unfinished exercises
    if (regexp.source == "...") return;
    for (let str of yes) if (!regexp.test(str)) console.log(`Failure to match '${str}'`);
    for (let str of no) if (regexp.test(str)) console.log(`Unexpected match for '${str}'`);
}

/* Quoting Style */

/* Numbers Again */
