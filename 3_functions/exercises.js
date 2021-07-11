/* Minimum */
function min(numA, numB){
    return numA >= numB ? numB : numA
}

console.log(min(0, 10))
console.log(min(0, -10))

/* Recursion */
function isEven(num){
    if (num == 1) return false
    else if (num == 0) return true
    else if (num < 0) return isEven(-num)
    else return isEven(num - 2)
}

console.log(isEven(50))  // ...true
console.log(isEven(75))  // ...false
console.log(isEven(-1))  // ...??

/* Bean Counting */
let countBs = function(string){
    count = 0
    for (let i=0; i <= string.length; i++) if (string[i] == "B") count += 1
    return count
}

console.log(countBs("BBC"))  // ...2
console.log(countBs("SoMeBoDy BiKeD bY tHe RiVeRbEd"))  // ...2

function countChar(string, char){
    count = 0
    for (let i=0; i <= string.length; i++) if (string[i] == char) count += 1
    return count
}

let countBs = function(string){
    return countChar(string, "B")
}

console.log(countChar("kakkerlak", 'k'))  // ...4