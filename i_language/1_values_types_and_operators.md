# Chapter 1: Values, Types, and Operators
Introduction to JavaScript and programming by exploring ground-level basic understanding

## 1.1 Values

## 1.2 Numbers
- Actual maximum whole number to be represented is around 9 quadrillion
- 64 bits (2^64) can be used to represent a number (signed integer, float).
- Represented using bits (x32, x64)
- Maximum value depends on bit architecture
- Fractional numbers: `9.81`.
- Scientific notation: `2.998e8` or `2.998 x 10^8`.

```js
function more_numbers() {
    // Fractional numbers
    console.log(9.81);

    // Scientific notation
    console.log(2.998e8);  // 2.998e8 = 2.998 x 10^8
}
```

```js
function special_numbers() {
    // Positive numbers too big to represent evaluate to Infinity:
    positive_infinity = Infinity;
    // Negative numbers too big to represent evaluate to -Infinity:
    negative_infinity = -Infinity;
    // NaN's are used to denote the value of nonsensical operations:
    console.log(0 == NaN == Infinity - Infinity);
}
```

## 1.3 Arithematic

## 1.4 Special Numbers
- `Infinity` is used to represent positive numerical overflows.
- `-Infinity` is used to represent negative numerical overflows.
- `NaN` is for representing nonsensical results.


## 1.5 Strings
- The maximum bit size for representing strings is 16 in JS.
- There are $2^16$ possible combinations of Unicode characters.
- Concatenation: `"Lie on " + 'the ocean floor'`.
- Back ticks register newlines: ```string = `Hello World` ```.
- String templates: ``half of 100 is ${100 / 2}``.

```js
function strings() {
    // Single and double quotes are interchangeable to represent a string
    "Lie on " + 'the ocean floor';

    // Back ticks carry over white spaces unlike quotation strings
    tick = `Hello
    World`;
    
    // Print string
    console.log(tick);
}
```

## 1.6 Unary Operators
- Negative sign: `-50`.
- Negator: `!(true == true)  // false`.
- Keywords: `typeof 30  // number`.

```js
function unary_operators() {
    // Negation operators
    console.log(-50);
    console.log(!(true == true));  // false

    // Getting the type of a value
    console.log(typeof 30);  // number
}
```

## 1.7 Boolean Values

## 1.8 Comparison
- `"apple" > "Archimedes"  // true` - ordinal Unicode positions of characters are compared
- `"AbC" > "ABC"  // true` - because `b` comes before `B`
- `NaN == NaN  // false` - because `NaN` denotes nonsensical computation and so doesn't equate to anything else

```js
function comparison() {
    // The ordinal unicode position of the characters can be compared to one another:
    console.log("apple" > "Achimedes");  // true
    // NaN denotes nonsensical computation and isn't equal to anything, even itself:
    console.log(NaN === NaN);  // false
}
```

## 1.9 Logical operators
The order of operators in JavaScript go as follows:
1. Numerical operators: `+, &, /`.
2. Comparison operators: `>=, ==`.
3. Logical operator: `&&`.
4. Logical operator: `||`.

```js
function logical_operators() {
    console.log("Example: ", 1 + 1 == 2 && 10 * 10 > 50);  // true  
}
```

Ternary operator:
- Returns first value if true else second value.
- `true ? 1 : 2  // 1`
- `false ? 1 : 2  // 2`

```js
function ternary_operator() {
    // Reads as: "if true, then return left value, else right"
    console.log(true ? 1 : 2);  // 1
    console.log(false ? 1 : 2);  // 2
}
```

## 1.10 Empty values
- Denote the absence of meaningful results.
- Can be used as return placeholders.
- `null == undefined  // true`

## 1.11 Automatic type conversion
- To avoid automatic type conversion during comparison operations, use `===` ("identical to") operator:
    - `false === 0  // false`
- Otherwise, the JavaScript language's possesses an intentional feature to convert types when executing operations.
- `8 * null  // 0` - `null` type-converts to 0 upon mathematical operations
- `"5" - 1  // 4` - stringified numbers type-convert to numbers
- `"5" + 1  // 51` - unless the operation is addition, which causes numbers to concatenate unto strings
- `"five" * 2  // NaN`
- `false == 0  // true` - booleans type convert to numbers upon operations

## 1.12 Short-circuiting of logical operators
- Used to control the evaluation of type-converting logical operations. The type conversion of logical operators is as defined as below.
- `0`, `NaN`, `""` count as false, while everything else counts as true
- Using the `||` "OR" operator:
    - `null || "user"  // "user"` - returns left value if it *can* be type-converted to `true`, otherwise the right value
    - `"Agnes" || "user"  // Agnes`
    - `0 || -1  // -1`
- Using the `&&` "AND" operator:
    - `null && "user"  // null` - returns left value if it *can't* be type-converted to `true`, otherwise the right value
- Note that the expression to the right of these short-circuiting operators evaluate only if necessary: when the left-side value does not meet the requirement of the operator.
- Thus, right-side expressions do *not* evaluate if the left-side expressions can be.
