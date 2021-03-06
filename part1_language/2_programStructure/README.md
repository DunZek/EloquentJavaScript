# Chapter 2: Program Structure
> Constructing basic programs from the suite of expressions explored last chapter

### Notes
- ###### Expressions and Statements
    - Expressions are code elements that produce value.
        - Statements are complete components that expressions amount to.
            - Programs are simply lists of these statements.
    - The rules for omitting semicolons are complex and error-prone. It is best first to learn about the subtleties of missing semicolons.
        - `1;`
        - `!false`
        - (*more information:* [Semicolons in JavaScript](https://flaviocopes.com/javascript-automatic-semicolon-insertion/>))
- ###### Bindings
    - redefining bindings
        - `let mood = "light"`
        - `mood = "dark"`
    - `let one = 1, two = 2` - multiple declarations
    - `var name = "Ayda"` - `var` is different from `let`. Also, use `let` over `var`.
    - `const greeting = "Hello"` - `const` holds constant values
    - **Binding Names**
        - Names must not start with digits.
        - Names my include `$` or `_` but no other special characters.
        - Special keywords may not be used as binding names, nor may the number of words reserved for use in later future versions of JavaScript.
- ###### The Environment
    - The collection of bindings and their values that exist in a given time.
    - The language standard entails that the environment is never empty, for there will always be pre-defined bindings.
    - Browser environments will always possess functions and bindings that will allow the program to interact with the browser, such as mouse and keyboard input.
- ###### Functions
    - `function` - the type that a lot of values in the default environment have, which is a piece of program wrapped in a value.
    - Functions are applied, invoked, or called to be utilized in a program.
    - Arguments are passed in to functions to provide bindings for their particular local environments.
    - ###### The `console.log` Function
        - A pre-defined object where the `log` property/method can be accessed in order to enable a programmer to debug their code better.
- ###### Return Values
    - The capability for `console.log` and other printing functions to be able to output text in the console or the browser is a side-effect.
    - Functions that do not produce side-effects, such as console output, are called pure functions, for such functions merely only return values during use.
- ###### Control Flow
    - The execution of program start goes from the top statement to the bottom one, as to how a story may be read from start to finish.
    - Particular functions may be used to control the flow of the program, such as prompts.
- ###### Conditional Execution
    - Conditional execution describes a control flow of the program where its execution is determined by conditions.
    - Keywords such as `if`, `else`, and `else if`, are used to define such blocks of code that may only execute when conditions are met. Boolean expressions and functions may be used to provide the conditional value.
- ###### While and Do loops
    - A form of program control flow to realize conditional execution based on the requirement to repeat a particular program numerous times as long as the condition is met.
    - `do` loops as opposed to normal `while` loops execute at least once, regardless of meeting conditions.
- ###### Indenting Code
    - Know, in JavaScript and most other languages at least, that line breaks and indentations are irrelevant to the computer. However, they are very important for human comprehension.
    - Know that computer programs are designed for human comprehension first and computer comprehension second.
- ###### For loops
    - A form of program control flow to realize conditional execution based on the requirement to repeat a particular program numerous times until the condition is met.
    - `for (let initializer; condition != false ; incrementer++)`
    - **Breaking Out of a loop**
        - use the `break` statement to break out of loops entirely
        - use the `continue` statement to skip the rest of the code block when encountered
- ###### Updating Bindings Succinctly
    - Over the course of the program, bindings may need to update their values.
    - The assignment operator is used to do this. Incrementing is an example of such a circumstance:
        - `counter = counter + 1`
        - `counter += 1` - shortcut
        - `counter++` - increment shortcut
- ###### Dispatching on a value with switch
    - A chain of control flows may be replaced from using the `if` and `else` statements to the `switch` statement.
    - The JavaScript syntax for `switch` is inherited from the C/Java line of programming languages. It is somewhat awkward to use, and it may be best to just stick to the `if` and `else` statements.
- ###### Code Etiquette
    - ###### Capitalization
        - Bindings may not contain spaces.
        - Programmers use `camelCase` convention to name long binding names.
        - The first letters of particular bindings may be capitalized to denote them as constructor functions.
    - ###### Comments
        - Comments are used by programmers for programmers, for whatever reason text must be used to communicate something in the source code file.
        - `// single line comment`
        - `/* multi-line comment */`
---
### Exercises
- ###### Looping A Triangle
    - ```javascript
      // Expected output:
      // #
      // ##
      // ###
      // ####
      // #####
      // ######
      // #######
      // Use a for loop to simultaneously use and reuse a binding and to print it.
      for (let octothorp = "#"; octothorp.length <= 7; octothorp += "#") console.log(octothorp)
      ```
- ###### FizzBuzz
    - ```javascript
      // Use an empty string to output the result for each turn
      // Use FizzBuzz control flow to decide result
      for (let i = 1; i <= 100; i++) {
          output = ""
          if (i % 3 == 0) output += "Fizz"
          if (i % 5 == 0) output += "Buzz"
          console.log(`${i}: ${output}`)
      }
      ```
- ###### Chessboard
    - ```javascript
      // Use an empty string to print as the board
      // Use a for loop to write to that string
      // Nest that for loop in another for loop to control flow and build the board
      let size = 9
      let board = ""
      for (let y = 1; y <= size; y++) {
          for (let x = 1; x <= size; x++) {
              if ((x + y) % 2 == 0) {
                  board += " "
              } else {
                  board += "#"
              }
          }
          board += "\n"
      }
      console.log(board)
      ```
