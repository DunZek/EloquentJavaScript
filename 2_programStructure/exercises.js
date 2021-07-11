/* Looping a triangle
    Expected output:
    #
    ##
    ###
    ####
    #####
    ######
    #######
*/
for (let octothorps = "#"; octothorps.length <= 7; octothorps += "#") console.log(octothorps)

/* FizzBuzz */
for (let i = 1; i <= 100; i++){
    output = ""
    if (i % 3 == 0) output += "Fizz"
    if (i % 5 == 0) output += "Buzz"
    console.log(`${i}: ${output}`)
}

/* Chessboard */
let size = 9
let board = ""
for (let y = 1; y <= size; y++){
    for (let x = 1; x <= size; x++){
        if((x + y) % 2 == 0){
            board += " "
        } else {
            board += "#"
        }
    }
    board += "\n"
}
console.log(board)