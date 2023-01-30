// Execute examples:



// Notes below, as they are ordered in the book:

/*  Numbers:
*/



/*  Strings:
    - 16 bits (2^16) can be used to represent a string. It is the maximum size.
    - There are over 2^16 possible unicode characters.
*/








/*  Logical operators:
    The order of operators in JavaScript go as follows:
    - First (Arithmetic): +, -, *, /, %
    - Second (Comparisons): >=, ==
    - Third: &&
    - Fourth: ||
*/




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
