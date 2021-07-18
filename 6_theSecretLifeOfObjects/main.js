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
    - "Classes" - that which defines the methods and properties of a type of object.
    - Common properties and methods are shared amongst all instances of a prototype.
        - the "this" value however is stored in the instance itself
*/
// Prototypes help define the standard properties and methods an instance will inherit
let protoParrot = {
    classification: {
        kingdom: "Animalia",
        phylum: "Chordata",
        class: "Aves"
    },
    good_bird: true,
    squawk(line){ console.log(`Parrot ${this.name} squawked "${line}"`) }
}

// Constructor functions - used with prototypes to create individualized instances
function makeParrot(name, age){
    let parrot = Object.create(protoParrot)
    parrot.name = name
    parrot.age = age
    return parrot
}

let myParrot = makeParrot("Maynard", 25)
console.log(myParrot.name)

// "new" keyword enables functions to be treated as constructors
// ^^ "an object with the right prototype is automatically created, bound to "this" in the function, and returned at the end of the function"
function Parrot(name) { this.name = name }  // name is capitalized to distinguish from other functions
Parrot.prototype.squawk = line => console.log(`Parrot ${this.name} squawks "${line}"`)  // take the prototype property to instantiate a class method
myParrot = new Parrot("Mutinette")
// ^^ use the prototype method of functions and constructors to add properties and methods

// The prototype of instances are held in the prototype property of its constructor
console.log(Object.getPrototypeOf(Parrot) == Function.prototype)  // true
console.log(Object.getPrototypeOf(myParrot) == Parrot.prototype)  // true

/* Class Notation
    - JavaScript classes before 2015 were a combination of:
        - constructor functions, which instantiated individual class instances and
        - prototypes, which were properties that held the common properties and methods of class instances
    - In ES6 (JavaScript 2015), the "class" notation was introduced to properly incorporate OOP into JavaScript
*/
// Class declaration
class ParrotClass {
    constructor(name){  // actual constructor function
        this.name = name
    }
    classification = {
        kingdom: "Animalia",
        phylum: "Chordata",
        class: "Aves"
    }
    squawk(line){ console.log(`Parrot ${this.name} squawked ${line}`)}
}
let parrotHappy = new ParrotClass("Happy")
let parrotPuffle = new ParrotClass("Puffle")
console.log(parrotPuffle.classification)  // return inherited property

// "class" keyword may be used in statements and expressions
let object = new class {  // as an expression, the constructor is automatically produced as a value
    greetWord(){return "hello"}
    farewellWord(){return "bye"}
}
console.log(object.greetWord())

/* Overriding Derived Properties
    - Whether a property is present in the prototype or not, properties may be added to the object itself
    - A property with the same name in the prototype
*/
ParrotClass.prototype.beak = "medium"
console.log(`Parrot ${parrotHappy.name}'s beak size was ${parrotHappy.beak}`)  // "medium" <- as inherited from the prototype
parrotHappy.beak = "large"  // will override the prototype-inherited value. The prototype-property hides behind
console.log(`Parrot ${parrotHappy.name}'s beak size is now ${parrotHappy.beak}`)  // "large"
console.log(`Parrot ${parrotPuffle.name}'s beak size is ${parrotPuffle.beak}`)  // "medium" <- not affected
console.log(`The usual beak size for parrots is ${ParrotClass.prototype.beak}`)  // "medium" <- not affected
delete parrotHappy.beak  // delete the custom property to reemerge the prototype value
console.log(`Parrot ${parrotHappy.name}'s beak size is now back to ${parrotHappy.beak}`)  // "medium"
// ^^ Overriding allows the expression of exceptional properties in particular instances of more generic object classes, preserving standard values

// Standard methods can be overriden as well
console.log(Array.prototype.toString == Object.prototype.toString)  // false
console.log([1, 2].toString())  // 1,2
console.log(Object.prototype.toString.call([1, 2]))  // [object Array]

