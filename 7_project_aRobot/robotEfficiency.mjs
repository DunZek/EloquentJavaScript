'use strict';
import {roadGraph, VillageState, runRobot, routeRobot, goalOrientedRobot} from './main.mjs'

/* 2. Robot efficiency
    - Write a robot that finishes the delivery task faster than "goalOrientedRobot()"
Pseudocode:
Input: Array -> VillageState.parcels
Graph -> [Object: null prototype] {
  "Alice's House": [ "Bob's House", 'Cabin', 'Post Office' ],
  "Bob's House": [ "Alice's House", 'Town Hall' ],
  Cabin: [ "Alice's House" ],
  'Post Office': [ "Alice's House", 'Marketplace' ],
  'Town Hall': [ "Bob's House", "Daria's House", 'Marketplace', 'Shop' ],
  "Daria's House": [ "Ernie's House", 'Town Hall' ],
  "Ernie's House": [ "Daria's House", "Grete's House" ],
  "Grete's House": [ "Ernie's House", 'Farm', 'Shop' ],
  Farm: [ "Grete's House", 'Marketplace' ],
  Shop: [ "Grete's House", 'Marketplace', 'Town Hall' ],
  Marketplace: [ 'Farm', 'Post Office', 'Shop', 'Town Hall' ]
}
Sample -> VillageState {
    place: "Post Office",
    parcels: [
        { place: "Bob's House", address: "Cabin"},
        { place: "Daria's House", address: 'Town Hall' },
        { place: 'Post Office', address: "Bob's House" },
        { place: 'Post Office', address: 'Town Hall' },
        { place: 'Shop', address: 'Farm' }
    ]
}

Important Axioms:
    - Robot always starts at the "Post Office" point of the graph
    - Parcels may be placed anywhere in the graph
    - Parcels may be addressed anywhere in the graph

Output: Array -> "A list shorter than goalOrientedRobot()'s findRoute()"
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

// Sample - optimization problem
const sample2 = new VillageState (
    "Post Office",
    [
        { place: "Alice's House", address: "Ernie's House" },  // 2. place: "Alice's House" in delivered
        { place: "Daria's House", address: "Alice's House" },  // <- unable to be delivered therefore
        { place: "Daria's House", address: "Shop" },
        { place: "Cabin", address: "Alice's House" },          // 1. address: "Alice's House" in delivered
        { place: "Bob's House", address: "Daria's House"}
    ]
)

// Sample - stuck!!
const sample3 = new VillageState(
    "Post Office",
    [
        { place: "Marketplace", address: "Cabin"},
        { place: "Post Office", address: "Grete's House"},
        { place: "Ernie's House", address: "Farm"},
        { place: "Ernie's House", address: "Alice's House"},
        { place: "Farm", address: "Bob's House"}
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
        let memory = []
        let delivered = []  // to compensate for runtime delivery
        // -> Generate the shortest route for each memory
        let current = state.place
        for (let parcel of permutation) {
            // Skip parcel if already delivered
            if (delivered.includes(parcel)) continue
            // Otherwise...
            if ((memory.length == 0 || memory[memory.length - 1] != parcel.place) && current != parcel.place) {
                // From current, go to parcel
                memory.push(...getShortestRoute(getBestPossibleRoutes(current, parcel.place)).slice(1))
                current = parcel.place
                // From current, go to address
                memory.push(...getShortestRoute(getBestPossibleRoutes(current, parcel.address)).slice(1))
                current = parcel.address
            } else if (memory[memory.length - 1] == parcel.place) {
                // From current, go to address
                memory.push(...getShortestRoute(getBestPossibleRoutes(current, parcel.address)).slice(1))
                current = parcel.address
            }
            // Delivery sensor
            for (let parcel of permutation) {
                if (memory.includes(parcel.address) && memory.includes(parcel.place)) {
                    if (memory[memory.indexOf(parcel.place)] < memory[memory.indexOf(parcel.address)])
                    delivered.push(parcel)
                }
            }
        }
        memories.push(memory)
    }

    // #3: Return the shortest memory
    return getShortestRoute(memories)
}


// Robot
function bruteForceFindRouteRobot(state, memory){
    // generate a route if none already given and if there are still parcels
    if (memory.length == 0) memory = bruteForceFindRoute(JSON.parse(JSON.stringify(state)))

    // move robot
    return { direction: memory[0], memory: memory.slice(1) }
}

// Tests
// 11: [ M S G F G E D T B A C ]
runRobot(sample3, bruteForceFindRouteRobot, [])
// 15: [ A B T D E D T S T D T B A C A ]
runRobot(sample3, bruteForceFindRouteRobot, [])
// : [  ]
runRobot(sample3, bruteForceFindRouteRobot, [])


// runRobot(sample, routeRobot, [])
// runRobot(sample, routeRobot, route)
// runRobot(sample, goalOrientedRobot, [])


// ... lines used, thus at most ... lines of code.
export {bruteForceFindRouteRobot}
