'use strict';
import {roadGraph, VillageState, runRobot, routeRobot, goalOrientedRobot} from './main.mjs'
// import util from 'util'

class Util {
    // Return true if objects recursively contain equal properties, else false
    isDeepStrictEqual(obj1, obj2) {
        // Obtain list of object keys
        const obj1Keys = Object.keys(obj1)
        const obj2Keys = Object.keys(obj2)
        // Compare obj2 properties to obj1 properties, where only property existence and content are compared
        for (let key1 of obj1Keys) {
            // Existential check
            if (!(obj2Keys.includes(key1))) return false
            // Content check
            let value1 = obj1[key1]
            for (let key2 of obj2Keys) {
                let value2 = obj2[key2]
                if (key1 == key2) if (value1 != value2) return false
            }
        }
        return true
    }
}

const util = new Util()

/* Unit tests */
let obj1 = {a: 0, b: 1, c: 2}
let obj2 = {a: 0, b: 1, c: 2}
// Non-recursive objects & Primitive properties
console.log('1. Assert? must be "true" and returns:', util.isDeepStrictEqual(obj1, obj2))
obj2 = {a: 0, c: 2, b: 1}
console.log('2. Assert? must be "true" and returns:', util.isDeepStrictEqual(obj1, obj2))
obj2 = {a: 0, c: 2}
console.log('3. Assert? must be "false" and returns:', util.isDeepStrictEqual(obj1, obj2))
obj2 = {}
console.log('4. Assert? must be "false" and returns:', util.isDeepStrictEqual(obj1, obj2))
obj1 = {}
obj2 = {}
console.log('5. Assert? must be "true" and returns:', util.isDeepStrictEqual(obj1, obj2))
// Non-recursive objects & Data structure properties
obj1 = {a: ['x', 'y', 'z'], b: 0, c: ['spam']}
obj2 = {a: ['x', 'y', 'z'], b: 0, c: ['spam']}
console.log('6. Assert? must be "true" and returns:', util.isDeepStrictEqual(obj1, obj2))
obj1 = {a: ['x', 'y']}
obj2 = {a: ['x', 'z']}
// console.log('7. Assert? must be "true" and returns:', util.isDeepStrictEqual(obj1, obj2))
obj1 = {a: [], b: [], c: []}
obj2 = {a: [], b: []}
// console.log('8. Assert? must be "false" and returns:', util.isDeepStrictEqual(obj1, obj2))
// Recursive objects & Primitive properties
obj1 = {a: {x: 0, y: 1, z: 2}, b: {x: 0, y: 1, z: 2}, c: 'spam'}
obj2 = {a: {x: 0, y: 1, z: 2}, b: {x: 0, y: 1, z: 2}, c: 'spam'}
// console.log('9. Assert? must be "true" and returns:', util.isDeepStrictEqual(obj1, obj2))
obj1 = {a: {b: {c: {d: {e: 'spam'}}}}}
obj2 = {a: {b: {c: {d: {e: 'spam'}}}}}
// console.log('10. Assert? must be "true" and returns:', util.isDeepStrictEqual(obj1, obj2))
obj1 = {a: {b: {c: 'y'}}}
obj2 = {a: {b: {x: 'y'}}}
// console.log('11. Assert? must be "false" and returns:', util.isDeepStrictEqual(obj1, obj2))
// Recursive objects & Data structure properties
obj1 = {a: {x: ['foo', 'bar'], y: ['hello', 'world']}, b: {z: [0, 1, 2]}}
obj2 = {a: {x: ['foo', 'bar'], y: ['hello', 'world']}, b: {z: [0, 1, 2]}}
// console.log('12. Assert? must be "true" and returns:', util.isDeepStrictEqual(obj1, obj2))
obj1 = {a: {x: ['foo', 'bar'], y: ['hello', 'world']}, b: {z: [0, 1, 2]}}
obj2 = {a: {x: ['bar', 'foo'], y: ['world', 'hello']}, b: {z: [2, 1, 0]}}
// console.log('13. Assert? must be "false" and returns:', util.isDeepStrictEqual(obj1, obj2))
obj1 = {a: [[1, 2, 3], [4, 5, 6], [7, 8, 9], 0, []], b: [{}, {c: 'forty-two'}, {}]}
obj2 = {a: [[1, 2, 3], [4, 5, 6], [7, 8, 9], 0, []], b: [{}, {c: 'forty-two'}, {}]}
// console.log('14. Assert? must be "true" and returns:', util.isDeepStrictEqual(obj1, obj2))


/* 2. Robot efficiency
    - Write a robot that finishes the delivery task faster than "goalOrientedRobot()"
*/

