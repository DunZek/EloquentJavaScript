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
// Demonstration - a function that creates other Functions
function multiplyBy_proto(n) { return m => m * n }  // return a single-parameter function
let multiplyBy10 = multiplyBy_proto(10)  // return arg * 10
// -> let multiplyBy10 = m => m * 10
// console.log(multiplyBy10(2))

// Demonstration - a function that changes other functions
function log(predicate){
    return (...args) => {
        console.log("Calling with", args)
        let result = predicate(...args)
        console.log("Calling with", args, ", resulting in", result)
        return result
    }
}

log(Math.min)(1, 2, 3)  // declare and invoke

// Demonstration - a function that introduces new control flow
let parrots = [
    {name: "Terry", age: 20},
    {name: "Puffy", age: 10},
    {name: "Gilbert", age: 30},
    {name: "Pickette", age: 8}
]
function unless(test, then){ if (test) then() }
for (let parrot of parrots){
    unless(parrot.age < 15, () => console.log(`Parrot ${parrot.name} is young`))
}

// Array.forEach()
let forEach = (array, predicate) => { for (let element of array) predicate(element) }  // implementation
forEach(parrots, parrot => console.log(parrot.name))  // invocation
parrots.forEach(parrot => console.log(`Parrot ${parrot.name} is ${parrot.age} old.`))  // invocation of the actual method
