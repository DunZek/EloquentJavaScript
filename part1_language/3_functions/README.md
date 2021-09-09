# Chapter 3: Functions
> Procuring the fundamental understanding of JavaScript program structure enables us to further explore programming tools. Functions are very important pieces.

### Notes
- ###### Defining a Function
    - `let square = function(x) {return x * x}` - Using the `function` keyword necessitates braces `{}`
- ###### Bindings and Scopes
    - *Scope* defines the environment that bindings are available in.
    - The *global scope* contains bindings that are available in any part of the program.
     The *local scope* is the environment within functions, which contain bindings particular to the particular function. New instances of these bindings are created every time the function is called.
     - `let` and `const` binding declarations localize the binding to the scope they are declared in.
     - Pre-2015 JavaScript only create new scopes via functions. The `var` keyword still in use today carries and fulfills such a feature.
     - Bindings that exist just outside the local scope may be referenced within it. When two bindings in different accessible scopes exist, the innermost binding is used.
- ###### Nested Scope
    - Multiple degrees of locality can be produced within other scopes.
    - *Lexical scoping* allow local scopes to access the local scopes that contain it, and eventually the global scope.
- ###### Functions as Values
    - Function bindings are defined once and never changed.
    - Function values (the function program itself) are just like other values:
        - for use in arbitrary expressions
        - being able to be re-referenced within a new binding
        - passed as an argument
    - Bindings assigned to function values are just regular bindings as well. Such bindings may therefore then be able to be reassigned.
- ###### Declaration Notation
    - `function square(x) {return x*x}` - *function declaration*
        - Exempts the assigned function from the default top-to-bottom program execution, enabling the binding and function to be called anywhere in the program.
- ###### Arrow Functions
    - `const hello = name => console.log("Hello!", name)`
        - Single line arrow functions may omit brackets
        - Single argument arrow functions may omit parentheses
        - Arrow functions that have no arguments necessitate the parentheses
    - Arrow functions were added in 2015 to enable programmers to write small function expression less verbosely.
- ###### The Call Stack
    - The *call stack* is the environment/context where the computer program and its individual components are stored and are referenced.
    - Function calls store the current context of the call stack at the top. When such functions return, that current context from the top. The context is reassigned and the call stack continues to execute.
    - The stack is stored in the computer's memory, (RAM). Computers will output error messages such as "out of stack space" or "too much recursion" when the stack grows too big (or "blow the stack" in other words).
- ###### Optional Arguments
    - Notice that JavaScript ignores extraneous arguments and assigns `undefined` to missing parameters.
    -  Because of this behavior, mistakes can be easily made due to the lack of communication between the programmer and the program, while at the same time, enabling functions to work with different numbers of arguments.
    - Using the assignment operator `=` when defining function parameters enable the given parameter(s) to bind to the expression that it is assigned to, whenever the function is called and the given argument is missing.
- ###### Closure
    - `Closure` is the ability/feature that enables local bindings to be referenced from their specific scope.
    - Functions that reference bindings from the outer scope is called a closure itself.
    - `function multiplier(factor) { return number => number * factor }` - use this function to create other functions, which contain the `factor` parameter of their particular instantiation.
    - It's good to imagine function values as the program itself, but also the environment in which they are created and in. Functions access the environment in which it was created, not the environment in which it was called by.
- ###### Recursion
    - Functions are capable of calling themselves. When unhandled, this causes stack overflows. Such functions are called *recursive*.
    - Recursive functions, while enable an intuitive programming style, are slow. Using loops instead of calling a function multiple times for example is generally cheaper in computer computation.
    - Programmers must act on a balance between speed and elegance, as almost any program can be made faster just by making it bigger and more convoluted, as the programmer increasingly becomes explicit in their programming (all the way down to machine code).
    - First and foremost, write to completion via understanding, then optimize later. Do not be afraid to forego efficiency when starting out on tackling ambitious ideas.
- ###### Growing Functions
- ###### Functions and Side Effects

---
### Exercises
- ###### Minimum
- ###### Recursion
- ###### Bean counting
