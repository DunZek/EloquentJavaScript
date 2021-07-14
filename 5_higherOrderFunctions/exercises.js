/* Flattening - Array.reduce(), Array.concat() */
let flattenArray = array => array.reduce((current, element) => [].concat(current, element))

console.log(flattenArray([[1, 2, 3], [4, 5], [6]]))

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

loop(3, n => n > 0, n => n - 1, console.log)  // 3, 2, 1

// Extra - extended test cases
// let string = "Hello World"
// loop(string, n => n <= string.length, n => n++ , console.log)  // 'H', 'e', 'l', 'l', 'o', ' ', 'W', ...
// let array = ['A', 'B', 'C', 'D', 'E']
// loop(array, n => n <= array.length, n => n++, console.log)  // ['A', 'B', 'C', 'D', 'E']

/* Everything - Array.every(), Array.some() */
// Loop version
function every(array, test){

}

// Array.some() version
function every(array, test){ if (array.some(test)) {return false} return true }

console.log(every([1, 3, 5], n => n < 10))  // true
console.log(every([2, 4, 16], n => n < 10))  // false
console.log(every([], n => n < 10))  // true

/* Dominant Writing Direction */