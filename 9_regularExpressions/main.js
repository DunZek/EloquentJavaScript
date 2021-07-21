/*
    - The tools that have survived and thrived today have survived and thrive due to their relevance in the current world.
        - The same goes to software tools.
    - "Regular expressions" - tools used to describe patterns in string data.
        - They form a small, seperate language part of JavaScript and many other languages and systems.
        - Regular expressions are both terribly awkward and extremely useful.
        - Uses a cryptic syntax.
        - Javascript provides a clumsy interface.
    - Regular expressions are a powerful tool for inspecting and processing strings. It is a must-to learn as a programmer
*/

/* Creating A Regular Expression
    - In JavaScript, regular expressions are a type of object:
        - It can be constructed with the RegExp() constructor
        - or it can be written as a literal value by enclosing a pattern in forward slashes
*/
// Example - two ways of defining regular expression objects
let re1 = new RegExp("abc")  // with this, backslashes are still treated like escape-characters
let re2 = /abc/  // backslashes are still treated as escape characters
let eighteenPlus = /eighteen\+/  // characters such as question marks and plus signs have special meanings and they must be escaped

/* Testing For Matches
    - Regular expressions objects have a number of methods.
    - The .test() method will return true or false whether an expression is matched in the given string
*/
console.log(/abc/.test("abcde"))  // true
console.log(/abc/.test("abxde"))  // false

/* Sets Of Characters
    - We can use regular expression to match strings against a set of characters encased in []
    - A hyphen "-" between two characters can be used to indicate a range of characters
        - ordering is determined by the character's Unicode number.
    - Common character groups have built-in shortcuts:
        - "\d" -> any digit character
        - "\w" -> an alphanumeric character
        - "\s" -> any whitespace character (space, tab, newline, etc)

        - "\D" -> any non-digit character
        - "\W" -> any non-alphanumeric character
        - "\S" -> any non-whitespace character

        - "." -> any character except for newline ("\n")
*/
// Example - bracket notation and using the hyphen to indicate a set and range respectively
console.log(/[0123456789]/.test("in 1992"))  // true
console.log(/[0-9]/.test("in 1992"))  // true, codes 48 to 57

// Example - using common group built-in shortcuts
let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/
console.log(dateTime.test("01-30-2003 15:20"))  // true
console.log(dateTime.test("30-jan-2003 15:20"))  // false

// Example - combination
let myRegEx = /[\d.]/  // periods and other special characters such as "+" and "?" lose their meaning when placed within brackets

// Example - inverting a set of characters
let notBinary = /[^01]/  // the caret "^" character asserts the expression to match any pattern except the set within the brackets
console.log(notBinary.test("1101100011"))  // true
console.log(notBinary.test("1101102011"))  // false

/* Repeating Parts Of A Pattern
    - Putting a plus sign "+" after a pattern in a regular expression indicates that an element may be repeated more than once
    - Putting an asterisk "*" has a similar meaning allows a pattern to match zero instances
    - Putting a question mark "?" makes a part of a pattern optional
    - Braces {} are used to indicate the precise number a pattern should repeat
        - ex: "{4}" -> test whether the pattern occurs exactly 4 times in the string
        - ex: "{2,4}" -> test whether the pattern occurs at least 2 times but at most 4 times in the string
        - ex: "{5,}" -> test whether the pattern occurs at least 5 times
*/
// Example - using "+" to indicate multiple instances of the pattern
console.log(/'\d+'/.test("'123'"))  // true
console.log(/'\d+'/.test("''"))  // false

// Example - using "*" to indicate that it should match whether it does or doesn't
console.log(/'\d*'/.test("'123'"))  // true
console.log(/'\d*'/.test("''"))  // true
console.log(/abc*/.test("abdeabxde"))  // true, both "a" and "b" are matched
console.log(/abc*/.test("wxyz"))  // false, both "a" and "b" are not matched
console.log(/c*/.test("wxyz"))  // true, whether "c" is matched or not

// Example - using "?" to match optional patterns
let neighbor = /neighbou?r/
console.log(neighbor.test("neighbour"))  // true
console.log(neighbor.test("neighbor"))  // true

// Example - using brace notation to specify the number of occurence
dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/
console.log(dateTime.test("1-30-2003 8:45"))  // true
console.log(/a{5,}/.test("aabbcccaaaa"))  // true

/* Grouping Subexpressions
    - Using parentheses () to indicate an entire pattern or to use more than one operator.
    - The parts of the regular expressions enclosed in parentheses indicate the part to be a single element (as far as operators following it are concerned)
*/
// Example - using parentheses
let cartoonCrying = /boo+(hoo+)+/i  // match whether "hoo" exists and more than once. The "i" at the end of the expression indicates to match case-insensitivity
console.log(cartoonCrying.test("Boohoooohoohooo"))  // true

