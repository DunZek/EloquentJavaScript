/* Simulation
    - return an available point using a VillageState object
    - return an object whose properties is a direction and a memory value
*/

//
function runRobot(state, robot, memory){
    // Run a loop to simulate
    for (let turn = 0;; turn++){
        // Report when finished
        if (state.parcels.length == 0) console.log(`Done in ${turn} turns`)

        // Instantiate / do an action for each turn. Use the "robot" predicate function
        let action = robot(state, memory)

        // Instantiate a new VillageState using the action's direction
        state = state.move(action.direction)

        // Instantiate / Re-instantiate the memory using the action's memory
        memory = action.memory

        // Lastly, report action's direction
        console.log(`Moved to ${action.direction}`)
    }
}

// Picking up and delivering packages by randomly going in whatever direction for each turn until finished
function randomPick(array){
    let choice = Math.floor(Math.random() * array.length)  // compute a random index for the given array
    return array[choice]  // return the random index
}
// The function itself
function randomRobot(state){ return {direction: randomPick(roadGraph[state.place])} }

//
