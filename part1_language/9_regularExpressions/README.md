# Chapter 9: Regular Expressions

### Notes
- Technology also undergoes a naturally-selective process. Regular expressions are such tools that have prevailed today. They are powerful tools used to describe patterns in strings,
    - They form a small, separate language part of JavaScript and many other languages and systems.
    - They are terribly awkward due to their cryptic syntax (and in JavaScript specifically, because it is provided with a clumsy interface).
    - Nevertheless, they are extremely powerful tools inspecting and processing strings.
    - EVERY programmer must learn Regular Expressions.
- ###### Creating A Regular Expression
    - Regular expressions are a type of object in JavaScript which can be created using:
        - `let regex = new RegExp("abc")` - the `RegExp()` constructor
        - `regex = /abc/` - as a literal value by enclosing a pattern with forwarded slashes
        - `let eighteenPlus = /eighteen+/` - special characters must be escaped if they are to be defined as part of the desired pattern
- ###### Testing For Matches
    - Regular expression objects have a number of methods, the `.test()` method of which return `true` or `false` whether an expression is matched in the given string
        - ```js
        // A match
        /abc/.test("abcde")  // true
        // No match - demonstrating pattern contiguity
        /abc/.test("abdce")  // false
        // No match - due to incompleteness
        /abc/.test("abxde")  // false
        ```
- ###### Sets of Characters
    - Square brackets `[]` can provide a set of characters used to match a string against:
        - ```js
        /[abc]/.test("xyza")
        // `true` as the `a` character in the given string matched
        // within the set of characters specified in the expression
        ```
    - A hyphen `-` between two characters, ordered within the Unicode standard, can be used to indicate a range of characters within the `[]`:
        - ```js
        // Specifying a specific set
        /[0123456789]/.test("in 1992")  // true
        // Specifying a range
        /[0-9]/.test("1 + 1 = 2")  // true, codes 48 to 57

        // Matching a letter and a number
        /[A-Za-z][0-9]/.test("A 1")  // false
        /[A-Za-z][0-9]/.test("A1")  // true
        ```
    - Common groups of characters can be specified using built-in shortcuts in regular expressions:
        - List of common built-in shortcuts:
            - `\d` - "any digit character"
            - `\w` - "any alphanumeric character"
            - `\s` - "any whitespace character" (space, tab, newline, etc.)
        - Alternatively:
            - `\D` - "any non-digit character"
            - `\W` - "any non-alphanumeric character"
            - `\S` - "any non-whitespace character"
            - `.` - "any character except for newline" (`\n`)
        - ```js
        // Using common group built-in shortcuts
        let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/  // "mm-dd-yyyy hh-mm"
        dateTime.test("01-30-2003 15:20")  // true
        dateTime.test("30-jan-2003 15:20")  // false

        // Note: special characters may lose their meanings when placed within a set "[]"
        /[+.-]/.test('.')  // true
        ```
    - When specifying a set using `[]`, the caret `^` can be used to invert selection: to match any pattern *except* the specified.
        - ```js
        // Match for all except 0s and 1s
        let notBinary = /[^01]/
        notBinary.test("1101100011")  // false
        notBinary.test("1101102011")  // true
        // Match for all except Latin characters
        let notLatin = /[^A-Za-z]/
        notLatin.test("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")  // false
        notLatin.test("^") // true
        ```
- ###### Repeating Parts of A Pattern
    - 
- ###### Grouping Subexpressions
- ###### Matches And Groups
- ###### The Date Class
- ###### Word And String Boundaries
- ###### Choice Patterns
- ###### The Mechanics of Matching
- ###### Backtracking
- ###### The Replace Method
- ###### Greed
- ###### Dynamically Creating `RegExp` Objects
- ###### The Search Method
- ###### The `LastIndex` Property
- ###### Looping Over Matches
- ###### Parsing an INI File
- ###### International Characters

---
### Exercises
- ######
