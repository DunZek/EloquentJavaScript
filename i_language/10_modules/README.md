# Chapter 10: Modules
> Write code that is easy to delete, not easy to extend - Tef, Programming is Terrible

### Notes
- ###### Modules
    - **Modules** are attempts to solve the problem of the "big ball of mud":
        - by specifying which parts of the program it interacts with
        - and by specifying which functionality it provides using **interfaces**
            - private and public properties
            - methods
    - **Dependencies** are the relations between modules.
    - Modules need to be defined with private properties and methods.
        - Just placing methods in different files isn't going to work because each will have been defined in the global namespace.
- ###### Packages
    - **Packages** are chunks of code that can be distributed via copying and installing. They:
        - Contain information about which other packages it depends on.
        - May contain one or more modules.
        - May come with documentation to explain its functionalities.
    - **NPM** - Node Package Manager
        - An online service where one can download and upload packages.
        - A program bundled with Node.js that helps developers install and manage them.
        - Provides a convenient way to store, find, copy, and install packages from.
        - Almost every common functionality developers need can be found and installed from NPM
    - Most packages are made to come under a license that explicitly allows developers to use the package.
        - Beware of the license that come with the packages you use.
- ###### Improvised modules
    - There was no modularity system in pre-2015/ES6 JavaScript. Thus, developers wrote their own modularity system.
        - Functions were used to create local scopes.
        - Objects were used to represent module interfaces.
    - Example: A module for going between day names and numbers
        - ```js
          let weekDay = function() {
              // hidden local binding
              const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

              return {  // public interfaces
                  number(name) { return names.indexOf(name) },
                  name(number) { return names[number] }
              }
          }()  // <- the return function that is invoked
          // ^^ provides isolation, but not dependency-declaration
          // ^^ reveals interface to the global scope. Expects its dependencies to do the same. This is a style used for a long-time ago.
          console.log(weekDay.name(weekDay.number("Sunday")))
          ```
- ###### Evaluating data as code
    - *to take control of loading dependencies by running string-data alongside the current program*
    - Using the `eval()` operator to execute strings within the current scope
        - ```js
          // Though this is bad practice as it breaks scoping standards and properties...
          const x = 2
          function evalAndReturnX(code) {
              eval(code)
              return x
          }
          // ...Such as being easily predictable which scope a binding refers to.
          console.log(evalAndReturnX("var x = 2"))  // 2
          console.log(x)  // 1
          ```
    - Using the `function` constructor to interpret data as code
        - ```js
          // It takes two arguments:
          //    a string containing comma-separated arguments
          //    a string containing the body
          // The code is wrapped around a function value such that it uses its own scope and that other scopes don't get vandalized.
          let plusOne = Function("n", "return n + 1")
          // Exactly what modules need: wrapping module code in a function and using its scope as module scope.
          console.log(plusOne(4))  // 5
          ```
- ###### CommonJS
    - **CommonJS** is the most widely-used approach to bolted-on JavaScript modules. It is used by Node.js and most NPM packages.
    - `require(address)` loads modules and dependencies via names and returns their interface.
        - The string address given to `require()` is interpreted differently across different systems.
            - `./` or `../` is generally interpreted as the chosen filename being relative to the current module's filename directory
            - When the name isn't relative, Node.js will look for an installed package by that name.
        - It is the functional essence of CommonJS.
    - Using two NPM modules to return date time
        - ```js
          // Exports an interface consisting of "ordinal()"; a single function
          const ordinal = require('ordinal')  // Converts numbers to strings: 1 -> "1st", 2 -> "2nd", etc.
          // Note: Overwriting "module.exports" will replace the empty interface object provided in order to export single values instead

          // Exports an object containing multiple properties. Destructuring becomes convenient for creating bindings for exported interfaces
          const {days, months} = require('date-names')  // returns names for weekdays and months. Exports formatDate(DateObject, String)

          // Creating a function
          exports.formatDate = function(date, format) {
              return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
                  if (tag == "YYYY") return date.getFullYear()
                  if (tag == "M") return date.getMonth()
                  if (tag == "MMMM") return months[date.getMonth()]
                  if (tag == "D") return date.getDate()
                  if (tag == "Do") return ordinal(date.getDate())  // invoke ordinal function from module
                  if (tag == "dddd") return days[date.getDay()]
              })
          }
          ```
    - Interface functions get added to `exports` so that modules that depend on it get access to it
        - ```js
          const {formatDate} = require('./format-date')  // So, we can use the module like this:
          formatDate(new Date(2017, 9, 13), "dddd the Do")  // Friday the 13th
          exports.formatDate(new Date(2017, 9, 13), "dddd the Do")  // Friday the 13th
          ```
    - Implementation: `require()` in its most minimal form:
        - ```js
          require.cache = Object.create(null)  // reset cache: a storage containing already loaded modules
          function require(name) {
              // require() makes sure to see if the module isn't already loaded in.
              if (!(name in require.cache)) {
                  // A function that reads a file and returns its contents as a string
                  let code = readFile(name)
                  let module = {exports: {}}
                  require.cache[name] = module
                  let wrapper = Function(require, exports, module, code)
                  wrapper(require, module.exports, module)
              }
              return require.cache[name].exports
          }
          ```
    - Importing an INI file parser instead of writing our own:
        - ```js
          const {parse} = require('ini')
          console.log(parse("x = 10\ny = 20"))  // {x: "10", y: "20"}
          ```
