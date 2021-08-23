/* Meadowfield
    - "Graph" - a collection of points with lines between them that lead to other points
*/
// A graph of Meadowfield
const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
]
// Creating a data-structure from graph data ("roads" in this case) that tells us, per point, which point is accessed via line
function buildGraph(edges){
    let container = edges.map(road => road.split('-'))
    let forReturn = Object.create(null)
    container.forEach(([pointA, pointB]) => {
        // Declare object in array if not done yet, Push data in if not in yet
        if (!(pointA in forReturn)) forReturn[pointA] = [pointB]
        if (!forReturn[pointA].includes(pointB)) forReturn[pointA].push(pointB)

        // Declare object in array if not done yet, Push data in if not in yet
        if (!(pointB in forReturn)) forReturn[pointB] = [pointA]
        if (!forReturn[pointB].includes(pointA)) forReturn[pointB].push(pointA)
    })
    return forReturn
}
let roadGraph = buildGraph(roads)
// console.log(roadGraph)


/* The Task
    - The robot delivers a package from the place to their destination
*/

class VillageState {
    constructor(place, parcels) {
        this.place = place
        this.parcels = parcels
    }
    move(destination) {
        if (!roadGraph[this.place].includes(destination)) return this  // reinstatiate as the same object

        let parcels = this.parcels.map(parcel => {
            if (parcel.place != this.place) return parcel  // return the same parcels if they're not delivered

            return {place: destination, address: parcel.address}  // else, return that they are delivered
        }).filter(parcel => parcel.place != parcel.address)  // only return parcels to be delivered
        return new VillageState(destination, parcels)  // else, reinstantiate as a new object
    }
}

let first = new VillageState(
    "Post Office",  // <- current place
    [{place: "Post Office", address: "Alice's House"}]  // <- a parcel to be delivered
)
// let next = first.move("Alice's House")
// console.log(next)
// console.log(next.place)  // Alice's House
// console.log(next.parcel)  // []
// console.log(first.place)  // Post Office

/* Persistent Data
    - "Immutable" - the incapacity to change
    - In JavaScript, not a lot of things are immutable like strings and numbers
    - "Object.freeze()" - a method that changes an object's mutability
        - Using it however isn't the best solution as bugs may arise and humans may get confused.
            - Best to just document that a given mutable object must not be tampered with
        - Although, this allows a programmer to handle the complexity of their programs better.
            - Programmers are limited by how much they can understand of a given system.
                - The better a programmer can understand the system, the bigger and better software they can develop.

    - Unfortunately, designing systems with persistent data is hard, especially when the programming language doesn't help too much.
*/
let object = Object.freeze({value: 5})
// object.value = 10  // no effect
// console.log(object.value)  // 5

/* Simulation
    - One can conceive of the robot as a function which returns a direction of choice using particular parameters
        - sort of like robot(VillageState) { return destination }
    - The robot needs to keep track of information to execute plans. And so, its memory should both be instantiated and keep being reinstantiated
        - The robot therefore returns not only the direction of a place of interest, but also a memory it reinstantiates that it will pass to itself.
*/
function runRobot(state, robot, memory){  // VillageState, predicate-function, memory
    for (let turnCount = 0;; turnCount++){
        if (state.parcels.length == 0){
            console.log(`Done in ${turnCount} turns`)
            break  // end simulation: there are no more parcels to deliver
        }
        let action = robot(state, memory)  // robot() is actually a predicate function which makes a decision and returns an action
        state = state.move(action.direction)
        memory = action.memory
        console.log(`Moved to ${action.direction}`)
    }
}

// Here is a strategy to finish the robot's mission:
function randomPick(array){
    let choice = Math.floor(Math.random() * array.length)  // return a random index from the given array
    return array[choice]
}

function randomRobot(state){
    return { direction: randomPick(roadGraph[state.place]) }
}

VillageState.random = function(parcelCount = 5){
    let parcels = []
    for (let i = 0; i < parcelCount; i++){
        let address = randomPick(Object.keys(roadGraph))
        let place
        do {
            place = randomPick(Object.keys(roadGraph))
        } while (place == address)
        parcels.push({place, address})
    }
    return new VillageState("Post Office", parcels)
}

// runRobot(VillageState.random(), randomRobot)

/* The Mail Truck's Route */
// Here's a route that passes all places in the village starting from the post office
const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
]

// Using robot memory to keep the rest of its route in its memory while dropping the first element every turn
function routeRobot(state, memory){
    if (memory.length == 0) memory = mailRoute
    return { direction: memory[0], memory: memory.slice(1) }
}

// runRobot(VillageState.random(), routeRobot, [])

/* Pathfinding - adjusting the robot's behavior accordingly to the task
    - A route-finding function is required to accomplish the following:
        - moving towards given parcels
        - moving towards the addresses of carried parcels
    - Such a problem of finding a route through a graph is a typical "search problem"
    - Producing solutions for the search problem requires returning the
    - Explore every possible route and find the shortest route
*/
//
function findRoute(graph, from, to){
    let work = [ {at: from, route: []} ]
    for (let i = 0; i < work.length; i++){
        let {at, route} = work[i]
        // console.log("here", graph[at])
        for (let place of graph[at]){
            if (place == to) return route.concat(place)
            if (!work.some(w => w.at == place)) work.push( {at: place, route: route.concat(place)} )
        }
    }
}



//
function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0){
        let parcel = parcels[0]
        if (parcel.place != place) route = findRoute(roadGraph, place, parcel.place)
        else route = findRoute(roadGraph, place, parcel.address)
    }
    // print memory
    // console.log('memory', route.slice(1))
    return { direction: route[0], memory: route.slice(1) }
}

// runRobot(VillageState.random(), goalOrientedRobot, [])

export {roadGraph, VillageState, runRobot, routeRobot, goalOrientedRobot}
