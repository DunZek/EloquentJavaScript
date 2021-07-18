/* A Vector Type ( I did this in one try :-D ) */
class Vec {
    constructor(x, y){
        this.x = x
        this.y = y
    }
    plus({x, y}){
        return new Vec(this.x + x, this.y + y)
    }
    minus({x, y}){
        return new Vec(this.x - x, this.y - y)
    }
    get length(){
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)))  // Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)))  // Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length)  // 5

/* Groups
    - JavaScript provides another datastructure called "set", which is like "map" in that it also holds a collection of values.
    - A set however does not track neither a value's index-position nor whether a particular key pertains to it.
    - A does not keep how many valeus it has, only the type.
        - To be specific, a set keeps which kinds of values it is holding.
*/
// "Group" class as an implementation of "set"
class Group {
    constructor(iterable) {
        this.set = iterable.map(item => item)
    }
    add(item){  // adds the argument to the group if it does not exist
        if (!(this.set.some(element => item === element))) this.set.push(item)
    }
    delete(item){  // deletes the argument from the group if it exists
        if (this.set.some(element => item === element)) delete this.set[this.set.indexOf(item)]
    }
    has(item){  // returns a Boolean value indicating whether the argument exists in the group or not
        return this.set.some(element => item === element)
    }
    static from(iterable){  // creates and returns a group containing all the values produced from the iterable parameter
        return new Group(iterable)
    }
}

let group = Group.from([10, 20])  // instantiate a Group object
console.log(group.has(10))  // true
console.log(group.has(30))  // false
group.add(10)  // no-effect -> it already belongs to the group
group.delete(10)  // deletes 10 from group
console.log(group.has(10))  // false

/* Iterable Groups
    - Make the "Group" class from the previous exercise iterable by defining an iterator interface for it
        - Don't use "Symbol.iterator" to call the default interface. Use it to reference but define your own interface. That's the point.
*/
class GroupIterator {
    constructor(group){
        this.index = 0
        this.group = group
    }
    next(){
        if (this.index == this.group.set.length) return {done: true}
        let value = this.group.set[this.index]
        this.index++
        return {value, done: false}
    }
}

Group.prototype[Symbol.iterator] = function(){
    return new GroupIterator(this)
}

let myGroup = Group.from(['a', 'b', 'c'])
for (let value of myGroup) console.log(value)
// a
// b
// c

let myGroupIterator = myGroup[Symbol.iterator]()  // return an interface for this particular instance
console.log(myGroupIterator.next())
console.log(myGroupIterator.next())
console.log(myGroupIterator.next())
console.log(myGroupIterator.next())

/* Borrowing A Method
    - Recall: the Object.hasOwnProperty() method can be used as a substitute to the "in" operator especially if one wants to ignore the prototype's own
    properties when asking the question.
    - Premise: When an object possesses a property named "hasOwnProperty", the prototype method aforementioned will become inaccessible.
        - Figure out a way to invoke prototype methods and properties that have been rendered inaccessible by an instance's own surface-level properties
*/
console.log(Object.prototype.hasOwnProperty("hasOwnProperty"))  // as you can see, the .hasOwnProperty() method is a property of the Object prototype

let map = {one: true, two: true, hasOwnProperty: true}
// Fix this call
// console.log(map.hasOwnProperty("one"))  // TypeError <- this should be "true"
console.log(hasOwnProperty.call(map, "one"))  // true
// ^^ the solution. Invoke the function directly. It itself has a .call() method that one can use to pass a "this" argument that pertains to your object
