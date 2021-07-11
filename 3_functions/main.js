/* Defining a Function */
let square = function(x) {return x * x}  // <- always requires braces

/* Bindings and Scopes */
let x = 10
if (1) {
    let y = 20
}
// console.log(x + y)  // ... error <- 'y' is not visible here

/* Functions as Values */
let launchMissiles = function() {
    missleSystem.launch("now")
}
if (1) {
    launchMissiles = function() {/* do nothing */}  // <- you can redefine a variable
}

/* Declaration Notation */
console.log(square(10))  // ... 100
function square2(x){return x*x}  // <- evaluated first by the program

/* Arrow Functions */
let square3 = x => x*x  // <- function(x) {return x*x}
let horn = () => console.log("toot")  // <- parenthesis required when no parameters are required

/* Call Stack 
    - Call stack -> where the computer stores the context of execution. Requires memory.
    - When a call stack is too big, execution will fail and produce an error message:
        - "out of stack space" or
        - "too much recursion"
*/
// function chicken() {return egg()}
// function egg() {return chicken()}
// console.log(chicken() + " came first")  // RangeError: Maximum call stack size exceeded

/* Optional Arguments */
function square4(x) {return x*x}
console.log(square4(4, true, "hedgehog"))  // ...16 <- 
// ^^ JavaScript will ignore extraneous arguments and assign 'undefined' to missing ones

// A function that intentionally uses this behavior
function minus(a, b){
    if (b === undefined) return -a
    else return a - b
}
console.log(minus(10))  // ...-10
console.log(minus(10, 5))  // ...5

/* Closure - what happens to local bindings when the function call that created them is no longer active? 
    - To reference a specific instance of a local binding in an enclosing scope is called 'closure'
    - A function that references bindings from local scopes around it is called a 'closure function'
*/
function wrapValue(n){
    let local = n  // <- reinitializes when called again
    return () => local  // <- returns function() {return local}
}

let wrap1 = wrapValue(1)  // <- declare a function that returns the argument passed in
let wrap2 = wrapValue(2)
console.log(wrap1())
console.log(wrap2())

// Creating functions that multiply by an arbitrary amount
function multiplier(factor){
    return number => number * factor  // <- returns this function where 'factor' gets passed down to it
}

let twice = multiplier(2)
let thrice = multiplier(3)
console.log(twice(5))
console.log(thrice(10))

/* Recursion */
// A function that calls itself is 'recursive'. This is fine as long as it doesn't overflow the call stack.
function power(base, exponent){
    if (exponent === 0){
        return 1
    } else {
        return base * power(base, exponent - 1)  // <- this function will keep functioning
    }
}
// ^^ Recursive functions however are around 3x slower than using loops

console.log(power(2, 3))
console.log(power(2, 0))

// Find a number by starting from 1 and either repeatedly adding 5 or multiplying by 3
function findSolution(target){  // <- Satisfied when it finds a sequence
    function find(current, history){
        if (current == target){
            return history
        } else if (current > target) {
            return null
        } else {
            return find(current + 5, `(${history} + 5)`) || find(current * 3, `(${history} * 3)`)
            // ^^ this if not null otherwise this if also not null, else null if both are null
        }
    }

    return find(1, "1")
}

console.log(findSolution(131))

/* A call stack model: recursive short-circuiting -> brute-force algorithm
target = 13
start = 1

1 (main branch): <- 2+(2+2)+(2+2+2) = 12 computations <- found on main.B.A.A
    1 + 5 (main.A): <- 2+2 computations
        6 + 5 (main.A.A):
            11 + 5 (main.A.A.A):
                (null) 16
            11 * 3 (main.A.A.B):
                (null) 33
        6 * 3 (main.A.B):
            (null) 18
    1 * 3 (main.B): <- 2+2+2
        3 + 5 (main.B.A):
            8 + 5 (main.B.A.A):
                (return) 13
            8 * 3 (main.B.A.B):
                (null) 24
        3 * 3 (main.B.B):
            9 + 5 (main.B.B.A):
                (null) 14
            9 * 3 (main.B.B.B):
                (null) 18
*/

/* Growing functions - "don't add cleverness unless the need is paramount, else waste your time" */
// First attempt <- NOT scalable
let printFarmInventory = function(cows, chickens){
    let cowString = String(cows)
    while (cowString.length < 3){
        cowString = "0" + cowString
    }
    console.log(`${cowString} Cows`)
    let chickenString = String(chickens)
    while (chickenString.length < 3){
        chickenString = "0" + chickenString
    }
    console.log(`${chickenString} Chickens`)
    // <!-- insert code for pigs, sheep, ... :'( it's not scalable -->
}
printFarmInventory(7, 11)

// Second attempt <- scalable but awkward
function printZeroPaddedWithLabel(number, label){
    let numberString = String(number)
    while (numberString.length < 3){
        numberString = "0" + numberString
    }
    console.log(`${numberString} ${label}`)
}

printFarmInventory = function(cows, chickens, pigs){
    printZeroPaddedWithLabel(cows, "Cows")
    printZeroPaddedWithLabel(chickens, "Chickens")
    printZeroPaddedWithLabel(pigs, "Pigs")
}
printFarmInventory(7, 11, 3)

// Attempt 3 <- scalable, versatile
function zeroPad(number, width){
    let numberString = String(number)
    while (numberString.length < width){
        numberString = "0" + numberString
    }
    return numberString
}

printFarmInventory = function(cows, chickens, pigs){
    console.log(`${zeroPad(cows, 3)} Cows`)
    console.log(`${zeroPad(chickens, 3)} Chickens`)
    console.log(`${zeroPad(pigs, 3)} Pigs`)
}
printFarmInventory(7, 11, 3)

/* Functions and Side Effects 

    Functions can either be used/called for:
        - returning a value (more versatile)
        - executing side effects (human interactable)
        - or both
    
    - "pure function" - a kind of value-producing function that:
        - has no side effects
        - and doesn't rely on side effects (like relying on a global bindings)
    If a pure function works, it will work anywhere for any length of time


*/