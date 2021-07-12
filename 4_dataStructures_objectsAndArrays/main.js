/* Properties 
    - 'undefined' and 'null' have no properties
*/

const JOURNAL = require('./04_data/code/journal')

// There are two ways of accessing a data-type's properties
let list = [1, 2, 3, 4, 5]
let string = "Hello world"

console.log(list.length)  // <- with dot-notation, which access the property itself
console.log(list["length"])  // <- or using brackets, where the expression inside is evaluated first to access a property
console.log(string["length"])  // ditto
console.log(string[0])  // <- use brackets to access an element; a property of the string

/* Methods */
let doh = "Doh"
console.log(typeof doh.toUpperCase)  // ...function
console.log(doh.toUpperCase())  // ...Doh

// "stack" -> a traditional data-structure that allowed values to be pushed to the end and be popped at the end as well
let stack = [1, 2, 3]
stack.push(4)
stack.push(5)
console.log(stack.pop())  // ...5 <- the return value of this side-effect method is the value being popped
console.log(stack)  // <- as you can tell, the value is popped as well

/* Objects */
let anObject = {left: 1, "right": 2}  // brackets are also used to define an object.
// ^^ Note: object-property bindings can be declared with quotations if they do not follow binding conventions
delete anObject.left  // <- this unary operator deletes the chosen object property
console.log("left" in anObject)  // ...false

// .keys() method returns a string-list of the properties of the object
console.log(Object.keys({name: "John", "full name": "John doe"}))

// .assign() method copies all proprties from an object into another
let objectA = {a: 1, b: 2}
Object.assign(objectA, {b: 3, c: 4})
console.log(objectA)  // ... {a: 1, b: 3, c: 4}

// Arrays/lists are revealed to just be another kind of object
list = ["Hello", "World"]  // ...list
console.log(typeof list)

// Weresquirrel: objects
let journal = [
    {
        events: ["work", "touched tree", "pizza", "running", "television"],
        squirrel: false
    },
    {
        events: ["work", "ice cream", "cauliflower", "lasagna", "touched tree", "brushed teeth"],
        squirrel: false
    },
    {
        events: ["work", "cycling", "break", "peanuts", "beer"],
        squirrel: true
    }
]

/* Mutability 
    - Values such as numbers strings and Booleans are immutable
    - Objects such as objects and arrays on the other hand, can have their properties be changed, and are thus mutable
*/

// Having the same reference is not the same as having the same properties
let object1 = {value: 10}
let object2 = object1
let object3 = {value: 10}
console.log(object1 == object2)  // ...true
console.log(object1 == object3)  // ...false
object1.value = 15
console.log(object2.value)  // ...15 <- object1 and object2 have the same identity
// ^^ the "==" operator compares identities

// Binding key-words control whether a binding is allowed to be define again
const score = {visitors: 0, home: 0}
score.visitors = 1  // <- OK, properties are still mutable
// score = {visitors: 1, home: 1}  // <- NO, reuse of constant bindings is prohibited

/* Weresquirrel: Lycanthrope's Log 
    - correlation -> measure of dependence between statistical variables.
        - Usually expressed as a value that ranges from -1 to 1
            - "-1" - opposingly correlated
            - "0" - no correlation
            - "1" - definitely correlated
    - measurements -> sets of statistical variables
    - "phi (ϕ) coefficient" -> calculated by a formula for measuring correlation between two Boolean variables
        - Input -> a frequency table of different variable combinations
        - Output -> a number between -1 and 1 (phi "ϕ" itself)

*/
// let journal = []
function addEntry(events, squirrel){
    journal.push({events, squirrel})  // <- pushing an object and its properties into the array
}

