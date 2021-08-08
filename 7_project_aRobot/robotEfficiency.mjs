'use strict';

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

import {roadGraph, VillageState, runRobot, goalOrientedRobot} from './main.mjs'

// [Point A, Point B] -> "Shortest possible route expressed as a list"
function getShortestRoute(pointA, pointB){
    let routes = []
    function findRoutes(pointA, pointB){
        if (pointA != pointB){
            for (let point of roadGraph[pointA]) {
                findRoutes(point, pointB)
                console.log(point)
            }
        else
        }
    }
    return route
}

console.log(getShortestRoute("Post Office", "Shop"))

// Robot
function yourRobot({startingPlace, parcels}, memory){

}

// Run simulation
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
