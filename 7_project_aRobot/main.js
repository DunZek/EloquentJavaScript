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
let container = roads.map(road => road.split('-'))
console.log(container)