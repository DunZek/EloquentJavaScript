require('./05_higher_order/code/scripts')

/* Strings and Character Codes */
function characterScript(code){
    for (let script of SCRIPTS){
        if (script.ranges.some(([from, to]) => code >= from && code < to)) return script
    }
    return null
}
// console.log(characterScript('A'.codePointAt(0)))

/* Recognizing Text */
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

console.log(countBy([1, 2, 3, 4, 5], n => n > 2))

function textScripts(text){
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0))  // <- instantiate script binding for each "char" of the text
        return script ? script.name : "none"  // <- name used for countBy's predicate function, used to instantiate objects
    })
}
