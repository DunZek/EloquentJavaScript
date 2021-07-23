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
    - "require(address)" - the functional essence of CommonJS. Loads modules and dependencies via names and returns their interface.
        - The string address given to require() is interpreted differently across different systems.
            - "./" or "../" is generally interpreted as the chosen filename being relative to the current module's filename directory
            - When the name isn't relative, Node.js will look for an installed package by that name.
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
// require.cache = Object.create(null)  // reset cache, a storage containing already loaded modules
// function require(name){
//     if (!(name in require.cache)){  // require() makes sure to see if the module isn't already loaded in.
//         let code = readFile(name)  // <- a function that reads a file and returns its contents as a string
//         let module = {exports: {}}
//         require.cache[name] = module
//         let wrapper = Function("require, exports, module", code)
//         wrapper(require, module.exports, module)
//     }
//     return require.cache[name].exports
// }

// Example - importing an INI file parser instead of writing our own
const {parse} = require("ini")
console.log(parse("x = 10\ny = 20"))  // {x: "10", y: "20"}

/* EcmaScript Modules
    - The combination of CommonJS modules and the NPM have enabled the JavaScript community to be extensible.
    - However, there are some problems that still remain:
        - Things initialized in "exports" are not available in local scopes.
        - It is hard to determine the dependencies of a module without running its code using "require()"
    - The aforementioned issues pushed the 2015 standard of JavaScript to introduce its own, different module system.
        - "ES (ECMAScript) modules" -> The main concepts of dependencies and interfaces remain the same, however details differ:
            - The notation is now integrated into the language. The "import" keyword now replaces having to call a function
    - ES module interfaces are sets of names bindings.
        - Importing modules results in those bindings being imported, not their values.
        - These bindings may change values at any time.
    - ES modules get imported before they run. Therefore,
        - "import" declarations may not appear inside functions or blocks
        - and the names of dependencies must be quoted strings, not arbitrary expressions.
    - Many projects now are written using ES modules and then automatically converted to some other format when published.
    - A JavaScript developer is required to be able to use the two different module systems as they are used side-by-side.
*/
// Example - accessing a dependency using ECMAScript 6 (JavaScript 2015)
import ordinal from "ordinal"
import {days, months} from "date-names"

// Example - using "export" before an expression
export default ["Winter", "Spring", "Summer", "Autumn"]  // the "default" keyword is a binding that makes it the main exported binding
// ^^ Note: alongside default, other bindings may still be exported

// Example - renaming imported bindings using the keyword "as"
import {days as dayNames} from "date-names"
console.log(dayNames.length)

/* Building and bundling
    - Many JavaScript projects aren't even technically written in JavaScript.
    - Extensions are often planned to be used with language long before JavaScript is actually ran in platforms that support them.
        - This is possible because present dialects of JavaScript are compiled into older and past versions so that old browsers can run it.

    - Modular programs that consist of hundreds of files take too long to be loaded decently in web browsers.
    - Because singular big files take much faster to load than multiple smaller ones, programmers have started using "bundlers"
    - "Bundlers" - tools that transform programs into big singular files before being published to the web.

    - The sizes of files must also be taken to consideration. Thus, the JavaScript community invented "minifiers"
    - "Minifiers" - tools that reduce bundled JavaScript programs to the bare minimum file size by:
        - removing comments and whitespace,
        - renaming bindings,
        - and by generally replacing pieces of code with equivalent code that takes up less space.

    - Many NPM packages that run on web-pages have therefore then gone through multiple stages of transformation:
        - conversion from modern JavaScript to historic Javascript,
        - conversion from using ES modules to Common JS modules,
        - and being bundled and then minified.

    - So, be aware that the JavaScript code that gets run is often not the source code as it was written.
*/

/* Module design
    - Program stucturing is one of the subtler aspects of programming.
    - There are trade-offs involved when trying to model the design of nontrivial pieces of functionality.
    - Furthermore, the best way to learn the value of well-structured design is through experience:
        - reading or working on a lot of programs,
        - noticing what works and what doesn't.
    - As a programmer, do not assume that painful messes are forever painful messes.
        - The structure of almost everything can be improved by giving more thought into it.

    - "Ease of use" -> designing something for multiple people for long stretches of time that remain simple and predictable.
    
*/
