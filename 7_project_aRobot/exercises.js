'use strict';

// Dependencies
require('./main.js')

/* Measuring a robot
    - Write a compareRobots():
        - Takes in two robots
        - Takes in robot starting memory
        - Generate 100 tasks and let each robot solve these tasks. Same task for each robot.
        - Return the average number of steps each robot took per task
*/
function compareRobots(robots, memories){
    // Generate worlds to run on
    let villages = []
    for (let i=0; i!=100; i++) villages.push(new VillageState.random())
    // Run the world simulations per robot and record average steps taken per robot
    let outputAverage = []  // returned output
    for (let i=0; i!=robots.length; i++){
        let steps = []
        // Run through task
        for (let substrate of villages){
            // Extract executable world from substrate
            let village = new VillageState(substrate.place, substrate.parcels)
            console.log(village)
            // Run through village
            for (let turn=0;; turn++){
                if (village.parcels.length == 0) {
                    steps.push(turn)
                    break
                }
                let action = robots[i](village, memories[i])
                let village = village.move(action.direction)
                let memory = action.memory
                console.log(`Moved to ${action.direction}`)
            }
        }
        let averageSteps = steps.reduce((sum, step) => sum + step) / steps.length

        // Push to output average once done computations
        outputAverage.push({robot: robots[i], averageSteps})
    }

    return outputAverage
}

console.log(compareRobots([routeRobot, goalOrientedRobot], [[], []]))

/* Robot efficiency */

/* Persistent group */
