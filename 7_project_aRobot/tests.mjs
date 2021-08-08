import {VillageState, routeRobot, goalOrientedRobot, runRobot} from './main.mjs'

// It works fine
runRobot(VillageState.random(), routeRobot, [])

// Implementation
function myRunRobot(state, robot, memory){
    for (let turn = 0;; turn++){
        if (state.parcels.length == 0){
            console.log(`Done in ${turn} turns`)
            return
        }
        let action = robot(state, memory)
        state = state.move(action.direction)
        memory = action.memory
        console.log(`Moved to ${action.direction}`)
    }
}

myRunRobot(VillageState.random(), routeRobot, [])
