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
function countBy(items, groupName){
    let counts = []
    for (let item of items){
        let name = groupName(item)
        let known = counts.findIndex(c => c.name == name)
        if (known == -1) counts.push({name, count: 1})
        else counts[known].count++
    }
    return counts
}

// 1. received input: String -> text
function dominantDirection(text){
    // 2. instantiated: Array -> character codes of each character in the text-string
    let textCharacterCodes = []
    for (char in text){
        textCharacterCodes.push(char.charCodeAt(0))
    }
    console.log(textCharacterCodes)

    // 4. returned: String -> the string of the object whose character count is the highest amongst the rest
    let direction = scripts => {
        let max = 0
        for (let script of scripts){
            if (script.count > max) max = script.count
        }
        for (let script of scripts){
            
        }
    }
    return direction

    // Return the direction of the "script" with the highest "count"
    // return scripts.reduce((current, script) => current.count > script.count ? current : script).direction
}

console.log(dominantDirection("Hello!"))  // ...ltr
// console.log(dominantDirection("Hey, مساء الخير"))  // ...rtl

/* Flow (Pseudo-code)
    1. received input: String -> text

    2. instantiated: Array -> character codes of each character in the text-string
        - input: String -> text
        -   "let textCharacterCodes = []"
        -   "for each char in string"
        -       "textCharacterCodes.push(charCodeAt(char))"
        - output: Array -> textCharacterCodes

    3. instantiated: Array -> objects consisting of "name", "direction", and "text character count" properties
        - input: Array -> text character codes
        -   "let scripts = []"
        -   "for each character code"
        -       "if it pertains to an existing script, "
        -
        -
        - "for each code, "
        - output: Array -> scripts {name, direction, count}

    4. returned: String -> the string of the object whose character count is the highest amongst the rest
        - input: Array -> scripts {name, direction, count}
        -   "let total = 0"
        -   "for each script"
        -       "total is total if script.count is smaller than total, else reinstantiate total as the script.count"
        -   "for each script"
        -       "if script.count matches total, return script.direction"
        - output: String -> direction
*/
scripts = [
    {name: "Script A", direction: "ltr", count: 10},
    {name: "Script B", direction: "rtl", count: 20},
    {name: "Script C", direction: "ttb", count: 15}
]