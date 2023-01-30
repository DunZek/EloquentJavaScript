/* 
    Expressions and Statements 

    - Expressions are code elements that produce value
    - Statements are complete components that expressions amount to
    - A program is a list of statemetns
*/

1;
false
//  The rules for omitting semicolons are complex and error-prone. It is best first to learn about the subtleties of missing semicolons

/* Bindings (variables) */

// replace the value that belongs to this variable
let mood = "light";
mood = "dark";

// multiple declarations
let one = 1, two = 2;

// 'var' is different from 'let' <- use 'let' over 'var'
var name = "Ayda";
const greeting = "Hello ";  // <- 'const' holds constant values

/* While and Do loops */

// let yourName;
// do {
//     yourName = prompt("Who are you?");
// } while (!yourName);  // <- '!' forces a type-conversion to boolean on values where only "" returns false
// console.log(yourName);

/* Breaking out of a loop */
// for (let i = 0; ; i++){  // <- you don't have to initialize the condition <- infinite while loop
//     if (i % 7 == 0){
//         console.log(i);
//         break;  // <- use a break statement to stop the loop
//     }
// }

/* Dispatching on a value with switch */
let value = 'C'
switch (value){
    case 'A':
        console.log("Value A")
        break
    case 'B':  // <- no break statement will mean that case 'B' will allow case 'C' to execute too
        console.log("Value B")
    case 'C':
        console.log("Value C")
        break
    default:
        console.log("No value")
        break
}