/* Abstraction 
    "Allying your programming as closely effective as possible to the problem-solving at hand"
*/

/* Abstracting repetition */
// Stage 1 - A repeating program
for (let i=0; i < 10; i++) console.log(i)

// Stage 2 - Controlling the number of calls to console.log(), as an example of abstracting repetition
let repeatLog = n => {for (let i=0; i < n; i++) console.log(i)}

// Stage 3 - Extending the concept of abstract repetition for other programs
let repeat = (n, action) => {for (let i=0; i < n; i++) action(i)}

// Demonstration: Pre-defined function
repeat(3, console.log)
// Demonstration: Inline declaration
let labels = []
repeat(5, i => labels.push(`Unit ${i+1}`))

/* Higher-Order Functions 
    - functions that operate on other functions by parameterizing or returning them 
    - Allows us to abstract actions, not just values
*/
// Demonstration - A function used to create new functions
function greaterThan_proto(n) { return m => m > n }
let greaterThan10 = greaterThan_proto(10)
console.log(greaterThan10(11))  // ...true

// Demonstration - A function that changes other functions
function noisy(f){
    return (...args) => {
        console.log("calling with", args)
        let result = f(...args)
        console.log("called with", args, ", returned", result)
        return result
    }
}

noisy(Math.min)(3, 2, 1)

// Demonstration - A function that introduces new control flow
function unless(test, then){ if (!test) then() }

repeat(3, n => {
    unless(n % 2 == 1, () => {
        console.log(n, "is even")
    })
})

// forEach - perform an action on and for each array element 
['A', 'B'].forEach(element => console.log(element))  // ...A B

/* Script Data Set */