/* Maps
    - "map" -> a data structure in computer programming that associates values (the keys) with other values
*/
// Example - mapping names to ages via objects
let ages = {
    Boris: 39,
    Liang: 22,
    Julia: 62
}
console.log(`Julia is ${ages["Julia"]}`)  // 62
console.log(`Is Jack's age known?`, "Jack" in ages)  // false
console.log(`Is toString's age known`, "toString" in ages)  // true <- objects and other data types inherit the properties of their prototypes
// ^^ and so, because of the characteristic for JavaScript data types to unwantingly inherit properties from their prototypes,
// ^^ we don't use objects as maps

// Example - mapping via objects created without prototypes
let myObject = Object.create(null)
console.log("toString" in myObject)  // false
// ^^ passing null to Object.create will disable the object from deriving properties and methods from Object.prototype

// Object property names must be strings. If a map whose keys cannot easily be converted to string is required, then we can use the Map class
ages = new Map()  // mapping is stored via any type of keys
ages.set("Boris", 39)
ages.set("Liang", 39)
ages.set("Julia", 39)
console.log(`Julia is ${ages.get("Julia")}`)  // 62
console.log(`Is Jack's age known?`, ages.has("Jack"))  // false
console.log(ages.has("toString"))  // false
// ^^ "set", "get", "has" are all part of the Map object interface, enabling us to do all kinds of work

// If an object is still required for mapping reasons, then it is useful to know Object.keys returns only the object's own keys.
console.log(Object.keys({x: 1}))  // <- it does not return the prototype's keys
console.log({x: 1}.hasOwnProperty('x'))  // true <- is used instead of the "in" operator
console.log({x: 1}.hasOwnProperty("toString"))  // false

/* Polymorphism
    - Calling String() on an object will invoke the .toString() method on the object to create a meaningful string from it.
        - remember that some of the standard prototypes have their own version of .toString() to avoid returning "[object Object]"

    - "Polymorphism" - a technique used to affect all objects under a certain interface
*/
ParrotClass.prototype.toString = function(){ return `a Parrot named "${this.name}"` }  // remember to use function declaration, not arrow functions
console.log(parrotPuffle.name)
console.log(String(parrotPuffle))
console.log(String(parrotHappy))
// ^^ here, we demonstrated polymorphism. By defining a specific piece of code, we could affect all the objects that it interfaces with
// Loops can exemplify as another case of polymorphism. They expect particular data structures such as strings and arrays to expose a specific interface
// We can also add an interface to our own objects to enable this feature

/* Symbols
    - Multiple interfaces may use the same property name for different purposes.
    - It would not be possible for an object to conform to both that interface and the standard use of "toString"

    - Property names may not only be strings actually, but also "symbols"
    - "Symbols" - created with Symbol()
        - are unique. Cannot be created twice
*/
let sym = Symbol("name")
console.log(sym == Symbol("name"))  // false
ParrotClass.prototype[sym] = 55
console.log(parrotHappy[sym])  // 55 <- inherited from prototype
console.log(sym)  // the string passed into the function is included to make it easier to recognize a symbol. Multiple symbols may have the same name

// Uniqueness and usability as properties allow symbols to be suited for defining interfaces where other properties exist, irregardless of name values
const toStringSymbol = Symbol("toString")
Array.prototype[toStringSymbol] = function(){ return `${this.length} cm of blue yarn` }
console.log([1, 2].toString())  // 1,2
console.log([1, 2][toStringSymbol]())  // 2 cm of blue yarn <- invocation via index reference

// You can include symbol properties in object expressions and classes using square brackets notation, which evaluates the property
const logSymbol = Symbol("log")
let stringObject = {
    [toStringSymbol](){ return "a jute rope" },
    [logSymbol](value){ return console.log(value) }
}
console.log(stringObject[toStringSymbol]())  // a jute rope
stringObject[logSymbol]("Hello World")  // Hello World
// ^^ we use the bracket-index notation to access the particular binding and to also declare it in the first place

