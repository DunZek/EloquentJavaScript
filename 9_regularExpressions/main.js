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
