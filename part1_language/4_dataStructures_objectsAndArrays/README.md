# Chapter 4: Data Structures: Objects and Arrays
> Fundamental understanding of computer programs, functions and primitive data enable comprehension of further advanced programming using complex structures of data

### Notes
- Data structures are importantly composed of primitives and objects. The latter enables the aggregation of values and thus the construction of complex structures.
- ###### The Weresquirrel
    - Valuable information can be stored and utilized in the computer as a data structure.
- ###### Data sets
    - A collection of data can be represented using *arrays*, implemented in JavaScript as comma-delimited values contained within a pair of square brackets `[]`:
        - ```js
          // Instantiation
          let primes = [2, 3, 4, 5, 7, 11]
          // Accessing an array using an index
          primes[0]  // 2
          primes[0 + 1]  // 3
          ```
- ###### Properties
    - Almost all JavaScript objects have properties, which are accessible pieces of programs or data. There are two ways of accessing properties: dot-notation: `Object.method()` and bracket-notation:
        - ```js
          // Dot-notation - mostly used for object properties
          Math.max(1, 2)  // 2
          // Bracket-notation - mostly used for accessing arrays
          ['a', 'b', 'c'][2]  // 'c'
          Object['values']([0, 1, 2])  // [0, 1, 2]
          ```
    - Note: `undefined` and `null` have no properties. They will return an error if accessed.
- ###### Methods
    - Methods are the function-properties that objects and values hold. Here are two string methods:
        - ```js
          let doh = "Doh"
          typeof doh.toUpperCase  // function
          doh.toLowerCase()  // "doh"
          ```
    - Here are two array methods:
        - ```js
          // The two particular method names are named after the methods used upon the traditional 'stack' data type.
          let stack = [1, 2, 3]
          // Update the given array to include the given value
          stack.push(4)
          console.log(stack)  // [1, 2, 3, 4]
          // Remove the given value, if given, else the last value and return it
          console.log(stack.pop())  // 5
          console.log(stack)  // [1, 2, 3, 4]
          ```
- ###### Objects
    - An arbitrary collection of properties and their values is called an *object*. Curly braces `{}` are used to instantiate one:
        - ```js
          // Note: properties may be declared as variables or as strings
          let object = {left 1, "right": 2}
          // Deleting a property using the given unary operator:
          delete anObject.left
          "left" in object  // false
          "right" in object  // true
          ```
    - `Object` have certain static methods to use on objects:
        - ```js
          // Returning a string-list of the object's property names:
          Object.keys({name: "John", "full name": "John Doe"})  // ['name', 'full name']
          // Copying the properties of an object to another:
          let object = {a: 1, b: 2};
          Object.assign(object, {b: 3, c: 4})
          console.log(object)  // {a: 1, b: 3, c: 4}
          ```
    - Arrays can be revealed as just another type of objects:
        - ```js
          console.log(typeof ["Hello", "World"])  // object
          ```
- ###### Mutability
    - Values such as numbers, strings, and Booleans are immutable. Objects such as objects and arrays on the other hand, can have their properties be changed, and are thus mutable. Basically, primitive data types are immutable while complex data structures made up individual primitive ones are.
    - Objects:
        - ```js
          // Having the same reference is not the same as having the same properties
          let object1 = {value: 10}
          let object2 = object1
          let object3 = {value: 10}
          object1 == object2  // true
          object1 == object3  // false
          // Demonstrating identities
          object1.value = 15
          console.log(object2.value)  // 15
          // Note: `==` operator compares identities
          ```
    - `let` and `const` affects the mutability of variables:
        - ```js
          // Using 'let'
          let spam = 'eggs'
          spam = 'foo'
          console.log(spam)  // foo
          // Using 'const'
          const bar = 'xyz'
          console.log(bar)  // xyz
          bar = 'abc'  // Uncaught TypeError: Assignment to constant variable
          ```
- ###### The Lycanthrope's Log
    - correlation -> measure of dependence between statistical variables.
        - Usually expressed as a value that ranges from -1 to 1
            - `-1` - definitely NOT correlated
            - `0` - no correlation
            - `1` - definitely correlated
    - measurements -> sets of statistical variables
    - "phi (ϕ) coefficient" -> calculated by a formula for measuring correlation between two Boolean variables
        - Input -> a frequency table of different variable combinations
        - Output -> a number between -1 and 1 (phi "ϕ" itself)
- ###### Computing Correlation
    - Neither squirrel nor pizza (00): 76
    - Pizza (01): 9
    - Squirrel (10): 4
    - squirrel AND pizza (11): 1

    - All of squirrel (1*): 5
    - None of squirrel (0*): 85
    - All of pizza (*1): 10
    - None of pizza (*0): 80

    - `ϕ` = `( (11)x(00) - (10)x(01) )/sqrt( (1*)x(0*)x(*1)x(*0) )`
- ###### Array Loops
    - Accessing array elements is common practice:
        - ```js
          for (let i = 0; i < array.length; i++) {
              let element = array[i]
              console.log(element)
          }
          ```
    - And so the syntax has been simplified in ES6:
        - ```js
          for (let element of array){
              console.log(element)
          }
          ```
- ###### The Final Analysis
    - Log every event into a list
    - Calculate and show the correlation between 'squirrel' and a given event
    - Filter to show only results with correlations greater than 0.1 or less than -0.1
    - Modify event to push the "peanut teeth" even when Jacques does not brush his teeth and also ate peanuts
- ###### Further Arrayology
    - Some useful array methods:
        - ```js
          let myList = []
          myList.push("Item")
          console.log(myList.shift())
          function (task) { myList.push(task) }
          ```
- ###### Strings and their Properties
- ###### Rest Parameters
- ###### The Math Object
- ###### Destructuring
- ###### JSON

---
### Exercises
- ###### The Sum of a Range
- ###### Reversing an Array
- ###### A List
- ###### Deep Comparison