/* Matches And Groups
    - While .test() asserts true or false whether a match is found for the pattern, regular expressions in JavaScript possess a .exec() method:
        - that will return "null" if no match is found with the expression
        - or an object with information about the match otherwise
    - the returned object will be an array of strings:
        - where the first element is the first pattern matched by the expression.
            - when using parentheses, the whole match is the first element.
                - the next elements will be the parts matched by the sequential groups
*/
// Example - using .exec()
let match = /\d+/.exec("one two 100")
console.log(match)  // ["100"] <- an array of string where the first element is the string that was matched with the pattern
console.log(match.index)  // 8 <- this is the index in the string where the match is found first

// Example - using .match() method for string objects which behave similarly to .exec()
console.log("one two 100".match(/\d+/))  // ["100"]

// Example - using parentheses
let quotedText = /"([^"]*)"/  //
console.log(quotedText.exec('she said "hello"'))  // ['"hello"', 'hello']

// Example
console.log(/bad(ly)?/.exec("bad"))  // ["bad", undefined] <- when a pattern-group does not end up being matched, it is undefined
console.log(/(\d)+/.exec("123"))  // ["123", "3"] <- here, the last element from the multiple instances of a pattern is returned

/* The Date Class
    - JavaScript has a standard class for representing dates using the Date() constructor
*/
// Example - logging the current date and time by instanting an Date object
console.log(new Date())

// Example - instantiating a date
console.log(new Date(2009, 10, 3))  // Note: the month parameter starts is interpreted zero-based
// ^^ the last 4 arguments (hours, minutes, seconds, milliseconds) are optional and 0 by default

// Example - timestamps are stored in milliseconds, counted all the way back to the start of 1970 (Unix time)
console.log(new Date(2013, 11, 19).getTime())  // 1387436400000
console.log(new Date(1387436400000))  // 2013-12-1970 00:00:000Z <- you may use negative numbers for numbers before 1970
// ^^ Note: a single argument passed in to the constructor will treat it as milliseconds

// Example - retrieving the current timestamp
console.log(new Date().getTime())  // either this
console.log(Date.now())  // <- or by using a static method from Date

// Example - Date object methods
console.log(new Date().getFullYear())
console.log(new Date().getMonth())
console.log(new Date().getDate())
console.log(new Date().getHours())
console.log(new Date().getSeconds())
console.log(new Date().getYear())  // <- returns "current-year - 1900". This is utterly useless. Don't ever use this.

// Example - creating a date object from a string by using parentheses in regular expressions
function getDate(string){
    let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string)
    // ^^ the _ is ignored used only to skip the fully-matched element in the array returned by .exec()
    return new Date(year, month - 1, day)
}
console.log(getDate("1-30-2003"))

/* Words And String Boundaries */
// Example - test for patterns where only numbers span the entire string
console.log(/^\d+$/.test("1234"))  // true
console.log(/^\d+$/.test("12ERS6_"))  // false

// Example - test for patterns where the string starts with an exclamation-mark "!"
console.log(/^!/.test("!hello"))  // true
console.log(/^!/.test("wor!d"))  // false

// Example - do not match any string
console.log(/x^/.test("0xff"))  // false
console.log(/x^/.test("RegEx"))  // false

// Example - using word boundaries
console.log(/cat/.test("concatenate"))  // true
console.log(/\bcat\b/.test("concatenate"))  // false
console.log(/\bcat\b/.test("con cat enate"))  // true

/* Choice Patterns */
let animalCount = /\b\d+ (pig|cow|chicken)s?\b/  // <- use the pipe "|" and parentheses to denote a choice between patterns
console.log(animalCount.test("15 pigs"))  // true
console.log(animalCount.test("1 chicken"))  // true
console.log(animalCount.test("15 pigchickens"))  // false

/* The Mechanics of Matching
    - Regular expressions search patterns starting from the first character of the string up to the end.
        - The first match may be returned if found.
    - An expression is matched if every single one of its elements from left to right are matched within the given string.
*/

/* Backtracking
    - A process in matching regular expressions when more than one possible kind of pattern may be matched to
*/
// Example - regex engine backtracking caused by choice patterns
myRegEx = /\b([01]+b|[\da-f]+h|\d+)\b/  // search for either a binary ("b" suffixed), hexadecimal ("h" suffixed), or decimal number
console.log(myRegEx.exec("0101b 306"))  // backtracks from decimal to binary
myRegEx = /\b(\d+|[\da-f]+h|[01]+b)\b/  // switched binary and decimal places
console.log(myRegEx.exec("0101b 306"))  // backtracks from decimal to binary