- ###### EcmaScript Modules
    - The combination of CommonJS modules and NPM have enabled the JavaScript community to be extensible.
    - However, there are some problems that still remain:
        - Things initialized in `exports` are not available in local scopes.
        - It is hard to determine the dependencies of a module without running its code using `require()`
    - The aforementioned issues pushed the 2015 standard of JavaScript to introduce its own, different module system: ES (ECMAScript) modules. The main concepts of dependencies and interfaces remain the same, however details differ:
        - The notation is now integrated into the language.
        - The `import` keyword now replaces having to call a function
    - ES module interfaces are sets of name bindings.
        - Importing modules results in those bindings being imported, not their values.
        - These bindings may change values at any time.
    - ES modules get imported before they run. Therefore,
        - `import` declarations may not appear inside functions or blocks
        - The names of dependencies must be quoted strings, not arbitrary expressions.
    - Many projects now are written using ES modules and then automatically converted to some other format when published.
    - A JavaScript developer is required to be able to use the two different module systems as they are used side-by-side.
    - Accessing a dependency using ECMAScript 6 (JavaScript 2015):
        - ```js
          import ordinal from "ordinal"
          import {days, months} from "date-names"
          ```
    - Using `export` before an expression:
        - ```js
          // The "default" keyword is a binding that makes it the main exported binding
          export default ["Winter", "Spring", "Summer", "Autumn"]
          // Note: alongside default, other bindings may still be exported
          ```
    - Renaming imported bindings using the keyword `as`:
        - ```js
          import {days as dayNames} from "date-names"
          ```
- ###### Building and bundling
    - Many JavaScript projects aren't even technically written in JavaScript.
    - Extensions are often planned to be used with language long before JavaScript is actually ran in platforms that support them. This is possible because present dialects of JavaScript are compiled into older and past versions so that old browsers can run it.
    - Modular programs that consist of hundreds of files take too long to be loaded decently in web browsers.
    - Because singular big files take much faster to load than multiple smaller ones, programmers have started using *bundlers*.
    - **Bundlers** - tools that transform programs into big singular files before being published to the web.
    - The sizes of files must also be taken to consideration. Thus, the JavaScript community invented *minifiers*.
    - **Minifiers** - tools that reduce bundled JavaScript programs to the bare minimum file size by:
        - removing comments and whitespace
        - renaming bindings
        - replacing pieces of code with equivalent code that takes up less space.
    - Many NPM packages that run on web-pages have therefore then gone through multiple stages of transformation:
        - conversion from modern JavaScript to historic JavaScript,
        - conversion from using ES modules to Common JS modules,
        - being bundled and then minified.
    - So, be aware that the JavaScript code that gets run is often not the source code as it was written.
- ###### Module design
    - Program structuring is one of the subtler aspects of programming.
    - There are trade-offs involved when trying to model the design of nontrivial pieces of functionality.
    - Furthermore, the best way to learn the value of well-structured design is through experience:
        - reading or working on a lot of programs
        - noticing what works and what doesn't
    - As a programmer, do not assume that painful messes are forever painful messes. The structure of almost everything can be improved by giving more thought into it.
    - **Ease of use** - designing something for multiple people for long stretches of time that remain simple and predictable.
- ###### Summary
### Exercises
- ###### A Modular Robot
- ###### Roads Module
- ###### Circular dependencies
