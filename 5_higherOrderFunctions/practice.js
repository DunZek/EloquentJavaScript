require('./05_higher_order/code/scripts')

/* Abstracting repetition - the power of higher-order array methods */
// Stage 1 - a custom loop
// for (let i=0; i<=10; i++) console.log(i)

// Stage 2 - invocation functionality
let repeatLog = length => {for (let i=0; i<=length; i++) console.log(i)}

// Stage 3 - detach the concept of repetition from the fixed function
let repeat = (length, action) => {for (let i=0; i<=length; i++) action(i)}
// repeat(10, console.log)  // passing in a predicate function

// Stage 4 - replacing a function binding with inline declaration
let numbers = []
repeat(10, i => numbers.push(i+1))  // <- invoking a higher-order array function using the convention

/* Higher-Order Functions */
// Demonstration - creating other Functions
function multiplyBy_proto(n) { return m => m * n }  // return a single-parameter function
let multiplyBy10 = multiplyBy_proto(10)  // return arg * 10
// -> let multiplyBy10 = m => m * 10
console.log(multiplyBy10(2))

// Demonstration
function noisy(f){
    return (...args) => {
        console.log("calling with", args)
    }
}

noisy(Math.min)(3, 2, 1)
