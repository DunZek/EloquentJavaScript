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
console.log(roadGraph)


/* The Task
    - The robot delivers a package from the place to their destination
*/

class VillageState {
    constructor(place, parcels) {
        this.place
        this.parcels
    }
    move(destination) {
        if (!roadGraph[this.place].includes(destination)) return this

        let parcels = this.parcels.map(parcel => {
            if (parcel.place != this.place) return parcel
            return {place: destination, address: parcel.address}
        }).filter(parcel => parcel.place != parcel.address)
        return new VillageState(destination, parcels)
    }
}

let first = new VillageState(
    "Post Office",
    [{place: "Post Office", address: "Alice's House"}]
)
let next = first.move("Alice's House")
console.log(next.place)  // Alice's House
console.log(next.parcel)  // []
console.log(first.place)  // Post Office

/* Persistent Data
    - "Immutable" - the incapacity to change
    - In JavaScript, not a lot of things are immutable like strings and numbers
*/
