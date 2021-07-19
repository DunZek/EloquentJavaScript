/* Language
    - JavaScript reduces the computer's ability to inform us of mistakes due to its loose strictness in usage.
        - typos are not caught
        - there are no complaints computing nonsensical operations such as true * "monkey"
            - this produces NaN or undefined values without complaint, thus may requiring a long process of debugging
    - What JavaScript complains about:
        - when the program does not follow the langauge grammar.
        - invoking functions or methods that do not exist.
        - invoking a property on an undefined value
*/
// "Debugging" - the process of identifying and fixing problems in computer programs

/* Strict Mode
    - "use strict" a key word placed in the top of files or function bodies in order to make the JavaScript language stricter
    - Calling methods as functions:
        - Not strict -> "this" value into the global scope object (an object whose properties are the global bindings)
        - Strict -> "this" value becomes undefined
    - Constructor functions in classes are always in strict-mode
    - Furthermore, strict-mode:
        - disallows function parameters with the same name
        - removes particular problematic language features entirely
            - the "with" statement in particular is horrible
    - Several JavaScript dialects can provide help in alleviating programmer problems with vanilla JavaScript
        - TypeScript is a popular one that alleviates type problems
*/
function canYouSpotTheProblem(){
    "use strict";  // this keyword allows errors to arise properly
    // JavaScript will register "counter" as a global binding if the "let" keyword is forgotten
    for (counter = 0; counter < 0; counter++) console.log("Happy happy")
}
// canYouSpotTheProblem()  // ReferenceError: counter is not defined

// Demonstration - invoking a constructor function without the "new" keyword
function Person(name) { this.name = name }  // <- "this" will refer to the global scope object, not the object in question
let ferdinand = Person("Ferdinand")  // oops, Person() returned undefined while creating a global binding called "name"
console.log(name)  // Ferdinand <- name has become a global binding as a result
// Otherwise, strict-mode will again, evaluate the "this" keyword into undefined when methods are invoked as functions
"use strict";
function Parrot(name) { this.name = name }
let parrotTerry = Parrot("Terry")  // TypeError: Cannot set property 'name' of undefined

/* Types
    - Some languages require type keywords when instantiating bindings
    - JavaScript does not evaluate a binding's type until runtime.
        - Furthermore, JavaScript actually sometimes converts a bindings into different types invisibly
    - It is best to know the datatypes of bindings. It is best to know what goes in and out of function bodies
*/
// A comment following before the function like so can alleviate confusion and thus problems
// (VillageState, Array) -> {direction: string, memory: Array}
function goalOrientedRobot(state, memory){ return }

/* Testing
    - To actively test a program against cases in order to measure performance and debug problems
        - Tests are not conducted manually, but repetitively by computers
    - "Automated testing" - writing a program to test another. This enables programmers to spot code problems immediately
    - "Test suites" - pieces of software that provide a language with the functions and methods suited to:
        - writing tests and
        - outputting informative logs.
        - These are also called as "test runners"
    - Self-contained persistent values are easier to test with
*/
// Example - a test upon a common method
function test(label, body){
    if (!body()) console.log(`Failed: "${label}"`)
}

test("convert Latin text to uppercase", () => "hello".toUpperCase() == "HELLO")
test("convert Greek text to uppercase", () => "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ")
test("don't convert case-less characters", () => "مرحبا".toUpperCase() == "مرحبا")

/* Debugging
    - Often on complicated programs, error logs often only point to the start of the problem and do not identify the entire problem itself
*/
// Example - a program that tries to convert a whole number to a string in a given base (decimal, binary, etc)
// The program does this by repeatedly "picking out the last digit and then dividing the number to get rid of this digit"
function numberToString(n, base = 10){
    let result = "", sign = ""
    if (n < 0){
        sign = "-"
        n = -n
    }
    do {
        result = String(n % base) + result
        n /= base
    } while (n > 0)

    return sign + result
}

console.log(numberToString(13, 10))  // 1.5e231.3e-3221.3e-3211.3e-3201.3e-3191.3e-3181.3...

/* Error Propagation */

/* Exceptions */

/* Cleaning Up After Exceptions */

/* Selective Catching */

/* Assertions */

/* Summary */