// Sample - beat goalOrientedRobot
const sample1 = new VillageState (
    "Post Office",
    [
       { place: "Bob's House", address: "Cabin" },
       { place: "Daria's House", address: 'Town Hall' },
       { place: 'Post Office', address: "Bob's House" },
       { place: 'Post Office', address: 'Town Hall' },
       { place: 'Shop', address: 'Farm' }
    ]
)
// hypothetical best route to sample1 - 11 turns
const route1 = [
    "Marketplace", "Shop", "Grete's House", "Farm", "Grete's House", "Ernie's House",
    "Daria's House", "Town Hall", "Bob's House", "Alice's House", "Cabin"
]

// Sample - optimization problem
const sample2 = new VillageState (
    "Post Office",
    [
        { place: "Alice's House", address: "Ernie's House" },  // 2. place: "Alice's House" in delivered
        { place: "Daria's House", address: "Alice's House" },  // <- unable to be delivered therefore
        { place: "Daria's House", address: "Shop" },
        { place: "Cabin", address: "Alice's House" },          // 1. address: "Alice's House" in delivered
        { place: "Bob's House", address: "Daria's House" }
    ]
)
// hypothetical best route to sample2 - 12 turns
const route2 = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House", "Town Hall",
    "Daria's House", "Ernie's House", "Grete's House", "Shop", "Town Hall",
    "Bob's House", "Alice's House"
]

// Sample - optimization problem
const sample3 = new VillageState(
    "Post Office",
    [
        { place: "Marketplace", address: "Cabin" },
        { place: "Post Office", address: "Grete's House" },  // <- never returned
        { place: "Ernie's House", address: "Farm" },  // <- never returned
        { place: "Ernie's House", address: "Alice's House" },
        { place: "Farm", address: "Bob's House" }
    ]
)
// hypothetical best route to sample3 - 11 turns
const route3 = [
	"Marketplace", "Shop", "Grete's House", "Ernie's House", "Grete's House",
  	"Farm", "Marketplace", "Town Hall", "Bob's House", "Alice's House", "Cabin"
]
// Sample - algorithm oversight
const sample4 = new VillageState(
    "Post Office",
    [
        { place: "Post Office", address: "Cabin" },
        { place: "Post Office", address: "Town Hall" },
        { place: "Post Office", address: "Farm" },
        { place: "Post Office", address: "Shop" },
        { place: "Post Office", address: "Marketplace" }
    ]
)

// finished 2021-08-25: helper function - "produce and return array of n! permutations"
function nFactorialPermutations(items) {
    // Return itself if given empty
    if (items.length == 0) return items

    // Recursively generate permutations to completion
    function func(permutations) {
        items.shift()  // remove and replace first item

        if (items.length == 0) {
            // if done, escape recursion and return result
            return permutations
        } else {

            // Append new item to previous permutation
            for (let i=0; i < permutations.length; i++) {
                permutations[i].push(items[0])
            }

            /// Shift to produce new permutation
            // Produce shifted variants
            let shiftedPermutations = []
            for (let permutation of permutations) {
                // produce copy and do the shifting
                let shifted = [...permutation]
                for (let i=0; i < permutation.length - 1; i++){
                    shifted.push(shifted[0])
                    shifted.shift()
                    // push copy of contents to container array
                    shiftedPermutations.push([...shifted])
                }
            }
            // Append variants to array to complete new permutations
            for (let permutation of shiftedPermutations) permutations.push(permutation)

            // Recurse
            return func(permutations)
        }
    }

    // Return
    return func([[items[0]]])
}


// finished 2021-08-26: helper function - "return all possible routes from pointA to pointZ"
function getBestPossibleRoutes(pointA, pointZ) {
    // Security existential check
    if ( Object.keys(roadGraph).some(point => point == pointA) == false ) throw new Error(`"${pointA}" does not exist`)
    if ( Object.keys(roadGraph).some(point => roadGraph[point].some(end => end == pointZ)) == false ) throw new Error(`"${pointZ}" does not exist`)

    // Return empty list if same point
    if (pointA == pointZ) return []

    // Use pre-determine turn average of goalOrientedRobot as limiter
    const avg = 15

    // Produce starting routes
    let routeList = []
    for (let point of roadGraph[pointA]) routeList.push([pointA, point])

    // Recursive function
    let i = 2  //
    function func(oldList) {
        let newList = []
        // Algorithm for generating next destination of routes list
        for (let route of oldList){
            let lastPoint = route[route.length - 1]
            // copy unchanged into newList if the last point of the given route is already pointZ
            if (lastPoint == pointZ) {
                newList.push([...route])
                continue  // and then skip to the next route
            }
            // otherwise proceed
            for (let destination of roadGraph[lastPoint]) {
                // filter to make sure routes do not repetitively go back and forth
                if (destination != route[route.length - 2]) newList.push([...route, destination])
            }
        }
        // Return when pointZ found or recurse otherwise
        i++;            // return newList

        if (i == avg) {
            let filtered = newList.filter(route => route[route.length - 1] == pointZ)
            return filtered  // <- return list of routes where the last point is pointZ
        }
        else return func(newList)  // <- if newList does not contain pointZ, recurse until so
    }

    // Return the best list of possible routes from pointA to pointZ, whose lengths are limited by the turn average of goalOrientedRobot
    return func(routeList)
}