/* The Iterator Interface
    - Iterable objects possess a method named with the "Symbol.iterator" symbol
    - The object method provides the "iterator" interface which does the iterating.
    - The iterator then has a "next" method which returns the next result for the next iteration.
    - This result is an object with a "value" property which provides the next value.
    - This object also has a "done" property to indicate whether there are no more results (true), else false

    - "next", "value", "done" property names are all strings.
        - Only "Symbol.iterator" is a symbol
*/
// Using the iterator interface
let okIterator = "OK"[Symbol.iterator]()  // <- invocation upon a string -> return iterator interface
let arrIterator = [1, 2, 3, 4, 5][Symbol.iterator]()  // <- ditto example: invocation upon an array
console.log(okIterator.next())  // <- returns an object and iterates
console.log(okIterator.next())  // <- ditto
console.log(okIterator.next())  // finally the value is undefined and it is done

// Example -> implementing an iterable data-structure
class Matrix {
    constructor(width, height, element = (x, y) => undefined){
        this.width = width
        this.height = height
        this.content = []

        for (let y=0; y < height; y++){
            for (let x=0; x < width; x++){
                this.content[y * width + x] = element(x, y)
            }
        }
    }

    get(x, y){
        return this.content[y * this.width + x]
    }
    set(x, y, value){
        this.content[y * this.width + x] = value
    }
}

// Our own iterator interface for our own object
class MatrixIterator {
    constructor(matrix){
        this.x = 0
        this.y = 0
        this.matrix = matrix
    }
    // The construction of the Object[Symbol.iterator]().next() method
    next(){
        // Handle case when iterable finishes, else proceed
        if (this.y == this.matrix.height) return {done: true}

        // Define value that the .next() method returns
        let value = {x: this.x, y: this.y, value: this.matrix.get(this.x, this.y)}

        // Iterate over to the next element
        this.x++
        // When the end has been reached actually, iterate to the next row and equate to the first index
        if (this.x == this.matrix.width){
            this.x = 0,
            this.y++
        }

        return {value, done: false}
    }
}

// Define the iterator interface for our particular object. This finally enables the Matrix object to be an iterable data-structure.
Matrix.prototype[Symbol.iterator] = function(){
    return new MatrixIterator(this)  // remember that the constructor function can only be invoked by using the "new" keyword
}

// With the iterator interface defined, loops can now interface with our Matrix object as it is now an official iterable
let matrix = new Matrix(5, 5, (x, y) => `value ${x}, ${y}`)
for (let {x, y, value} of matrix){
    console.log(value)  // "x" position, then "y" position
}

/* Getters, Setters, and Statics
    - While interfaces mostly consist of methods, it is acceptable to include non-function properties as well
        - Map objects should have a size property which holds the number of keys stored
    - "getters" methods which return property values when invoked.
        - Instances may invoke "getters" when a particular non-function property is called
*/
// Demonstrating differences
let varyingSize = {
    get size(){ return Math.round(Math.random() * 100) },  // <- the "get" keyword is used to define getters for particular properties
    getSize(){ return Math.round(Math.random() * 100) }  //
}
console.log(varyingSize.size)  // so, you may omit invocation notation
console.log(varyingSize.getSize())  // otherwise you will have to

// Setters
class Temperature {
    constructor(celsius){
        this.celsius = celsius
    }
    get fahrenheit(){
        return this.celsius * (9/5) + 32
    }
    set fahrenheit(value){
        this.celsius = (value - 32) / (9/5)
    }
    // the "static" keyword allows the methods it prefixes to be accessible and usable by invoking them via the class
    // Consequentially, this stores the static method into the constructor (???)
    static fromFahrenheit(value){
        return new Temperature((value - 32) / (9/5))  // instances may be initialized as consequence
    }

}

let myThermometer = new Temperature(22)
console.log(myThermometer.fahrenheit)  // using "getter"
myThermometer.fahrenheit = 100  // using "setter"
console.log(myThermometer.celsius)  // retrieving a property
console.log(Temperature.fromFahrenheit(100))  // Accessing a prototype

