const SCRIPTS = require('./05_higher_order/code/scripts')

/* Flattening - Array.reduce(), Array.concat() */
let flattenArray = array => array.reduce((current, element) => [].concat(current, element))

// console.log(flattenArray([[1, 2, 3], [4, 5], [6]]))

// Extra - extended test cases

// console.log(flattenArray([[1, 2, 3], [4, 5], [6, [7, 8, [9, [10]]]]]))
// ^^ [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// console.log(['A', 'B', ['C', 'D', 'E', ['F', 'G'], 'H'], 'I', ['J' ,'K', ['L', 'M']]])
// ^^ ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']
// console.log(flattenArray([{key: "value"}, [{key: "value"}, {key: "value"}]]))

/* Your Own Loop */
function loop(iterable, test, update, body){
    if (test(iterable)){
        body(iterable)
        iterable = update(iterable)
        loop(iterable, test, update, body)
    }
}

// loop(3, n => n > 0, n => n - 1, console.log)  // 3, 2, 1

// Extra - extended test cases
// let string = "Hello World"
// loop(string, n => n <= string.length, n => n++ , console.log)  // 'H', 'e', 'l', 'l', 'o', ' ', 'W', ...
// let array = ['A', 'B', 'C', 'D', 'E']
// loop(array, n => n <= array.length, n => n++, console.log)  // ['A', 'B', 'C', 'D', 'E']

/* Everything - Array.every(), Array.some() */
// Loop version
function every(array, test){
    for (let element of array){
        if (!test(element)) return false
    }
    return true
}

// Array.some() version
function every(array, test){
    return !array.some(element => !test(element))
}

// console.log(every([1, 3, 5], n => n < 10))  // true
// console.log(every([2, 4, 16], n => n < 10))  // false
// console.log(every([], n => n < 10))  // true

/* Dominant Writing Direction 
    - Count number of characters used in a particular scripts
        - generate an array of objects with "name" and "count" properties
    - Compare numbers and return the direction of the script that has the highest number
        - for each object, reinstantiate as the greatest "count" property
*/
require('./05_higher_order/code/scripts')

// Return the script where the code pertains to its code-range OR null
function characterScript(code){
    for (let script of SCRIPTS){
        if (script.ranges.some(([from, to]) => code >= from && code < to)) return script
    }
    return null
}

// Return an array of objects with "name" and "count" properties
function countBy(iterable, groupName){
    let objectArray = []
    for (let element of iterable){
        let name = groupName(element)
        let knownIndex = objectArray.findIndex(object => object.name == name)
        if (knownIndex == -1) objectArray.push({name, count: 1})
        else objectArray[knownIndex].count++
    }
    return objectArray
}

// 1. received input: String -> text
function dominantDirection(text){
    // Step 1 - Obtain the count and the name of the scripts used in text
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0))
        return script ? script.name : "none"
    }).filter(script => script.name != 'none')

    // Step 2 - Attach the direction value that pertains to the script's direction value from SCRIPTS
    scripts = scripts.map(object => {
        let direction = "NOT FOUND"
        for (let script of SCRIPTS) if (object.name == script.name) direction = script.direction
        return {name: object.name, direction: direction, count: object.count}
    })

    // Step 3 - Return the direction value of the script with the highest count value
    return scripts.reduce((biggest_script, a_script) => biggest_script > a_script ? biggest_script : a_script).direction
}

console.log(dominantDirection("Hello!"))  // ...ltr
console.log(dominantDirection("Hey, مساء الخير"))  // ...rtl

// console.log([1, 2, 3, 4, 5].reduce((num_a, num_b) => num_a > num_b ? num_a : num_b))