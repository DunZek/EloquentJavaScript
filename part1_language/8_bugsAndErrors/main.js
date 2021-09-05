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
    - When a bug and thus problem is identified:
        - Don't immediately start solving. Analyze first why this error has ocurred.
        - Produce observations that tests out your theories.
            - Strategically call console.log() in the program
            - With access to a browser, use its debugging capabilities. Use a "debugger":
                - Setting up "breakpoints" on specific parts of code will pause execution and enable one to inspect bindings
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
        // n /= base
        n = Math.floor(n / base)
    } while (n > 0)

    return sign + result
}
console.log(numberToString(200, 100))  // 1.5e231.3e-3221.3e-3211.3e-3201.3e-3191.3e-3181.3...

/* Error Propagation
    - Not all problems can be prevented by the programmer.
        - Erraneous and malformed inputs can be the direct result of external causes.
    - Keep in mind that production systems must NEVER crash.
        - Sometimes it is best to take bad input in stride and continue running.
        - At other times, it is best to report the issue to the user and to give up.
        - In either situation, the program must respond accordingly to the problem
    - Using special values to indicate error have their own disadvantageous however.
*/
// Example - if a function that takes number inputs but receives strings
function promptNumber(question){
    let result = Number(prompt(question))
    if (Number.isNaN(result)) return null  // the response here may be to return a special value
    else return result
}
console.log(promptNumber("How many trees do you see?"))

// Example - wrapping function results in objects to distinguish success from failure
function lastElement(array){
    if (array.length == 0) return {failed: true}
    else return {element: array[array.length - 1]}
}

/* Exceptions
    - "Exception handling" - stopping the program and proceeding to handle the problem.
    - "Exceptions" - mechanisms that allow code to raise/throw exceptions when problems are confronted.
    - Raising exceptions "unwind the stack", that is, exceptions ignore every context of execution to present itself.
    - Exceptions are used to sense code bug and problems by unwinding the stack.
        - These are to be caught before they completely unwind the stack whenever possible to make a decision.
    - "Stack trace" - the stack of execution measured by the instance of a constructor that creates exception.
        - The instance stores the trace in the "stack" property and can be helpful in debugging the problem.
            - Tells us which function the exception is thrown from and the execution that gave way to it/
*/
// Example
function promptDirection(question){
    let result = prompt(question)
    if (result.toLowerCase() == "left") return "L"
    if (result.toLowerCase() == "right") return "R"
    // If it's neither left nor right, then it's an invalid direction. An exception will be raised using the "throw" keyword
    let myException = new Error("Invalid direction: " + result)
    console.log("Logging (myException.stack): " + myException.stack)  // logging the stack trace of execution
    throw myException
    // ^^ this is just a standard constructor that creates an object with a message property containing the string.
}

function look(){  // notice, this function completely ignores any error caused by promptDirection()
    if (promptDirection("Which way?") == "L") return "a house"
    else return "two angry bears"
}

try {
    // Code will execute here.
    console.log("You see", look())  // It all starts with this function call and all that it entails
} catch (error) {
    // The exception that has resulted from the execution of the try-block will be caught here, and the catch-block will execute
    console.log("Something went wrong: " + error)
}
// ^^ error-handling code is necessary only at the point of execution. Every other function can ignore the error

/* Cleaning Up After Exceptions
    - Thus, execeptions in effect cause control flow.
    - Errors may be caused in every function call and property access. These are all the actions that may cause an exception.
    - Regular control flow may be deceiving in its irremarkable appearance. However,
        - code execution will suddenly fail if an execption is raised.
    - Programs that won't throw an exception may do so in unexpected ways. Not coding side-effects will make the programmer program less bugs.
        - Best to compute new values than to change values. Transaction from state 1 to state 2 will then therefore be complete right away.
        - When catching exceptions, the "finally" block can be used to execute code after the "try" and "catch" blocks.
            - These blocks do not interfere with exceptions, and they run as well alongside them.
*/
// environment
const accounts = {a: 100, b: 0, c: 20}