// Example of using a static method -> using namespace classes
console.log(Math.max(5, 7))

/* Inheritance
    - JavaScript's prototype system allows new classes to be created from old classes, where new definitions can be added
        - This is called "inheritance", where new classes can be created which inherit the properties and behaviors of old classes
    - These three form the fundamentals of object-oriented programming
        - Encapsulation - bundling common properties and methods into a single object (i.e. a class)
        - Polymorphism - using different things with the same interface
        - Inheritance - that which allows us to build new datatypes from previous ones.

    - However, it is a controversial concept and feature in JavaScript because of the complexity it creates. It's best to use it only if necessary
*/
// Some matrices are defined to be symmetrical from top-left to bottom-right. Such use-case will be used to exemplify inheritance
class SymmetricMatrix extends Matrix{  // "extend" keyword dictates that the subclass should derive from the superclass that isn't Object.prototype
    constructor(size, element = (x, y) => undefined){
        super(size, size, (x, y) => {  // "super" keyword enables the subclass to instantiate by invoking the constructor of its superclass
            if (x < y) return element(y, x)
            else return element(x, y)
        })
    }

    set(x, y, value){
        super.set(x, y, value)  // the "super" keyword here is used to invoke the superclass' own .set() method. But we will be redefining it
        if (x != y) super.set(y, x, value)
    }
}
// ^^ as exemplified, the "super" keyword allows subclasses to refer and invoke superclass properties while in their own scope

matrix = new SymmetricMatrix(5, (x, y) => `${x}, ${y}`)
console.log(matrix.get(2, 3))

/* The instanceof Operator
    - "instanceof" a binary operator implemented in JavaScript used to return a Boolean on whether an object was derived from a specific class
*/
console.log(new SymmetricMatrix(2) instanceof SymmetricMatrix)  // true <- an actual instance of this class
console.log(new SymmetricMatrix(2) instanceof Matrix)  // true <- an instance of the subclass of this superclass
console.log(new Matrix(2, 2) instanceof SymmetricMatrix)  // false <- as it should be
console.log([1] instanceof Array)  // true <- the binary operator can also be applied to standard constructors such as Array
console.log("Hello World" instanceof String)  // false <- (???)
console.log(10 instanceof Number)  // false <- (???)
console.log({key: "value"} instanceof Object)  // true <- almost every object is an instance of Object
function myFunc() { return }
console.log(myFunc instanceof Function)  // true

/* Summary
    1. The "Object" datatype do more than just hold methods and properties. They have prototypes, which are themselves objects.
    2. objects will invisibly inherit their prototype's properties.
    3. Simple objects have "Object.prototype" as their prototype.
    4. Constructors are functions whose names start with a capital letter. They are used with the "new" operator to create new objects.
        - The prototype belonging to an instance of a constructor function will be the object found in the "prototype" property of the constructor.
    5. You can place all the properties that all values of a given type should share into their prototype.
    6. The "class" notation can be used to define prototypes and constructors in one succinct manner.
    7. "Getters" and "Setters" may be defined and used to invisibly compute or define an object's / class-instance's property.
    8. Methods defined with the "static" prefix are called "Static methods". They are stored in the class' constructor rather than the prototype
    and can be thus accessed as a property of the class instead of a particular instance.
    9. The "instanceof" operator can used given an object and a constructor to tell whether an object is an instance of that contstructor

    10. To "encapsulate" in OOP, define the particular interface for your objects that code can communicate with.
        - This hides private properties and keeps public properties
    11. Different datatypes may be implementing the same interface. Code may then use this interface to interface with these multiple datatypes.
        - This is called "Polymorphism"
    12. One may define the subclasses of a class when implementing multiple classes in their code if these subclasses do not differ in essence.
        - The feature of iInheritance" allows subclasses to inherit the properties and methods of parent-classes.
*/
