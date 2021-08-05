/* Asynchronocity */

/* Crow Tech */

/* Callbacks
    - A way to tackle asynchronous programming is to use "callback functions" for actions that take long.
    - when the action is finished, the callback function is called with the result
*/
// Example - using a callback function with setTimeout()
setTimeout(() => console.log("Tick"), 500)

// Looking up a food cache in the storage bubls of Big Oak
import {bigOak} from './crow-tech'
bigOak.readStorage("food caches", caches => {
    let firstCache = caches[0]
    bigOak.readStorage(firstCache, info => {
        console.log(info)
    })
})

// A callback-based function ./crow-tech.send(target_nest_name, type_of_request, content, callback_function)
bigOak.send("Cow Pasture", "note", "Let's caw loudly at 7 PM", () => console.log("Note received"))

// Defining request types - defining implementation
import defineRequestType from './crow-tech'
defineRequestType("note", (nest, content, source, done) => {
    console.log(nest.name, "received note:", source)
    done()  // a callback function that must be called when the request is done
})

/* Promises */
let fifteen = Promise.resolve(15)
fifteen.then(value => console.log(`Got ${value}`))

function storage(nest, name){
    return new Promise(resolve => {
        nest.readStorage(name, result => resolve(result))
    })
}

/* Failure */
new Promise((_, reject) => reject(new Error("Faile")))
    .then(value => console.log("Handler 1"))
    .catch(reason => {
        console.log("Caught failure " + reason)
        return "nothing"
    })
    .then(value => console.log("Handler 2", value))

// Fucking forget it. This book is so eloquent everything has to be poetic. It has become an incomprehensible piece of text.

/* Networks are hard */

/* Collections of promises */

/* Network flooding */

/* Message routing */

/* Async functions */

/* Generators */

/* The event loop */

/* Asynchronous bugs */

/* Summary */
