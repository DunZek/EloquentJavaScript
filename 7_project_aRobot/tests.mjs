import {VillageState, routeRobot, goalOrientedRobot, runRobot} from './main.mjs'

let sample = new VillageState(
    "Post Office",
    [
        { place: "Bob's House", address: "Cabin"},
        { place: "Daria's House", address: 'Town Hall' },
        { place: 'Post Office', address: "Bob's House" },
        { place: 'Post Office', address: 'Town Hall' },
        { place: 'Shop', address: 'Farm' }
    ]
)
runRobot(sample, goalOrientedRobot, []);
