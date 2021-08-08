'use strict';

// Dependencies
import {VillageState, routeRobot, goalOrientedRobot, runRobot} from './main.mjs'

/* 1. Measuring a robot
    - Write a compareRobots():
        - Takes in two robots
        - Takes in robot starting memory
        - Generate 100 simulations and let each robot solve these simulations. Same list of simulations for each robot.
        - Return the average number of steps each robot took per simulation
Pseudocode:
Input: 2 robots
compareRobots(robots, memories):
    for robot in [routeRobot, goalOrientedRobot] with "[]" memory:
        - Simulation 1   -> Tasks: [parcel 1, parcel 2, ..., parcel 5] -> "N"-number steps took to completion
        - Simulation 2   -> Tasks: [parcel 1, parcel 2, ..., parcel 5] -> "N"-number steps took to completion
        - ...
        - Simulation 100 -> Tasks: [parcel 1, parcel 2, ..., parcel 5] -> "N"-number steps took to completion
    return "average number of steps taken in each simulation for the total 100 simulations ran" for each robot
    // ^^ "Sum of a hundred numbers" / 100
Output: 2 numbers
*/
function compareRobots(robots, memories){
    // Return value -> 2 numbers particular to specific robot
    let averages = {}

    // Generate the list of simulations to run through
    let villages = []
    for (let i=0; i<100; i++) villages.push(new VillageState.random())
    console.log(villages.length)
    console.log(villages[0])

    // Run each robot
    for (let robot of robots){
        let turnNumbers = []
        // Run through list of simulations
        for (let village of villages){
            // Run and finish tasks
            turnNumbers.push(myRunRobot(village, robot, memories[robots.indexOf(robot)]))
        }

        // Push to output average once done computation
        averages[robot] = Math.round(turnNumbers.reduce((sum, step) => sum + step) / turnNumbers.length)
    }

    return averages
}

function myRunRobot(state, robot, memory){
    for (let turn=0;; turn++){
        if (state.parcels.length == 0) return turn
        let action = robot(state, memory)
        state = state.move(action.direction)
        memory = action.memory
        // console.log(`Moved to ${action.direction}`)
    }
}

console.log(compareRobots([routeRobot, goalOrientedRobot], [[], []]))


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
function yourRobot(){

}

let sampleVillage = new VillageState (
    "Post Office",
    [
        { place: "Bob's House", address: "Cabin"},
        { place: "Daria's House", address: 'Town Hall' },
        { place: 'Post Office', address: "Bob's House" },
        { place: 'Post Office', address: 'Town Hall' },
        { place: 'Shop', address: 'Farm' }
    ]
)

runRobot(sampleVillage, yourRobot, memory)

/* 3. Persistent group */