// Example - regex engine backtracking caused by repitition operators "+" & "*"
myRegEx = /^.*x/  // 1st: (^.) -> entire string. 2nd: (^.*x) -> backtracks a character less, until "abc" is found
console.log(myRegEx.exec("abcxe"))  // backtracking occurs until "abc" is found where an "x" occurs after "abc"
// ^^ The final positions where the match is found then occurs from index 0 to index 4

// Example - accidental backtracking
myRegEx = /([01]+)+b/  // a binary-number regular expression that misproperly uses repitition operators
console.log(myRegEx.exec("10010100010010011001101010101b"))  // here, double the work is done than otherwise

/* The Replace Method
    - Strings possess a .replace() method used for replacing parts of string with other strings
*/
// Example - replacing the first character instance with a different character
console.log("papa".replace('p', 'm'))  // mapa

// Example - using regular expressions
console.log("Borobudur".replace(/[ou]/, "a"))  // "Barobudur" -> the first match is replaced with the given string
console.log("borobudur".replace(/[ou]/g, "a"))  //  "Barabadar" -> the "g" character is used to signify "global" (do all matches)
// ^^ Note: thus, only with use of regular expressions can we replace multiple instances of the given string-part we want

// Example - using matched groups to switch pairs of matched groups
let lastFirst = "Liskov, Barbara" + "\n" + "McCarthy, John" + "\n" + "Wadler, Philip"
let firstLast = lastFirst.replace(/(\w+), (\w+)/g, "$2 $1")  // $2 and $1 refer are bindings of matched groups. $& refers to the whole
console.log(firstLast)  // Behold, the true power of regular expressions

// Example - using a predicate function over a string to process matched arguments
console.log("the cia and fbi".replace(/\b(cia|fbi)\b/g, str => str.toUpperCase()))  // the CIA and FBI
// ^^ so, as you can tell, "str" of the predicate function is actually the groups matched by the regular expression from the string

// Example - using a more complicated predicate function
let stock = "1 lemon, 2 cabbages, and 101 eggs"
function minusOne(match, amount, unit){  // ("entire regex match", "group 1 match", "group 2 match")
    amount -= 1
    if (amount == 0) amount = "no"
    if (amount == 1) unit = unit.slice(0, unit.length - 1)
    return `${amount} ${unit}`
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne))  // "no lemon, 1 cabbage, and 100 eggs"

