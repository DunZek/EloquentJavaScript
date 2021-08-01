// Object.create({}) returns an object with inherited properties such as __proto__, etc
let anObj = Object.create({})
console.log("anObj.hasOwnProperty ->", anObj.hasOwnProperty)
// Using null will return a pure object
let dict = Object.create(null)
console.log("dict.hasOwnProperty ->", dict.hasOwnProperty)  // undefined

// Strings may be used to refer to objects
let graph = {
    "Alice's House": ["Cabin", "Bob's House", "Post Office"]
}
console.log('"Alice\'s House" in graph ->', "Alice's House" in graph)
console.log("typeof \"Alice's House\", typeof graph[\"Alice's House\"] ->", typeof "Alice's House", typeof graph["Alice's House"])
