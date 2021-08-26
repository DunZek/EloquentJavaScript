'use strict';
import {roadGraph, VillageState, runRobot, goalOrientedRobot} from './main.mjs'

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

// Sample used
let sample = new VillageState (
    "Post Office",
    [
       { place: "Bob's House", address: "Cabin"},
       { place: "Daria's House", address: 'Town Hall' },
       { place: 'Post Office', address: "Bob's House" },
       { place: 'Post Office', address: 'Town Hall' },
        { place: 'Shop', address: 'Farm' }
    ]
)


// helper function - "return shortest route from pointA to pointZ"
function generateShortestRoute(pointA, pointZ) {
    // Security existential check
    if ( Object.keys(roadGraph).some(point => point == pointA) == false ) throw new Error(`"${pointA}" does not exist`)
    if ( Object.keys(roadGraph).some(point => roadGraph[point].some(end => end == pointZ)) == false ) throw new Error(`"${pointZ}" does not exist`)

    // Return empty list if same point
    if (pointA == pointZ) return []

    // Produce starting routes
    let routeList = []
    for (let point of roadGraph[pointA]) routeList.push([pointA, point])

    // Recursive function
    function func(oldList) {
        let newList = []
        // Algorithm
        for (let route of oldList){
            for (let destination of roadGraph[route[route.length - 1]]) {
                // filter for redundacies
                if ( oldList.every(route => route.every(point => destination != point))) newList.push([...route, destination])
            }
        }
        // Return or recurse
        if ( newList.some(route => route.some(point => point == pointZ)) ) {
            let filtered = newList.filter(route => route.some(point => point == pointZ))
            return filtered  // <- return list of routes only containing pointZ
        }
        else return func(newList)  // <- if newList does not contain pointZ, recurse until so
    }

    // Return the shortest route
    return func(routeList).reduce((given, arr) => given.length <= arr.length ? given : arr)
}


// helper function - "produce and return array of n! permutations"
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

// Robot
function yourRobot({place, parcels}, route){

    // 1. For each parcel
    for (let parcel of parcels) {

    }

    // Move robot
    return { direction: route[0], memory: route.slice(1) }
}

// Test
// runRobot(sample, yourRobot, [])
