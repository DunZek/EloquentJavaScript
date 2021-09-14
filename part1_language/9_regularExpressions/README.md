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
    - Putting a plus sign `+` after a pattern in a regular expression indicated that an element may be repeated more than once:
        - ```js
        /'\d+'/.test("'123'")  // true
        /'\d+'/.test("''")  // false
        ```
    - Putting an asterisk `*` in particular specifies the total optionality of its existence:
        - ```js
        /'\d*'/.test("'123'")  // true
        /'\d*'/.test("''")  // true
        /abc*/.test("abdeabxde")  // true, "ab" exists
        /abc*/.test("wxyz")  // false, "ab" does not exist
        /c*/.test("wxyz")  // true, doesn't matter if "c" exists
        ```
    - Putting a question mark `?` specifies the optionality of the particular character:
        - ```js
        let neighbor = /neighbou?r/
        neighbor.test("neighbour")  // true
        neighbor.test("neighbor")  // true
        ```
    - Braces `{}` are used to indicate the precise number to match
        - ```js
        // Datetime
        let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/
        dateTime.test("1-30-2003 8:45")  // true
        // The former is functionally the same as the latter
        /a{5}/.test('aaaaa')  // true
        /aaaaa/.test('aaaaa')  // true
        // At least 5, and more
        /a{5,}/.test("aabbcccaaaa")  //true
        ```
- ###### Grouping Subexpressions
    - Use parentheses `()` to indicate an entire pattern or to use more than one operator. The parts of the regular expressions enclosed in parentheses indicate the part to be a single element (as far as operators following it are concerned):
        - ```js
        // Demonstration
        /a(b)(c)/.exec("abc")  // ['abc', 'b', 'c']
        // Compound
        let cartoonCrying = /boo+(hoo+)+/i  // "i" specifies case-insensitivity
        cartoonCrying.test("Boohoooohoohooo")  // true
        ```
- ###### Matches And Groups
    - The `.exec()` method will return `null` if no match is found, else it will return an object containing information about the match:
        - where the first element is the first pattern matched by the expression,
        - where the whole match *is* the first match when using grouping subexpressions,
        - where the next strings will be the parts matched by sequential subexpression groups.
        - ```js
        // Demonstration
        let regex = /\d+/.exec("one two 100")
        console.log(match)  // ["100", index: 8, input: "one two 100", groups: undefined]
        console.log(match.index)  // 8 <- index where the pattern was matched in the string
        // Compound - using parentheses
        let quotedText = /"([^"]*)"/
        quotedText.exec('she said "hello"')  // ['"hello"', 'hello', index: 9, input: 'she said "hello"', groups: undefined]
        ```
    - The `.match()` method is similar, but is a string method instead and takes in a RegExp object, returning the same object as the `.exec()` RegExp counterpart:
        - ```js
        // Demonstration
        "one two 100".match(/\d+/)  // ["100", index: 8, input: "one two 100", groups: undefined]
        // Compound - parentheses and repeating patterns
        "badly".exec(/bad(ly)?/)  // ["badly", "ly", index: 0, input: "badly", groups: undefined]
        "bad".exec(/bad(ly)?/)  // ["bad", undefined, index: 0, input: "bad", groups: undefined]
        ```
- ###### The Date Class
    - JavaScript has a standard class for representing dates using the `Date()` constructor:
        - Getting the current date and time by simply instantiating a Date object:
            - ```js
            new Date()  // "2021-09-12T19:55:34.191Z" as of writing
            ```
        - Instantiating a Date object using a particular date:
            - ```js
            // (year, month, day, hours, minutes, seconds, milliseconds)
            new Date(2009, 10, 3)  // 2009-11-03T07:00:00.000Z
            // Note: "month" is zero-based
            // why? -> https://stackoverflow.com/a/41992352/13973029
            ```
        - Using timestamps, stored in milliseconds, elapsed since the Unix epoch (UTC):
            - ```js
            // Using .getTime() to obtain timestamp
            new Date(2013, 11, 19).getTime()  // 1387436400000
            new Date(1387436400000)  // 2013-12-19T07:00:00.000Z
            // Using negative values to specify the timestamp back in time:
            new Date(-1387436400000)  // 1926-01-13T17:01:40.000Z
            ```
        - Different ways of retrieving the current timestamp
            - ```js
            // either this obvious one
            new Date().getTime()
            // or by using the .now() static method
            Date.now()
            ```
        - Then there are various object methods
            - ```js
            // As of time of writing:
            new Date().getFullYear()  // 2021
            new Date().getMonth()  // 8 (zero-based)
            new Date().getDate()  // 12
            new Date().getHours()  // 14
            new Date().getMinutes()  // 20
            new Date().getSeconds()  // 32
            // Then there's this very peculiar one, which returns the subtraction of 1900 from the current year:
            new Date().getYear()  // 121
            // It is utterly useless. Don't ever use it.
            ```
    - Here's an example of using RegExp objects to create Date objects
        - ```js
        function getDate(string) {
            let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string)
            return new Date(year, month, day)
        }
        console.log(getDate("1-30-2003"))  // 2003-03-02T07:00:00.000Z
        ```
