/* Meadowfield
    - define and return a list of the points of Meadowfield
        - for each point, define a list of other points accessible to it
*/

const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
]

function buildGraph(edges){
    let container = edges.map(road => road.split('-'))
    let forReturn = Object.create(null)
    container.forEach(([pointA, pointB]) => {
        if (!(pointA in forReturn)) forReturn[pointA] = [pointB]
        if (!forReturn[pointA].includes(pointB)) forReturn[pointA].push(pointB)
        if (!(pointB in forReturn)) forReturn[pointB] = [pointA]
        if (!forReturn[pointB].includes(pointA)) forReturn[pointB].push(pointA)
    })
    return forReturn
}

let roadGraph = buildGraph(roads)
// console.log(roadGraph)

/*

Input: Array
    [
        "Alice's House-Bob's House",   "Alice's House-Cabin",
        "Alice's House-Post Office",   "Bob's House-Town Hall",
        "Daria's House-Ernie's House", "Daria's House-Town Hall",
        "Ernie's House-Grete's House", "Grete's House-Farm",
        "Grete's House-Shop",          "Marketplace-Farm",
        "Marketplace-Post Office",     "Marketplace-Shop",
        "Marketplace-Town Hall",       "Shop-Town Hall"
    ]

Output: [Object: null prototype]
    {
        "Alice's House": [ "Bob's House", 'Cabin', 'Post Office' ],
        "Bob's House": [ "Alice's House", 'Town Hall' ],
        Cabin: [ "Alice's House" ],
        'Post Office': [ "Alice's House", 'Marketplace' ],
        'Town Hall': [ "Bob's House", "Daria's House", 'Marketplace', 'Shop' ],
        "Daria's House": [ "Ernie's House", 'Town Hall' ],
        "Ernie's House": [ "Daria's House", "Grete's House" ],
        "Grete's House": [ "Ernie's House", 'Farm', 'Shop' ],
        Farm: [ "Grete's House", 'Marketplace' ],
        Shop: [ "Grete's House", 'Marketplace', 'Town Hall' ],
        Marketplace: [ 'Farm', 'Post Office', 'Shop', 'Town Hall' ]
    }

*/

// This makes sure the data is exported in node.js —
// `require('./path/to/journal.js')` will get you the array.
if (typeof module != "undefined" && module.exports && (typeof window == "undefined" || window.exports != exports)) module.exports = roadGraph
if (typeof global != "undefined" && !global.roadGraph) global.roadGraph = roadGraph
