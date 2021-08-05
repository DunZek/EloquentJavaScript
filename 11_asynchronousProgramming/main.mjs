/* Asynchronocity */

/* Crow Tech */

/* Callbacks
    - A way to tackle asynchronous programming is to use "callback functions" for actions that take long.
    - when the action is finished, the callback function is called with the result
    - Functions that invoke asynchronous functions must itself be asynchronous.
    	- Callbacks or similar mechanisms are used to deliver back results.		
	- Calling callbacks complicate programs and are more error-prone, thus may not be the best way however to structure programs.
*/

// Example - using a callback function with setTimeout()
// setTimeout(() => console.log("Tick"), 500)

// Looking up a food cache in the storage bulbs of Big Oak
import {bigOak} from './crow-tech.js'
bigOak.readStorage("food caches", caches => {
    let firstCache = caches[0]
    bigOak.readStorage(firstCache, info => {
        console.log(info)
    })
})

// Evoking a callback-based function ./crow-tech.js.send(target_nest_name, type_of_request, content, callback_function)
bigOak.send("Cow Pasture", "note", "Let's caw loudly at 7 PM", () => console.log("Note received"))

// Defining request types - defining implementation
import {defineRequestType} from './crow-tech.js'
defineRequestType("note", (nest, content, source, done) => {
    console.log(nest.name, "received note:", source)
    done()  // a callback function that must be called when the request is done
})


/* Promises 
	- Returning objects that represent future events instead of a callback function.
	- "Promise" is a standard class used to represent abstract concepts in asynchronous programs using values.
		- It is an synchronous action that may complete at some point and return a value.
		- It notifies anyone who is interested when its value is available.
	- Promises are instantiated using Promise.resolve().
		- This function ensures given values are wrapped in a promise.
		- Promised values are otherwise returned immediately.
*/
let fifteen = Promise.resolve(15)

// Using the ".then()" callback method to get the value of a promise in the callback
fifteen.then(value => console.log("Got:", value))  // Got: 15

// Creating a promise-based interface for readStorage
function storage(nest, name){
	return new Promise(resolve => {
		nest.readStorage(name, result => resolve(result))
	})
}

let enemies = storage(bigOak, "enemies")
enemies.then(value => console.log("Resolved:", value))

/* Failure */

/* Networks are hard */

/* Collections of promises */

/* Network flooding */

/* Message routing */

/* Async functions */

/* Generators */

/* The event loop */

/* Asynchronous bugs */

/* Summary */
