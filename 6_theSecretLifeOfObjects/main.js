/* Encapsulation 
    - OOP -> divide programs into smaller pieces and make each piece responsible for managing its own state
        - the effect of localization enables programmers to focus all their attention only on that local code
    - "Interfaces" -> that which allows different parts of programs to interact, or interface, with each other
        - usually a limited set of functions or bindings that provide practical abstraction of functionality
    
    - "Objects" -> that which allows program pieces to be modeled. 
        - the interface the consists of a specific set of methods and properties
    - "Public" - properties that are part of the interface
    - "Private" - properties that external code should have no reach to

    - Unfortunately, JavaScript does not distinguish public from private properties.
    - JavaScript programmers can work around this however:
        - Interfaces are described in documentation or comments
        - The "_" is very commonly placed in the start of bindings to indicate that they're private
*/

// "Encapsulation" - The seperation of interface from implementation.

/* Methods - properties that hold function values */
let rabbit = {}
rabbit.speak = line => console.log(`The rabbit says ${line}`)  // <- defining a method
// ^^ the "this" keyword binds the instance the method was called from to the method

// Demonstration - "this"
rabbit.speak("I'm alive.")

function speak(line){ console.log(`The ${this.type} rabbit says '${line}'`) }
let whiteRabbit = {type: "white", speak}
let hungryRabbit = {type: "hungry", speak}

speak.call(hungryRabbit, "Burp!")  // "The hungry Rabbit says 'Burp!'"

// Arrow functions can access the "this" binding of the scope around them
function normalize(){ console.log(this.coords.map(n => n / this.length)) }
normalize.call({coords: [0, 2, 3], length: 5})
// ^^ functions defined with the "function" keyword are incapable of accessing the outer scope's "this" binding

/* Prototypes */

// Objects posses "prototype" apart from "properties", used as a fallback for missing properties
let empty = {}
console.log(empty.toString)  // [Function: toString]
console.log(empty.toString())  // [object Object]
// ^^ here, the appropriate prototype is returned for the missing property

// The prototype of type object is "Object.prototype" which is the root of almost every object
console.log(Object.getPrototypeOf({}) == Object.prototype)  // true
console.log(Object.getPrototypeOf(Object.prototype))  // null <- "Object.prototype" doesn't have a prototype

// Other objects will have their own prototype property
console.log(Object.getPrototypeOf(Math.max) == Function.prototype)  // true
console.log(Object.getPrototypeOf([]) == Array.prototype)  // true

// Object.create can be used to create specific prototypes for objects
let protoRabbit = {
    speak(line){ console.log(`The ${this.type} rabbit '${line}`) }  // <- shorthand way of defining a method
}
// ^^ protoRabbit acts as a container for properties shared by all rabbits

let killerRabbit = Object.create(protoRabbit)
killerRabbit.type = "killer"
killerRabbit.speak("SKREEEE!")  // "The killer rabbit says 'SKREEEE!"
// ^^ an individual instantiation will contain its own identity and sets of properties

/* Classes 
    - JavaScript prototype system can be an analogy of the object-oriented concept called "classes"
    - "Classes" that which defines the methods and properties of a type of object.
    - Common properties and methods are shared amongst all instances of a prototype.
        - the "this" value however is stored in the instance itself
*/
