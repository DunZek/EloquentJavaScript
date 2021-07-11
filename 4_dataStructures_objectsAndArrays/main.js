/* Properties */

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

// Weresquirrel
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

/* Lycanthrope's Log */