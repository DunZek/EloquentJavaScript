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

/* Script Data Set
require('./05_higher_order/code/scripts')

/* Filtering Arrays */
function filter(array, predicate){
    let passed = []
    for (let element of array) if (predicate(element)) passed.push(element)
    return passed
}

// console.log(filter(SCRIPTS, script => script.living))
// console.log(SCRIPTS.filter(script => script.living))  // use method notation

/* Transforming With Map */
function map(array, predicate){
    let mapped = []
    for (let element of array) mapped.push(predicate(element))
    return mapped
}

console.log([1, 2, 3, 4, 5].map(number => number - 1))

/* Summarizing With Reduce */
function reduce(array, predicate, start_element){
    let current_element = start_element
    for (let element of array) current = predicate(current_element, element)
    return current_element
}

console.log([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((current, element) => current + element))  // 55

// Demonstration - finding the script with the most characters
let characterCount = script => script.ranges.reduce((count, [from, to]) => count + (to - from), 0)
// console.log(SCRIPTS.reduce((current, element) => characterCount(current) > characterCount(element) ? current : element))

/* Composability */
// for loop
let biggest = null
for (let script of SCRIPTS) if (biggest == null || characterCount(script) > characterCount(biggest)) biggest = script
console.log(biggest.name)
// higher-order array methods