function getAccount(){
    let accountName = prompt("Enter an account name:")
    if (!accounts.hasOwnProperty(accountName)){
        throw new Error("No such account: " + accountName)
    }
    return accountName
}

// Example 1 - a bad banking system where money is deleted if exceptions occur
function transfer(from, amount){
    if (accounts[from] < amount) return
    accounts[from] -= amount  // money is taken out here to process transfer
    accounts[getAccount()] += amount  // this function is dangerously called to transfer money to another.
    // ^^ An exception occurs when an account isn't found. Money was deducted and now will not transfered to any account. It is just lost.
}

// Example 2 - using a "finally" block
function transfer(from, account){
    if (account[from] < amount) return
    // else, proceed and proceed with the transaction while tracking its progress
    let progress = 0
    try {  // used to proceed transaction
        accounts[from] -= account; progress = 1
        accounts[getAccount()] += amount; progress = 2
    } finally {  // used to revert transaction if exception was raised
        if (progress == 1) accounts[from] += amount  // else, if an account is not reached, return the money that was deducted previously
    }
}

transfer('a', 50)
console.log(accounts)

/* Selective Catching
    - An exception that fully unwinds the stack gets handled by the environment. How it is handled depends on the environment.
        - Browsers -> error descriptions ges written to the JavaScript console.
        - Node.js -> aborts the runtime process when unhandled exceptions occur. It is more careful about data corruption.
    - JavaScript unfortunately doesn't selectively catch exceptions.
        - You will not know which exceptions you have caught therefore.
        - You will also not be able to specify which exceptions to catch.
*/
// Example - an untrackable and immortal bug
for (;;) {  // <- the loop doesn't terminate on its own
    try {
        let direction = promtDirection("Where")  // intentional typo. We are forever going to receive the "undefined variable" error. The loop will not stop
        console.log("You chose" + direction)
        break;  // <- using the "break" keyword is the only way to break out of this loop
    } catch (e) {  // the catch block ignores exceptional values, and so we can never treat this problem properly
        console.log("Not a valid direction. Try again.")
    }
}

// Demonstration - catching specific exceptions by defining an error type and using the "instanceof" operator to identify it in programs
class InputError extends Error {}  // <- here, the new error class doesn't define its own constructor, inheriting its parent class'
// ^^ in fact, it doesn't define anything. Instances will be of the Error class type but just with a different name

function promptDirection(question){
    let result = prompt(question)
    if (result.toLowerCase() == "left") return "L"
    if (result.toLowerCase() == "right") return "R"
    throw new InputError("Invalid direction: " + result)
}

for (;;){
    try {
        direction = promptDirection("Where?")
        console.log("You chose " + direction)
        break;
    } catch (e) {  // this will catch exceptions belonging to only the instances of InputError
        if (e instanceof InputError) {
            console.log("Not a valid direction. Try again.")
        } else {  // otherwise, any other error will be raised
            throw e;
        }
    }
}

/* Assertions
    - "Assertions" - checks in the program that verify if part of the program is working properly. These are used to find programmer mistakes.
    - Reserve assertions for easily computable mistakes.
*/
// Example - when functions should never be called upon empty arrays
function firstElement(array){
    // Raise an exception instead of silently returning undefined when undefined array properties are read.
    if (array.length == 0) throw new Error("firstElement called with []")
    return array[0]
}

/* Summary
    - Problems aren't unnatural. They are an essential part of the process.
    - An important part of programming is diagnosing and fixing problems. Automated test suites and assertions will help do this faster.
    - Problems caused by factors external to the program's operations must be handled with grace.
    - Problems caused within the local program scope can be tracked with special return values. Otherwise, exeptions may be preferable.
    - Throwing exceptions unwinds the call stack until the next enclosing try/catch block or until the bottom of the stack is reached.
        - The exception value is captured by the "catch" block, which should verify that it is the exception we are particularly seeking from our program.
        - The "finally" block is used to address unpredictable control flow in try/catch blocks.
            - It is used to house code that should always run regardless whether exceptions are thrown or not.
*/
