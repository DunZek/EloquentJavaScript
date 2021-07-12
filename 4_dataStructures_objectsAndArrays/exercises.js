/* The Sum of A Range */
let rangeArray = (start, end, step = 1) => {
    if (start < end && step < 0 || step == 0) return [-1]
    else if (start > end && step > 0) return [-1]
    else {
        let array = []
        for (let i = start; i != end; i += step) array.push(i)
        array.push(end)
        return array
    }
}

let arraySum = array => {
    let sum = 0
    for (let n of array) sum += Number.parseFloat(n)
    return sum
}

console.log(rangeArray(1, 10))
console.log(rangeArray(5, 2, -1))  // [5, 4, 3, 2]
console.log(arraySum(rangeArray(1, 10)))  // 55

/* Reversing an Array */
function reverseArray(array){
    let newArray = []
    for (let element of array) newArray.unshift(element)
    return newArray
}

function reverseArrayInPlace(array){
    let record = array.slice()
    for (let i=record.length; i > 0; i--) {
        console.log(record.length - i)
        array[record.length - i] = record[i - 1]
    }
}

console.log(reverseArray(['A', 'B', 'C']))
let anArray = [1, 2, 3, 4, 5]
reverseArrayInPlace(anArray)
console.log(anArray)

/* A List

    let list = {
        value: 1,
        rest: {
            value: 2,
            rest: {
                value: 3,
                rest: null
            }
        }
    }
*/
const arrayToList = array => array.length != 0 ? {value: array[0], rest: arrayToList(array.slice(1))} : null

function listToArray(list){
    function constructArray({value, rest}, array){
        array.push(value)
        return rest != null ? constructArray(rest, array) : array
    }
    return constructArray(list, [])
}

const prepend = (element, list) => {return {value: element, rest: list}}

// virgin loop
function nth({value, rest}, index){
    let current_list
    for (let i=0; i <= index; i++){
        if (i != index){
            current_list = rest
            rest = current_list.rest
        }
        else return current_list.value
    }
}

// chad recursive
const nth_recursive = ({value, rest}, index) => index != 0 ? nth_recursive(rest, index - 1) : value

console.log(arrayToList([10, 20]))  // ...{value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])))  // ...[10, 20, 30]
console.log(prepend(10, prepend(20, null)))  // ...{value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1))  // 20
console.log(nth_recursive(arrayToList([10, 20, 30, 40, 50]), 3))  // 40

/* Deep Comparison */
function deepEqual(object_a, object_b){
    console.log("keys", Object.keys(object_a))
    console.log("values", Object.values(object_a))
}

let objA_1 = {here: {is: "an"}, object: 2, from: {yours: {truly: "Marijn"}, haverbeke: "peace"}}
let objA_2 = {here: {is: "an"}, object: 2, from: {yours: {truly: "Marijn"}, haverbeke: "peace"}}
let objB = {here: {is: "an"}, object: 2, from: {marijn: "haverbeke"}}
// console.log(deepEqual(objA_1, objA_1))  // ...true <- same identity
console.log(deepEqual(objA_1, objB))  // ...false <- different properties
// console.log(deepEqual(objA_1, objA_2))  // ...true <- same properties