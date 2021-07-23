// "Write code that is easy to delete, not easy to extend." - Tef, Programming is Terrible

/* Modules
    - "Modules" are an attempt to solve the problem of the "big ball of mud":
        - by specifying which parts of the program it interacts with
        - and by specifying which functionality it provides using "interfaces"
            - private and public properties
            - methods
    - "Dependencies" are the relations between modules.
    - Modules need to be defined with private properties and methods.
        - Just placing methods in different files isn't going to work because each will have been defined in the global namespace.
*/

/* Packages
    - "Packages" - chunks of code that can be distributed via copying and installing.
        - May contain one or more modules.
        - Contains information about which other packages it depends on.
        - May come with documentation to explain its functionalities.
    - "NPM" - Node Package Manager
        - An online service where one can download and upload packages.
        - A program bundled with Node.js that helps developers install and manage them.
        - Provides a convenient way to store, find, copy, and install packages from.
        - Almost every common functionality developers need can be found and installed from NPM
    - Most packages are made to come under a license that explicitly allows developers to use the package.
        - Beware of the license that come with the packages you use.
*/

/* Improvised modules
    - There was no modularity system in pre-2015/ES6 JavaScript. Thus, developers wrote their own modularity system.
        - Functions were used to create local scopes.
        - Objects were uses to represent module interfaces.
*/
// Example - a module for going between day names and numbers
let weekDay = function() {
    // hidden local binding
    const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    return {  // public interfaces
        number(name) { return names.indexOf(name) },
        name(number) { return names[number] }
    }
}()  // <- the return function that is invoked
// ^^ provides isolation, but not dependency-declaration.
// ^^ Reveals interface to the global scope. Expects its dependencies to do the same. This is a style used for a long-time ago.
console.log(weekDay.name(weekDay.number("Sunday")))

/* Evaluating data as code - to take control of loading dependencies by running string-data alongside the current program */
// Example - using the eval() operator to execute string within the current scope
const x = 2
function evalAndReturnX(code){
    eval(code)
    return x
}
// ^^ bad practice as it breaks some scoping standards and properties,
console.log(evalAndReturnX("var x = 2"))  // 2
console.log(x)  // 1
// ^^ such as being easily predictable which scope a binding refers to.

// Example - using the "Function" constructor to interpret data as code. It takes two arguments:
let plusOne = Function("n", "return n + 1")  // a string containing comma-seperated arguments, a string containing the body
// ^^ The code is wrapped around a function value such that it uses its own scope and that other scopes don't get vandalized
console.log(plusOne(4))  // 5
// ^^ Exactly what module systems need: wrapping module code in a function and using its scope as module scope.

/* CommonJS
    - "CommonJS" - most widely-used approach to bolted-on JavaScript modules. Used by Node.js and most NPM packages.
    - "require()" - the functional essence of CommonJS. Loads modules and dependencies via names and returns their interface.
*/
// Example - using two NPM modules to return date time
const ordinal = require('ordinal')  // converts numbers to strings: 1 -> "1st", 2 -> "2nd", etc.
// ^^ Overwriting "module.exports" will replace the empty interface object provided in order to export single values instead
// ^^ exports an interface consisting of "ordinal()", a single function
const {days, months} = require('date-names') // returns names for weekdays and months. Exports formatDate(Date object, String)
// ^^ exports an object containing multiple properties. Destructuring becomes convenient for creating bindings for exported interfaces
exports.formatDate = function(date, format){
    return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
        if (tag == "YYYY") return date.getFullYear()
        if (tag == "M") return date.getMonth()
        if (tag == "MMMM") return months[date.getMonth()]
        if (tag == "D") return date.getDate()
        if (tag == "Do") return ordinal(date.getDate())  // invoke ordinal function from module
        if (tag == "dddd") return days[date.getDay()]
    })
}

// Example - interface functions that get added to "exports" so that modules that depend on it get access it
// const {formatDate} = require('./format-date')  // <- So, we can use the module like this:
// console.log(formatDate(new Date(2017, 9, 13), "dddd the Do"))  // Friday the 13th
console.log(exports.formatDate(new Date(2017, 9, 13), "dddd the Do"))  // Friday the 13th

// Example - "require()" in its most minimal form -> an implementation of "require()"
require.cache = Object.create(null)  // reset cache, a storage containing already loaded modules
function require(name){
    If (!(name in require.cache)){  // require() makes sure to see if the module isn't already loaded in.
        let code = readFile(name)  // <- a function that reads a file and returns its contents as a string
        let module = {exports: {}}
        require.cache[name] = module
        let wrapper = Function("require, exports, module", code)
        wrapper(require, module.exports, module)
    }
    return require.cache[name].exports
}

/* EcmaScript Modules */

/* Building and bundling */

/* Module design */
