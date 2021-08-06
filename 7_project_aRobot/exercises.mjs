'use strict';

// Dependencies
import {VillageState, routeRobot, goalOrientedRobot} from './main.mjs'

/* Measuring a robot
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
    for (let i=0; i!=100; i++) villages.push(new VillageState.random())

    // Run each robot
    for (let i=0; i!=robots.length; i++){
        let turnNumbers = []
        // Run through list of simulations
        for (let village of villages){
            // Run and finish tasks
            for (let turn=0;; turn++){
                if (village.parcels.length == 0) {
                    turns.push(turn)
                    break
                }
                let action = robots[i](village, memories[i])
                let village = village.move(action.direction)
                let memory = action.memory
                console.log(`Moved to ${action.direction}`)
            }
        }

        // Push to output average once done computation
        averages[robot] = turnNumbers.reduce((sum, steps) => sum + step) turnNumberes / turnNumbers.length
    }

    return averages
}



console.log(compareRobots([routeRobot, goalOrientedRobot], [[], []]))


/* Robot efficiency */

/* Persistent group */
