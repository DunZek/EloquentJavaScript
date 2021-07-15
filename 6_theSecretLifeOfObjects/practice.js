/* Methods */
// Example 1 - declaring a method
let parrot = {name: "Terry"}
parrot.squawk = line => console.log(`The parrot squawks "${line}"`)
parrot.squawk("Hello world!")  // invoke method
console.log(parrot)  // show object and properties

// Example 2 - using "this" keyword
function squawk(line){ console.log(`${this.name} parrot squawks "${line}"`) }  // functions can use "this" to access their object
console.log(parrot.squawk == squawk)  // these aren't the same thing: one is a method, the new one is a function entirely
squawk.call(parrot, "Goodbye world!")  // invocation requires using the .call() method of the function

parrot.squawk = line => console.log(`${this.name} parrot squawks "${line}"`)
parrot.squawk("You're nearing the end!")
// ^^ Arrow functions don't work

// Example 3 - Arrow function scope ???
let object = {coords: [0, 2, 3], length: 5}
function normalize(){ console.log(this.coords.map(n => n / this.length)) }  // arrow functions
normalize.call(object)

/* Prototypes */
let empty = {}
console.log(empty.toString)
console.log(empty.toString())
// ^^ return the appropriate prototype for the missing property
