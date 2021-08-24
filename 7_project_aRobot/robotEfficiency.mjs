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


// helper function #1 - return shortest route from pointA to pointZ
function aToZ(pointA, pointZ) {
    // Security existential check
    if ( Object.keys(roadGraph).some(point => point == pointA) == false ) throw new Error(`"${pointA}" does not exist`)
    if ( Object.keys(roadGraph).some(point => roadGraph[point].some(end => end == pointZ)) == false ) throw new Error(`"${pointZ}" does not exist`)

    // Return empty list if same point
    if (pointA == pointZ) return []

    //
    let routeList = []
    for (let point of roadGraph[pointA]) routeList.push([pointA, point])
    console.log('routeList', routeList)

    // Recursive function
    function func(oldList) {
        let newList = []
        // algorithm
        for (let route of oldList){
            for (let destination of roadGraph[route[route.length - 1]]) {
                // console.log(roadGraph[route[route.length - 1]], destination)
                if ( oldList.every(route => route.every(point => destination != point))) newList.push([...route, destination])
            }
        }
        console.log('newList', newList)


        // Return or recurse
        if ( newList.some(route => route.some(point => point == pointZ) ) ) {
            let filtered = newList.filter(route => route.some(point => point == pointZ))
            console.log('filtered', filtered)
            return filtered
        }
        else func(newList)
        // else return newList
    }

    // debug

    // Return the shortest route
    return func(routeList).reduce((given, arr) => given.length <= arr.length ? given : arr)
}
console.log(aToZ("Post Office", "Daria's House"))
// console.log(aToZ("Post Office", "Cabin"))
// console.log(aToZ("Post Office", "Post Office"))
// console.log(aToZ("Post Office", "Hospital"))

// Robot
function yourRobot({startingPlace, parcels}, memory){
    // 1. For each parcel

    // 2.

    // 3.
}

// Test
let sample = new VillageState (
    "Post Office",
    [
//        { place: "Bob's House", address: "Cabin"},
//        { place: "Daria's House", address: 'Town Hall' },
//        { place: 'Post Office', address: "Bob's House" },
//        { place: 'Post Office', address: 'Town Hall' },
        { place: 'Shop', address: 'Farm' }
    ])
// runRobot(sample, yourRobot, [])