/* Computing Correlation

    - Neither squirrel nor pizza (00): 76
    - Pizza (01): 9
    - Squirrel (10): 4
    - squirrel AND pizza (11): 1
    
    - All of squirrel (1*): 5
    - None of squirrel (0*): 85
    - All of pizza (*1): 10
    - None of pizza (*0): 80

    ϕ = ( (11)x(00) - (10)x(01) )/sqrt( (1*)x(0*)x(*1)x(*0) )
*/
function calculatePhi(table){
    return (table[3]*table[0] - table[2]*table[1]) / 
        Math.sqrt(
            (table[2] + table[3]) *  // (1*)
            (table[0] + table[1]) *  // (0*)
            (table[1] + table[3]) *  // (*1)
            (table[0] + table[2])    // (*0)
        )
}

console.log(calculatePhi([76, 9, 4, 1]))  
// ^^ interpret the index number as binary [00, 01, 10, 11] = [0, 1, 2, 3]

// Extracting a two-by-two table for a specific event from the journal
require('./04_data/code/journal')  // <- use a different dataset
function tableFor(event, journal){
    let table = [0, 0, 0, 0]  // [00, 01, 10, 11] -> (Neither, Event, Squirrel, Both)
    for (let i=0; i < journal.length; i++){
        let entry = journal[i], index = 0
        if (entry.events.includes(event)) index += 1
        if (entry.squirrel) index += 2
        table[index] += 1  // increment amount of observation
    }
    return table
}
console.log(tableFor("pizza", JOURNAL))  // where 'event' = "pizza"

/* Array Loops */
// Accessing array elements is common practice
for (let i = 0; i < JOURNAL.length; i++){
    let entry = JOURNAL[i]
}
// and so the syntax has been simplified in modern ES6
for (let entry of JOURNAL) console.log(`${entry.events.length} events`)
for (let char of "Hello World") console.log(char)  // <- this also works for other datatypes

/* The Final analysis */
// Log every event into a list
function journalEvents(journal){
    let events = []
    for (let entry of journal){
        for (let event of entry.events) if (!events.includes(event)) events.push(event)
    }
    return events
}
console.log(journalEvents(JOURNAL))

// Calculate and show the correlation between 'squirrel' and a given event
for (let event of journalEvents(JOURNAL)) console.log(event + ":", calculatePhi(tableFor(event, JOURNAL)))

// Filter to show only results with correlations greater than 0.1 or less than -0.1
for (let event of journalEvents(JOURNAL)){
    let correlation = calculatePhi(tableFor(event, JOURNAL))
    if (correlation > 0.1 || correlation < -0.1) console.log(event + ":", correlation)
}

// Modify event to push the "peanut teeth" event when Jacques does not brush his teeth and also ate peanuts
for (let entry of JOURNAL) {
    if (entry.events.includes("peanuts") && !entry.events.includes("brushed teeth")){
        entry.events.push("peanut teeth")
    }
}
console.log(calculatePhi(tableFor("peanut teeth", JOURNAL)))  // ...1 <- check correlation. 
// ^^ "peanut teeth" event nothing but correlated.

/* Further "Arrayology" */
// Array method for adding and removing starting elements
let todoList = []
let remember = task => todoList.push(task)  // add to end
let getTask = () => todoList.shift()  // remove from start
let rememberUrgently = task => todoList.unshift(task)  // add to start

remember("groceries")
remember("laundry")
remember("baking")
getTask("groceries")

// To return the index of a particular item:
console.log([1, 2, 3, 2, 1].indexOf(2))  // searches the entire array. Returns -1 if not found
console.log([1, 2, 3, 2, 1].lastIndexOf(2))  // searches in reverse. Can take an optional argument where to start search

// .slice() -> return elements of array at starting value up to ending value
console.log([0, 1, 2, 3, 4].slice(2, 4))  // ...[2, 3] <- inclusive starting parameter, exclusive ending parameter
console.log([0, 1, 2, 3, 4].slice(2))  // passing only a single argument means to select up to the end
// ^^ Passing no arguments will results in returning the entire array

// .concat() -> push an array of elements to an existing one
function removeChar(array, index){ return array.slice(0, index).concat(array.slice(index + 1)) }
// ^^ return up to but not including the character, then concatenate the remaining array
console.log(removeChar['a', 'b', 'c', 'd', 'e'], 2)  // <- returns an array without 'c'
// Note: .concat() will push non-array elements to the invoked array