- ###### Word And String Boundaries
    - Specify the expression to match a pattern where the whole string starts with a particular character using caret `^`:
        - ```js
        /^!/.test("!hello")  // true
        /^0/.test('0xff')  // true
        ```
    - Specify the expression to match a pattern where the whole string ends with a particular character using dollar-sign `$`:
        - ```js
        /!$/.test("Hello World!")  // true
        /!$/.test("Hello! World")  // false
        ```
    - Using a combination of the two, specify the expression to match a pattern where the whole string *is* the pattern:
        - ```js
        // Matching if the whole string is just one 'a' character
        /^a$/.test("a")  // true
        /^a$/.test("aa")  // false

        // Matching if the entire string is just numbers
        /^\d+$/.test("1234")  // true
        /^\d+$/.test("1234_")  // false

        // Matching if the entire string is empty
        /^$/.test("")  // true
        /^$/.test(" ")  // false
        ```
    - Note, alone, the `^` and the `$` causes the expression to match any pattern in the string:
        - ```js
        /^/.test(undefined)  // true
        /$/.test()  // true
        ```
    - Note, misplacing the `^` and the `$` causes the expression to not match any pattern in the string:
        - ```js
        /hello^/.test("hello")  // false
        /$hello/.test("hello")  // false
        /$^/.test()  // false
        ```
    - Specify the expression to match a pattern with boundaries in the string using `\b`:
        - ```js
        // No boundaries
        /cat/.test("concatenate")  // true
        /\bcat\b/.test("concatenate")  // false
        // Boundaries
        /\bcat\b/.test("con cat enate")  // true
        /\bcat\b/.test("con-cat-enate")  // true
        /\bcat\b/.test("cat")  // true
        ```
- ###### Choice Patterns
    - Specify an expression to match a pattern with choices using the pipe `|`:
        - ```js
        // Demonstration
        /apple|banana|orange/.test("orange")  // true
        // Note: know that the pipe '|' specifies a choice between the left pattern or the right pattern:
        /apple/banana|/.test("orange")  // true
        /apple/banana|/.exec("orange")  // ['', index: 0, input: "orange", groups: undefined]
        ```
    - Using parentheses `()` to group subexpressions in conjunction with the pipe `|` turns out to be very useful:
        - ```js
        let animalCount = /\d+ (pig|cow|chicken)s?/
        animalCount.test("15 pigs")  // true        animalCount.test("1 chicken")  // true
        animalCount.test("5 pigchickens")  // false
        ```
- ###### The Mechanics of Matching
    - Regular expressions search patterns starting from the first character of the string up to the end.
    - Regular expressions are matched when every single one of its elements and patterns are matched within the given string.
    - The first match is always returned.
- ###### Backtracking
    - Backtracking is a process in matching regular expressions when more than one possible kind of pattern may be matched to.
    - Here's an example of the regex engine backtracking caused by choice patterns:
        - ```js
        // Match for either a binary, hex, or decimal number
        let regex = /\b([01]+b|[\da-f]+h|\d+)\b/
        regex.exec("0101b 306")  // backtracks from decimal to binary
        // Switched binary and decimal places
        regex = /\b(\d+|[\da-f]+h|[01]+b)\b/
        regex.exec("0101b 306") //
        ```
- ###### The Replace Method
    -
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