// progenitor function (2021-08-24) updated -> wrapper function of its own derivative (2021-08-24)
// - "return shortest route from the given list of routes"
function getShortestRoute(routes) {
    return routes.reduce((given, arr) => given.length <= arr.length ? given : arr)
}


// Main algorithm
function bruteForceFindRoute(state) {

    // #1: Generate every permutation of delivery
    let deliveryPermutations = nFactorialPermutations(state.parcels)

    // #2: Generate the memory of each delivery permutation
    let memories = []
    for (let permutation of deliveryPermutations) {
        let current = state.place
        let memory = [current]
        // to compensate for runtime delivery
        let delivered = []
        let carried = []
        // -> Generate the shortest route for each memory
        for (let i=0; i < permutation.length; i++) {
            // Remove parcels if delivered
            for (let parcel of carried) {
                if (delivered.some(obj => util.isDeepStrictEqual(obj, parcel))) carried.pop(parcel)
            }
            // Simulate carrying parcel
            for (let point of memory) {
                for (let parcel of permutation) {
                    if (parcel.place == point && !(carried.some(obj => util.isDeepStrictEqual(obj, parcel)))) carried.push(parcel)
                }
            }
            /* Generate memory */
            let parcel = permutation[i]
            // skip parcel if already delivered
            if (delivered.includes(parcel)) continue
            // Go to the chosen parcel's address from where the robot is if
            if ((current == parcel.place || carried.some(obj => util.isDeepStrictEqual(obj, parcel))) && current != parcel.address) {
                // From current, go to address
                memory.push(...getShortestRoute(getBestPossibleRoutes(current, parcel.address)).slice(1))
            }
            // Otherwise, if both starting or last traveresed isn't current parcel's location, and current location isn
            else if (memory.length == 0 || current != parcel.place) {
                // From current, go to parcel
                memory.push(...getShortestRoute(getBestPossibleRoutes(current, parcel.place)).slice(1))
                // From current, go to address
                memory.push(...getShortestRoute(getBestPossibleRoutes(parcel.place, parcel.address)).slice(1))
            }
            current = memory[memory.length - 1]  // update current location in the memory
            // Delivery sensor
            for (let j=0; j < i; j++) {
                let parcel = permutation[j]
                if (memory.includes(parcel.address) && memory.includes(parcel.place)) {
                    if (memory[memory.indexOf(parcel.place)] < memory[memory.indexOf(parcel.address)]) delivered.push(parcel)
                }
            }
        }
        memories.push(memory.slice(1))
    }

    // #3: Return the shortest memory
    return getShortestRoute(memories)
}


