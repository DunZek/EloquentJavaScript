/* 1. Generating a point-points array from an input of point-to-point graph-array */
// Given graph input array of Meadowfield
const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
]
// Algorithm
function buildGraph(edges){
    let container = edges.map(road => road.split('-'))
    /* ^^
        Example:
            "Alice's House-Bob's House" -> ["Alice's House", "Bob's House"]
    */

    let graph = Object.create(null)
    // ^^ Creating a dictionary to be returned

    container.forEach(([pointA, pointB]) => {
        if (!(pointA in graph)) graph[pointA] = [pointB]
        if (!graph[pointA].includes(pointB)) graph[pointA].push(pointB)

        if (!(pointB in graph)) graph[pointB] = [pointA]
        if (!graph[pointB].includes(pointA)) graph[pointB].push(pointA)
    })
    /* ^^
        
    */

    return graph
}

// Output
let roadGraph = buildGraph(roads)
console.log(roadGraph)

/* 2. */

/* 8. */

/* 9. Defining a sophisticated robot function / predicate */
