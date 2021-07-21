/* Retry
    - primitiveMultiply()
        - Multiplies two numbers 20% of the time
        - Raises exception of type MultiplicatorUnitFailure for the rest of the 80% it ran

    - Task:
        - Write a function that wraps around primitiveMultiply() to keep invocating it until it succeeds, after which it returns the result.
        - Handle only the exceptions you are trying to handle
*/
class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b){
    if (Math.random() < 0.2) return a * b
    else throw new MultiplicatorUnitFailure("Klunk")
}

function wrapperInvoke(num_a, num_b, invocations=1){
    try {
        let product = primitiveMultiply(num_a, num_b)
        console.log(`Success: "${product}" in ${invocations} ${invocations > 1 ? "tries" : "try"}`)
    } catch (e) {
        if (e instanceof MultiplicatorUnitFailure){
            console.log("Error: MultiplicatorUnitFailure... Retrying")
            invocations += 1
            wrapperInvoke(num_a, num_b, invocations)
        }
        else console.log("Error: " + e)
    }
}

// Test
wrapperInvoke(8, 8)

/* The Locked Box
    - Write a function -> withBoxUnlocked():
        - takes a function value as argument
        - unlocks the box
        - runs the function argument
        - ensures that the box is locked again before returning, regardless of whether the argument function returned normally or threw an exception
        - if the box is already unlocked if withBoxUnlocked() is called, the box should stay unlocked
*/
const box = {
    locked: true,
    unlock() { this.locked = false },
    lock() { this.locked = true },
    _content: [],  // remember that we use an underscore at the beginning to indicate private object properties
    get content(){  // and so, we use getters instead of directly calling the property to access it
        if (this.locked) throw new Error("Locked!")
        return this._content
    }
}

function withBoxUnlocked(body){
    let leaveOpen = box.locked ? false : true
    box.unlock()
    try {
        body()
    } catch (e) {
        console.log("Error: " + e)
    } finally {
        if (!leaveOpen) box.lock()
    }
}

// Test
withBoxUnlocked(() => {
    box.content.push("gold piece")
})
// Test
try {
    withBoxUnlocked(() => {
        throw new Error("Pirates on the horizon! Abort!")
    })
} catch (e) {
    console.log("Error raised: " + e)
}
// Test
console.log(box.locked)  // true