// Debug algorithm - "return {permutation, solution}" - to generate insight from the algorithms
function bruteForceFindRouteDebug(state) {

    // #1: Generate every permutation of delivery
    let deliveryPermutations = nFactorialPermutations(state.parcels)

    // #2: Generate the memory of each delivery permutation
    // Debug
    const sample1Permutation = [
        { place: 'Post Office', address: "Bob's House" },
        { place: 'Post Office', address: 'Town Hall' },
        { place: 'Shop', address: 'Farm' },
        { place: "Daria's House", address: 'Town Hall' },
        { place: "Bob's House", address: 'Cabin' }
    ]
    const sample3Permutation = [
        { place: "Post Office", address: "Grete's House" },
        { place: "Ernie's House", address: "Farm" },
        { place: "Farm", address: "Bob's House" },
        { place: "Ernie's House", address: "Alice's House" },
        { place: "Marketplace", address: "Cabin" }
    ]
    const sample4Permutation = [
        { place: "Post Office", address: "Cabin" },
        { place: "Post Office", address: "Town Hall" },
        { place: "Post Office", address: "Farm" },
        { place: "Post Office", address: "Shop" },
        { place: "Post Office", address: "Marketplace" }
    ]
    let results = []
    for (let permutation of deliveryPermutations) {
        let current = state.place
        let memory = [current]
        // to compensate for runtime delivery
        let delivered = []
        let carried = []
        // -> Generate the shortest route for each memory
        for (let i=0; i < permutation.length; i++) {
            // Remove parcels if delivered
            for (let parcel of carried) {
                if (delivered.some(obj => util.isDeepStrictEqual(obj, parcel))) carried.pop(parcel)
            }
            // Simulate carrying parcel
            for (let point of memory) {
                for (let parcel of permutation) {
                    if (parcel.place == point && !(carried.some(obj => util.isDeepStrictEqual(obj, parcel)))) carried.push(parcel)
                }
            }
            /* Generate memory */
            let parcel = permutation[i]
            // if (util.isDeepStrictEqual(permutation, sample3Permutation)) console.log('current parcel', parcel, ':')
            // skip parcel if already delivered
            if (delivered.includes(parcel)) continue
            // Go to the chosen parcel's address from where the robot is if
            if ((current == parcel.place || carried.some(obj => util.isDeepStrictEqual(obj, parcel))) && current != parcel.address) {
                // From current, go to address
                memory.push(...getShortestRoute(getBestPossibleRoutes(current, parcel.address)).slice(1))
            }
            // Otherwise, if both starting or last traveresed isn't current parcel's location, and current location isn
            else if (memory.length == 0 || current != parcel.place) {
                // From current, go to parcel
                memory.push(...getShortestRoute(getBestPossibleRoutes(current, parcel.place)).slice(1))
                // From current, go to address
                memory.push(...getShortestRoute(getBestPossibleRoutes(parcel.place, parcel.address)).slice(1))
            }
            current = memory[memory.length - 1]  // update current location in the memory
            // Delivery sensor
            for (let j=0; j < i; j++) {
                let parcel = permutation[j]
                if (memory.includes(parcel.address) && memory.includes(parcel.place)) {
                    if (memory[memory.indexOf(parcel.place)] < memory[memory.indexOf(parcel.address)]) delivered.push(parcel)
                }
            }
        }
        results.push({permutation, memory: memory.slice(1)})
        // Debug
        // if (util.isDeepStrictEqual(permutation, sample1Permutation)) console.log(permutation)
        // console.log(permutation)
    }

    // Generate memories
    let memories = []
    for (let obj of results) memories.push(obj.memory)

    /*
    console.log(results.filter(obj => util.isDeepStrictEqual(obj.permutation, [
        { place: 'Shop', address: "Farm" },
        { place: "Daria's House", address: 'Town Hall' },
        { place: 'Post Office', address: 'Town Hall' },
        { place: "Post Office", address: "Bob's House" },
        { place: "Bob's House", address: 'Cabin' }
    ]))[0])
    */

    // console.log(results[0])

    // Shortest memory
    let shortestMemory = getShortestRoute(memories)

    // Return object
    return results.filter(obj => obj.memory == shortestMemory)[0]
}

// console.log(bruteForceFindRouteDebug(sample3))
// bruteForceFindRouteDebug(sample4)
// console.log(bruteForceFindRoute(sample2).length)

// Robot
function bruteForceFindRouteRobot(state, memory){
    // generate a route if none already given and if there are still parcels
    if (memory.length == 0) memory = bruteForceFindRoute(JSON.parse(JSON.stringify(state)))

    // move robot
    return { direction: memory[0], memory: memory.slice(1) }
}

/* Tests */
/*
Permutation:
    {place: "Post Office", address: "Bob's House"},
    {place: "Post ", address: ""},
    {place: "", address: ""},
    {place: "", address: ""},
    {place: "", address: ""}
*/
// 11: [ M S G F G E D T B A C ] - finished 2021-08-19 to 2021-08-26
// runRobot(sample1, bruteForceFindRouteRobot, [])

/*
Permutation:
    {place: "Cabin", address: "Alice's House"},
    {place: "Bob's House", address: "Daria's House"},
    {place: "Daria's House", address: "Alice's House"},
    {place: "Alice's House", address: "Ernie's House"},
    {place: "Daria's House", address: "Shop"}
*/
// 12: [ A C A B T D E G S M P A ] - finished 2021-08-26 to 2021-08-26 (optimized)
// runRobot(sample2, bruteForceFindRouteRobot, [])

/*
Permutation:
    {place: "", address: ""},
    {place: "", address: ""},
    {place: "", address: ""},
    {place: "", address: ""},
    {place: "", address: ""}
*/
// 11: [ M F G E G F M T B A C ] - finished 2021-08-26 to 2021-08-27 (optimized)
// runRobot(sample3, bruteForceFindRouteRobot, [])


// runRobot(sample, routeRobot, [])
// runRobot(sample, routeRobot, route)
// runRobot(sample, goalOrientedRobot, [])


// ... lines used, thus at most ... lines of code.
export {bruteForceFindRouteRobot}
