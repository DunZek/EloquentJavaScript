/* Abstraction 
    "Allying your programming as closely effective as possible to the problem-solving at hand"
*/

const SCRIPTS = require('./05_higher_order/code/scripts')

/* Abstracting repetition */
// Stage 1 - A repeating program
for (let i=0; i < 10; i++) console.log(i)

// Stage 2 - Controlling the number of calls to console.log(), as an example of abstracting repetition
let repeatLog = n => {for (let i=0; i < n; i++) console.log(i)}

// Stage 3 - Extending the concept of abstract repetition for other programs
let repeat = (n, action) => {for (let i=0; i < n; i++) action(i)}

// Demonstration: Pre-defined function
repeat(3, console.log)
// Demonstration: Inline declaration
let labels = []
repeat(5, i => labels.push(`Unit ${i+1}`))

/* Higher-Order Functions 
    - functions that operate on other functions by parameterizing or returning them 
    - Allows us to abstract actions, not just values
*/
// Demonstration - A function used to create new functions
function greaterThan_proto(n) { return m => m > n }
let greaterThan10 = greaterThan_proto(10)
console.log(greaterThan10(11))  // ...true

// Demonstration - A function that changes other functions
function noisy(f){
    return (...args) => {
        console.log("calling with", args)
        let result = f(...args)
        console.log("called with", args, ", returned", result)
        return result
    }
}

noisy(Math.min)(3, 2, 1)

// Demonstration - A function that introduces new control flow
function unless(test, then){ if (!test) then() }

repeat(3, n => {
    unless(n % 2 == 1, () => {
        console.log(n, "is even")
    })
})

// forEach - perform an action on and for each array element 
let my_list = ['A', 'B']
my_list.forEach(element => console.log(element))  // ...A B

/* Script Data Set */
require('./05_higher_order/code/scripts')

/* Filtering Arrays */
// A pure function used to dictate the logic of another
function filter(array, test){
    let passed = []
    for (let element of array) if(test(element)) passed.push(element)
    return passed
}

console.log(filter(SCRIPTS, script => script.living))
// We will use this convention after showing how the function works
// console.log(SCRIPTS.filter(script => script.direction == "ttb"))

/* Transforming With Map */
// How the Array.map() method works
function map(array, transform){
    let mapped = []
    for (let element of array){
        mapped.push(transform(element))
    }
    return mapped
}
// console.log(SCRIPTS.mapArray(script => script.name))
console.log(map(SCRIPTS, script => script.name))
console.log(map(filter(SCRIPTS, script => script.direction == "rtl"), script => script.name))

/* Summarizing with Reduce */
// higher-order array method used for computation. Sometimes called 'fold'
function reduce(array, combine, starting_current){
// ^^ the standard method meanwhile doesn't require the "start" argument if '0' is assumed (???)
    let current = start_current
    for (let element of array) current = combine(current, element)
    return current
}

// console.log(reduce([1, 2, 3, 4, 5], (a, b) => a + b, 0))

// Demonstration - finding the script with the most characters
let characterCount = script => script.ranges.reduce((count, [from, to]) => count + (to - from), 0)
console.log(SCRIPTS.reduce((a, b) => characterCount(a) > characterCount(b) ? a : b))

/* Composability */
// Without higher-order array methods, dealing with arrays can still be done
let biggest = null
for (let script of SCRIPTS){
    if (biggest == null || characterCount(biggest) < characterCount(script)) biggest = script
}
// However, when composing high-volume operations, it's best to otherwise abstract code to make it manageable
// Demonstration - find the average year of origin for living and dead scripts using higher-order methods
// let average = array => reduce(array, (a, b) => a + b) / array.length
// console.log(Math.round(average(SCRIPTS.filter(s => s.living).map(s => s.year))))
// console.log(Math.round(average(SCRIPTS.filter(s => !s.living).map(s => s.year))))

// Demonstration - implementing the same operations without higher-order methods
let total = 0, count = 0
for (let script of SCRIPTS){
    if (script.living){
        total += script.year
        count += 1
    }
}
// console.log(Math.round(average(total / count)))

/* Strings and Character Codes 
    - JavaScript strings are encoded as a sequence of 16-bit numbers 
        - There are then therefore 65,536 Unicode character combinations
    - UTF-16, a 16-bit format that JavaScript uses, was invented to describe:
        - common characters using a single 16-bit code
        - uncommon characters using a pair of 16-bit codes
    - UTF-16 has problems however:
        - it allows programs to mistake code units for characters
        - languages using two-unit characters will break programs
*/
const characterScript = code => {  // <- "code" here refers to a UTF-16 code for JavaScript strings
    // Array.some() takes a pure function and returns a Boolean
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => code >= from && code < to)) return script
    }
    return null
}

console.log(characterScript(121))

// Demonstration - string method to return a character's code unit
let horseShoe = "🐴👟"
console.log(horseShoe.length)  // ...4
console.log(horseShoe[0])  // ...(Invalid half-character)
console.log(horseShoe.charCodeAt(0))  // ...55357 (Code of the half-character)
console.log(horseShoe.codePointAt(0))  // ...128052 (Actual code for horse emoji)

// Demonstration 
let roseDragon = "🌹🐉"  // (characters are strings themselves of the two code units they're encoded with)
for (let char of roseDragon) console.log(char)

/* Recognizing Text */
// Count the elements of the given array in the groups specified by the predicate function
function countBy(items, groupName){  // (array, predicate)
    let counts = []
    for (let item of items){
        let name = groupName(item)  // predicate that returns a group name after computation with argument
        let known = counts.findIndex(c => c.name == name)  // detect if encountered
        if (known == -1) counts.push({name, count: 1})  // if not encountered, create "group" object
        else counts[known].count++  // else, increment existing "group" object
    }
    return counts
}

console.log(countBy([1, 2, 3, 4, 5], n => n > 2))  // <- in this example, the iterable is an array of numbers
// ^^ [{name: false, count: 2}, {name: true, count: 3}]

// Demosntration - using countBy() to return an array of scripts used in a given piece of text
function textScripts(text){
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0))
        return script ? script.name : "none"
    }).filter(({name}) => name != "none")

    let total = scripts.reduce((n, {count}) => n + count, 0)
    if (total == 0) return "No scripts used found that pertains to the given text"
    
    // else, there were scripts that were found, then perform computation and return a particular string
    return scripts.map(({name, count}) => {
        return `${Math.round(count * 100 / total)}% ${name}`
    }).join(", ")
}

console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'))

/* Summary 
    - Higher-order array methods allows functions to exist that uses other, predicate functions to model
    computation and return values, in order for themselves to return a desired value
    
    - Common higher-order array methods:
        - Array.forEach() -> for looping over elements in the given array
        - Array.filter() -> returns a new array containing only the elements that pass the predicate function
        - Array.map() -> returns an array containing elements returned by the predicate function
        - Array.reduce() -> returns a value as the computational result of the elements of the given array
        - Array.some() -> returns true whether an element in the given array passes the predicate function
            - else return false
        - Array.findIndex() -> returns the index of the first element that passes the predicate function
            - else -1
    
    - Extra:
        -Array.every() -> returns false whether an element in the given array does NOT pass the predicate function
            - else return true
*/