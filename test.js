/* Used to test */

// Find a number by starting from 1 and either repeatedly adding 5 or multiplying by 3
function findSolution(target){  // <- Satisfied when it finds a sequence
    function find(current, history){
        if (current == target){
            return history
        } else if (current > target) {
            return null
        } else {
            return find(current + 5, `(${history} + 5)`) || find(current * 3, `(${history} * 3)`)
            // ^^ this if not null otherwise this if also not null, else null if both are null
        }
    }

    return find(1, "1")
}

console.log(findSolution(1313))