/* Greed
    - We describe repitition operators ("+", "*", "?", and {}) to be greedy
        - This is because repitition operators will much as many characters as possible before backtracking
    - To turn repitition operators and make them lazy, suffix them with a question mark -> {+? , *? , ?? , {}?}
        - This will cause repitition operators to match as least many characters as possible before backtracking.
            - This causes the regular expression to match more only if the least possible match is invalid.
*/
// Example - a comment that strips comments out of code passed in as strings
function stripComments(code){ return code.replace(/\/\/.*|\/\*[^]*\*\//g, "") }  // [^] = "any character that isn't part of the empty set of characters".
// ^^ Periods are not used because they do not match with new lines, but we still want to read blocks of code
console.log(stripComments("1 + /* 2 */3"))  // "1 + 3"
console.log(stripComments("x + 1;// ten !"))  // x + 1;
console.log(stripComments("1 /* a */+/* b */ 1"))  // "1  1"
// ^^ the engine is greedy and first looked to match the entire string, thus matching the first /* with the second */, eliminating "+"
console.log(/\/\*[^]*\*\//g.exec("/* a */ + /* b */"))  // <- as demonstrated here, where it matched the wrong group we desired

// Example - fixing the previous regular expression by using lazy operators instead of greedy ones
function stripComments2(code){ return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "") }
console.log(stripComments2("1 /* a */+/* b */ 1"))  // "1 + 1" <- here, both /* a */ and /* b */ are matched
console.log(/\/\*[^]*?\*\//g.exec("/* a */ + /* b */"))  // <- now that our repitition operator is lazy, we match to the right comments

/* Dynamically Creating RegExp Objects
    - there are cases when you might not know the exact pattern you need to match against when writing your code.
*/
// Example - dynamically matching with normal names
let name = "Harry"
let text = "Harry is a suspicious character"
let regexp = new RegExp("\\b(" + name + ")\\b", "gi")  // second argument contains arguments for regular expression. In this case, "gi" = "global and insensitive case"
// ^^ remember to escape the slash that belongs to the bounding character when the regexp is expressed in a string
console.log(text.replace(regexp, "_$1_"))  // _Harry_ is a suspicious character

// Example - dynamically matching with weird strings
name = "dea+hl[]rd"  // this will consequentially nonsensically evaluate the regular expression it is passed into
// And so, we'll use backslashes to escape any special character in a given string of input
let nameEscaped = name.replace(/[\\[.+*?(){|^$]/g, "\\$&")
regexp = new RegExp("\\b" + nameEscaped + "\\b", "gi")
text = "This dea+hl[]rd guy is really annoying."
console.log(text.replace(regexp, "_$&_"))  // "This _dea+hl[]rd_ guy is really annoying"

/* The Search Method
    - The .indexOf() method of strings cannot be used with regular expressions, and so we have an analog.
    - the .search() method returns the index of the first pattern matched by the expression
        - otherwise -1 if not found
    - Unlike .indexOf() however, we cannot indicate the starting index/offset to begin the search
*/
// Example
console.log("  word".search(/\S/))  // 2 -> match what that isn't whitespace
console.log("    ".search(/\S/))  // -1 -> it's all whitespace but we're trying to match what that isn't

/* The LastIndex Property - "because confusion is an essential feature of JavaScript's regular-expression interface"
    - Similarly, the .exec() method also does not provide a way to indicate the offset of the search.
    - So, we're going to have to be inventive by using the properties of regular expressions in JavaScript.
        - RegExp.source -> contains the string the expression was created from
        - RegExp.lastIndex -> controls, in limited circumstances, where the next match will start
            - these limited circumstances are when the expression has the global "g" or sticky "y" option passed in
            - furthermore, the matching must happen with the .exec() method and no other.
    - Becareful of how sticky and global regular expressions work, global options in particular as well.
        - Use the global property only when necessary:
            - when replacing parts of strings matched by a given pattern with String.replace(RegExp, String)
            - when explicitly using the lastIndex property to control the offset of where regex matching should begin in a given string.
    - Remember that the lastIndex property requires the use of the .exec() method and the global "g" option in the given regular expression/
*/
// Example - the lastIndex property
let pattern = /y/g  // <- matching for "y" with global option set
console.log(pattern.lastIndex)
pattern.lastIndex = 0  // <- it is a public property, so you can edit it if you want
match = pattern.exec("xyzzy")
console.log(match)
console.log(match.index)  // 4 <- the index at which the matched pattern occured in the given string in put
console.log(pattern.lastIndex)  // 5 <- successful matches update the lastIndex property accordingly to after the character, else set to 0

// Example - demonstrating the difference between global "g" and sticky "y"
let globalExp = /abc/g
console.log(globalExp.exec("xyz abc"))  // ['abc', ...] <- global searches for a match ahead of the lastIndex
let stickyExp = /abc/y
console.log(stickyExp.exec("xyz abc"))  // null <- sticky will only match successfully for patterns occuring at the lastIndex
console.log(stickyExp.exec("abc"))  // ['abc', ...] <- since the lastIndex starts at 0 upon construction, then a match will occur

// Example - demonstrating an effect of invoking the same global regular expression
let digit = /\d/g
console.log(digit.exec("here it is: 1"))  // ['1'] <- the lastIndex gets updated for the current match and thus
console.log(digit.exec("and now: 1"))  // null

// Example - demonstrating how the global option can change the way the String.match() works
console.log("Banana".match(/an/g))  // ['an', 'an']
// ^^ the global option enables String.match(RegExp) to return an array consisting of all matched patterns

/* Looping Over Matches - scanning through all the occurrences of a pattern in a given string */
// Example - accessing the matched objects in a loop body
let input = "A string with 3 numbers in it... 42 and 88."
let numberExp = /\b\d+\b/g
// let match;
while (match = numberExp.exec(input)) console.log(`Found: ${match[0]} at index: ${match.index}`)

/* Passing an INI file - a common problem for using regular expressions
    - The widely used format for the .ini file:
        - Blank lines and lines starting with semicolons are ignored.
        - Lines wrapped in [ and ] start a new section
        - Lines containing an alphanumeric identifier followed by an "=" character add a setting to the current section
        - Anything else is invalid
    - Task: "convert a stringified .ini file into a JavaScript object"
        - Split the file into separate lines.
*/
// Example
function parseINI(string){
    // Start with an object to hold the top-level fields
    let result = {}
    let section = result

    string.split(/\r?\n/).forEach


    return result
}

console.log(parseINI(
    `
    name=Vasilis
    [address]
    city=Tessaloniki
    `
))  // -> {name: 'Vasilis', address: {city: 'Tessaloniki'}}

/* International Characters */