/* Strings and their Properties 
    - Values of type string, number, and Boolean are not objects.
        - However, these types do still have built-in properties regardless. 
    - The language will not complain if new properties are set though.
    - strings have methods synonymous to those of arrays
*/
let kim = "Kim"
kim.age = 88  // defining a new property to this string
console.log(kim.age)  // ...undefined <- this doesn't work

// .trim() -> removes whitespace (spaces, newlines, tabs, etc) from a string 
console.log("    okay      \n  ".trim())

// .padStart() -> shifts a given character to the start a particular amount of times
console.log(String(6).padStart(3, "0"))

// .join() -> join an array of strings together using a given delimiter
let sentence = "Secretarybirds specialize in stomping"
let words = sentence.split(" ")
console.log(words.join(". "))

// .repeat() -> return a string concatenated together a given amount of times
console.log("LA".repeat(3))  // ..."LALALA"

/* Rest Parameters - because sometimes we need an arbitrary amount of arguments passed in for our function */
function max(...numbers){  // <- use this syntax.
// ^^ Any parameter defined before the rest parameter (...) is not part of the array
    let result = -Infinity  // placeholder for the lowest possible number (just for the sake of the initial comparison)
    for (let number of numbers) if (number > result) result = number  // loop through entire array of numbers
    return result  // the biggest number will be returned as a result of the loop of comparison
}
console.log(max(4, 1, 9, -2))  // ...9

// To pass all the elements of an array, use the three-dot notation as well
let numbers = [5, 1, 7]
console.log(max(...numbers))  // <- Note: this ends up passing all the elements as seperate arguments desire by consequence

// The three-dot notation can also be used in forming arrays
words = ["never", "fully"]
console.log(["will", ...words, "understand"])

/* The Math Object 
    - used as a 'namespace' for many useful functions and values that do not have global bindings.
        - it is as an 'object' is not useful otherwise
    - Objects are used as namespaces for functions and values so that the global namespace isn't polluted, reducing programmer mistakes.
*/

// While it is illegal to reclare values and functions initiated with 'let' and 'const', JavaScript ignores the following:
var binding = 0
var binding = 0
function my_func() {return}
function my_func() {return}

// Demonstration of various useful Math methods
function randomPointOnCircle(radius){
    let angle = Math.random() * 2 * Math.PI  // <- Math.random() returns a number from 0 up to but not 1
    return {x: radius * Math.cos(angle), y: radius * Math.sin(angle)}
}
console.log(randomPointOnCircle(2))

/* Destructuring - used because array can sometimes be awkward and confusing to work with */
function calculatePhi([n00, n01, n10, n11]){  // <- 'table' gets deconstructed into these array parameters
    return (n11 * n00 - n10 * n01) / Math.sqrt(
        (n10 + n11) *
        (n00 + n01) *
        (n01 + n11) *
        (n00 + n10)
        )
}

// Deconstructuring also works for objects, but using braces
let my_object = {name: "Faraji", age: 23}
let {name, age} = my_object  // <- you can deconstruct an object, allowing access to particular properties made via particular bindings
console.log(name, age)

/* JSON - Storing data values and addresses by serializing them, converting them into a flat description of such 
    - Java Script Object Notation
    - 'serializing' converting something into a flat description of what it represents to be stored permanently after program execution
    - JSON does not allow function calls, bindings, anything involving computation, nor even comments
    - Every JSON property, both key and value, must be encased with double-quotes, unless they are Boolean values
*/

// JSON.stringify() - return a JSON-encoded string from a JavaScript object
let string = JSON.stringify({squirrel: false, events: ["weekend"]})
console.log(string)  // <- {"squirrel":false,"events":["weekend"]}

// JSON.parse() - return a JavaScript object from a JSON-encoded string
console.log(JSON.parse(string).events)  // <- access a property as well while you're at it
