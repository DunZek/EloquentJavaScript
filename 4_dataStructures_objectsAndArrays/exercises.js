/* The Sum of A Range */
let rangeArray = (start, end, step = 1) => {
    if (start < end && step < 0 || step == 0) return [-1]
    else if (start > end && step > 0) return [-1]
    else {
        let array = []
        for (let i = start; i != end; i += step) array.push(i)
        return array
    }
}

let arraySum = array => {
    let sum = 0
    for (let n of array) sum += Number.parseFloat(n)
    return sum
}

console.log(rangeArray(10, -5, -1))
console.log(arraySum(rangeArray(10, 0, 0)))