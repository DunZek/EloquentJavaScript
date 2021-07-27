/*  The Task
    - Define the village's state as minimally as practically possible
        - "Robot's current location"
        - "a collection of undelivered parcels"
            - each of which has a "current location" and a "destination address"
*/

let roadGraph = require('./1_meadowfield.js')

class VillageState {
    constructor(place, parcels){
        this.currentLocation = place  // <- construct the robot's current location
        this.parcels = parcels  // <- construct a collection of undelivered parcels
    }

    /** VillageState.moveTo()
    *   - Handles robot delivery
    *   - Updates "parcels" list-property accordingly
    *   - Acts in accordance to roadGraph
    */
    moveTo(destination){
        if (!roadGraph[this.currentLocation].includes(destination)) {
            console.log(`"${destination}" is unreachable from "${this.currentLocation}". Returning previous...`)
            return this  // return and reinstantiate the object invocated with
        }
        else {
            // Process parcels when moved to destination
            let parcels = this.parcels.map(parcel => {
                if (parcel.place != this.currentLocation) return parcel  // don't touch any parcel that doesn't belong to the current address
                return {place: destination, address: parcel.address}
            }).filter(parcel => parcel.place != parcel.address)

            // Instantiate a new object completely as the container of the new state
            return new VillageState(destination, parcels)
        }
    }
}

let first = new VillageState(
    "Post Office",  // current location
    // Parcels to be delivered
    [
        {place: "Post Office", address: "Alice's House"},
        {place: "Alice's House", address: "Shop"},
        {place: "Marketplace", address: "Alice's House"}
    ]
)
let second = first.moveTo("Alice's House")  // instantiating a new state instead of modification
console.log("First:", first)
console.log("Second:", second)  // place: "Alice's House", parcels: []

let third = second.moveTo("Shop")
console.log("Third:", third)
