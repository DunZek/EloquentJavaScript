let roadGraph = require('./1_meadowfield.js')
// console.log(roadGraph)

class VillageState {
    constructor(place, parcels){
        this.place = place
        this.parcels = parcels
    }
    moveTo(destination){
        if (!roadGraph[this.place].includes(destination)) return this
        else {
            // Process parcels when moved to destination
            let parcels = this.parcels.map(parcel => {
                if (parcel.place != this.place) return parcel  // don't touch any parcel that doesn't belong to the current address
                return {place: destination, address: parcel.address}
            }).filter(parcel => parcel.place != parcel.address)

            // Instantiate a new object completely as the container of the new state
            return new VillageState(destination, parcels)
        }
    }
}

let start = new VillageState(
    "Post Office",  // current location
    [
        {place: "Post Office", address: "Alice's House"}  // a parcel to be delivered
    ]
)
let next = start.moveTo("Alice's House")
console.log(start)
console.log(next)
