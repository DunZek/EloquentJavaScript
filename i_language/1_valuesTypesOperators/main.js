// Execute examples:



// Notes below, as they are ordered in the book:

/*  Numbers:
    - Actual maximum whole number to be represented is around 9 quadrillion
    - 64 bits (2^64) can be used to represent a number (signed integer, float).
*/

function special_numbers() {
    // Positive numbers too big to represent evaluate to Infinity:
    positive_infinity = Infinity;
    // Negative numbers too big to represent evaluate to -Infinity:
    negative_infinity = -Infinity;
    // NaN's are used to denote the value of nonsensical operations:
    console.log(0 == NaN == Infinity - Infinity);
}

/*  Strings:
    - 16 bits (2^16) can be used to represent a string. It is the maximum size.
    - There are over 2^16 possible unicode characters.
*/
function strings() {
    // Single and double quotes are interchangeable to represent a string:
    "Lie on " + 'the ocean floor';
    // Back ticks carry over white spaces unlike quotation strings:
    tick = `Hello
    World`;
    // console.log() prints strings:
    console.log(tick);
}

function more_numbers() {
    // Fractional numbers:
    console.log(9.81);
    // Scientific notation:
    console.log(2.998e8);  // 2.998e8 = 2.998 x 10^8
}

function unary_operators() {
    // Negation operators:
    console.log(-50);
    console.log(!(true == true));  // false
    // Getting the type of a value:
    console.log(typeof 30);  // number
}

function comparison() {
    // The ordinal unicode position of the characters can be compared to one another:
    console.log("apple" > "Achimedes");  // true
    // NaN denotes nonsensical computation and isn't equal to anything, even itself:
    console.log(NaN === NaN);  // false
}

/*  Logical operators:
    The order of operators in JavaScript go as follows:
    - First (Arithmetic): +, -, *, /, %
    - Second (Comparisons): >=, ==
    - Third: &&
    - Fourth: ||
*/
function logical_operators() {
    // Example:
    console.log("Example: ", 1 + 1 == 2 && 10 * 10 > 50);  // true  
}

function ternary_operator() {
    // Reads as: "if true, then return left value, else right"
    console.log(true ? 1 : 2);  // 1
    console.log(false ? 1 : 2);  // 2
}

function empty_values() {
    // "undefined" denotes the absence of a meaningful value. 
    // They are often used as return placeholders.
    console.log(null == undefined);
}

function automatic_type_conversion () {
    // JavaScript attempts to convert incompatible types and execute the operation:
    console.log(8 * null);      // 8 * 0
    console.log("5" - 1);       // 5 - 1
    console.log("5" + 1);       // "5" + "1"
    console.log("five" * 2);    // NaN
    console.log(false == 0);    // 0 == 0
    // Use the identical comparison operator to negate type conversion:
    console.log(false === 0);   // false
    // It is very useful.
}

/*  Short-circuiting of logical operators:
    - Used to control the evaluation of type-converting logical operators.
    - The type-conversion of logical operators is as defined as below.
*/
function short_circuiting_of_logical_operators() {
    // OR (||) returns the left-value if it can be type-converted to true, otherwise the right one:
    console.log(null || "user")  // "user"
    console.log("Agnes" || "cannot be converted to 'true'")  // "Agnes"
    // Everything else otherwise that isn't one of the left values can be converted to true:
    console.log(0 || false, NaN || false, "" || false)  // false, false, false
    // AND returns the left-value if it can be type-converted to false, otherwise the right one:
    console.log(null && "user")  // null
}    
