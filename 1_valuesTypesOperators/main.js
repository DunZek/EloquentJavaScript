/*
    Numbers
    - 64 bits (2^64) can be used to represent a number (signed integer, float).
    - Actual maximum whole number to be represented is around 9 quadrillion
*/

/* Special numbers */
positive_infinity = Infinity  // the converted value of a positive number that is too big
negative_infinity = -Infinity  // for negative numbers that are too big
console.log(0 == NaN == Infinity - Infinity)  // NaN's are used to denote the value of nonsensical operations

/* 
    Strings
    - 16 bits (2^16) can be used to represent a string. It is the maximum size.
    - There are over 2^16 possible unicode characters.
*/
"Lie on " + 'the ocean floor'  // single and double are interchangeable to represent a string
// Back ticks carry over white spaces unlike quotation strings
tick = `Hello
World`
console.log(tick)

9.81  // fractional numbers
2.998e8  // 2.998e8 = 2.998 x 10^8 <- scientific notation

/* Unary operators */
console.log(-50)
console.log(!(true == true))  // ... false
console.log(typeof 30)  // ... number

/* Comparison */
console.log("apple" > "Achimedes")  // ... true <- The ordinal unicode position of the first character is compared to one another

console.log(NaN == NaN)  // ... false -> NaN denotes nonsensical computation and isn't equal to any other NaN

/* Logical operators */
console.log(1 + 1 == 2 && 10 * 10 > 50)  // ... true
// +, %, // <- first
// >=, ==  <- second
// AND <- third
// OR <- last

console.log(true ? 1 : 2)  // ... 1 <- if true, then return left value, else right
console.log(false ? 1 : 2)  // ... 2

/* Empty values */
console.log(null == undefined)  // denote the absence of a meaningful value. Can be used as return placeholders.

/* Automatic type conversion - JavaScript attempting to convert incompatible types and execute the operation */
console.log(8 * null)  // null -> 0 ... 0
console.log("5" - 1)  // "5" -> 5 ... 4
console.log("5" + 1)  // 1 -> "1" ... "51"
console.log("five" * 2)  // ... NaN
console.log(false == 0)  // false -> 0 ... true

console.log(false === 0)  // ... false <- use the identical comparison operator to negate type conversion. Very useful.

/* Short-circuiting of logical operators - used to control the evaluation of type-converting logical operators */
// The type-conversion of logical operators is as defined as below
console.log(null || "user")  // ... "user" <- OR returns left value if it can be type-converted to true, otherwise the right
console.log("Agnes" || "cannot be converted to 'true'")  // ... "Agnes"
console.log(0 || false, NaN || false, "" || false)  // ... false, false, false <- everything else otherwise that isn't one of the left values can be converted to true

console.log(null && "user")  // ... null <- AND returns left value if it can be type-converted to false, otherwise the right