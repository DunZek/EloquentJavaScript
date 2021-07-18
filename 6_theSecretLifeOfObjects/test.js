// Example -> implementing an iterable data-structure
class Matrix {
    constructor(width, height, element = (x, y) => undefined){
        this.width = width
        this.height = height
        this.content = []

        for (let y=0; y < height; y++){
            for (let x=0; x < width; x++){
                this.content[y * width + x] = element(x, y)
            }
        }
    }

    get(x, y){
        return this.content[y * this.width + x]
    }
    set(x, y, value){
        this.content[y * this.width + x] = value
    }
}

// Our own iterator interface for our own object
class MatrixIterator {
    constructor(matrix){
        this.x = 0
        this.y = 0
        this.matrix = matrix
    }
    // The construction of the Object[Symbol.iterator]().next() method
    next(){
        // Handle case when iterable finishes, else proceed
        if (this.y == this.matrix.height) return {done: true}

        // Define value that the .next() method returns
        let value = {x: this.x, y: this.y, value: this.matrix.get(this.x, this.y)}

        // Iterate over to the next element
        this.x++
        // When the end has been reached actually, iterate to the next row and equate to the first index
        if (this.x == this.matrix.width){
            this.x = 0,
            this.y++
        }

        return {value, done: false}
    }
}

// Define the iterator interface for our particular object. This finally enables the Matrix object to be an iterable data-structure.
Matrix.prototype[Symbol.iterator] = function(){
    return new MatrixIterator(this)  // remember that the constructor function can only be invoked by using the "new" keyword
}

// With the iterator interface defined, loops can now interface with our Matrix object as it is now an official iterable
let matrix = new Matrix(2, 2, (x, y) => `value ${x}, ${y}`)
for (let {x, y, value} of matrix){
    console.log(value)  // "x" position, then "y" position
}
console.log(matrix)
