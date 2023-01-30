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
          let cartoonCrying = /boo+(hoo+)+/i  // "i" specifies case insensitivity
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
          regex.exec("0101b 306") // back tracks from decimal to binary
          ```
    - Backtracking caused by repetition operators:
        - ```js
          /^.*x/.exec("abcxe")  // backtracking occurs until "abc" is found where an "x" occurs after "abc"
          // ^^ The final positions where the match is found then occurs from index 0 to index 4
          ```
    - Accidental backtracking
        - ```js
          // a binary - number regular expression that improperly uses repetition operators
          /([01]+)+b/.exec("10010100010010011001101010101b")  // here, double the work is done than otherwise
          ```
- ###### The Replace Method
    - Strings possess a `replace()` method used for replacing parts of a string with other strings
    - Replacing the first character instance with a different character
        - ```js
          "papa".replace('p', "m")  // mapa
          ```
    - Using regular expressions
        - ```js
          // Only the first instance
          "Borobudur".replace(/[ou]/, "a")  // Barobudur
          ```
        - ```js
          // Every instance specified with 'g' suffix
          "Borobudur".replace(/[ou]/g, "a")  // Barabadar
          ```
        - Only with use of regular expressions can we replace multiple instances of the given string part that we want.
    - Using matched groups to switch pairs of match groups
        - ```js
          // Behold, the true power of regular expressions
          let lastFirst = "Liskov, Barbara" + "\n" + "McCarthy, John" + "\n" + "Wadler, Philip"
          let firstLast = lastFirst.replace(/(\w+), (\w+)/g, "$2 $1")
          // $2 and $1 are bindings of matched groups.
          // $& can be used to refer to the whole
          ```
    - Using a predicate function over a string to process matched arguments
        - ```js
          "the cia and fbi".replace(/\b(cia|fbi)\b/, str => str.toUpperCase())  // the CIA and FBI
          // str refers to the groups matched by the regular expression from the string
          ```
    - Using a more complicated predicate function
        - ```js
          // Our given string
          let stock = "1 lemon, 2 cabbages, and 101 eggs"
          // ("entire regex match", "group 1 match", "group 2 match")
          function minusOne(match, amount, unit) {
              amount -= 1  // process
              if (amount == 0) amount = "no"  // replace with "no"
              if (amount == 1) unit = unit.slice(0, unit.length - 1)  // remove plural suffix
              return `${amount} ${unit}`
          }
          stock.replace(/(\d+) (\w+)/g, minusOne)  // "no lemon, 1 cabbage, and 100 eggs"
          ```
- ###### Greed
    - We describe repetition operators ("+", "*", "?", and {}) to be greedy. This is because repetition operators will match as mange characters as possible before backtracking.
    - To turn repetition operators and make them lazy, suffix them with a question mark ("+?", "*?", "??", "{}?"), causing repetition operators to match as least many characters as possible before backtracking.
    - **This causes the regular expression to match more only if the least possible match is invalid**.
    - A comment that strips comments out of code passed in as strings
        - ```js
          function stripComments(code) { return code.replace(/\/\/.*|\/\/*[^]*\*\//g), "") }
          // [^] = "any character that isn't part of the empty set of characters"
          // that symbol is used instead of periods because the latter do not match with new-line characters, however we still want to match with comment blocks
          stripComments("1 + /* 2 */3")  // 1 + 3
          stripComments("x + 1;// ten !")  // x + 1;
          stripComments("1 /* a */+/* b */ 1")  // 1   1
          // ^^ the engine is greedy by default, and thus first looked to match the entire string, thus matching the first /* with the second */, eliminating "+"
          ```
    - Fixing the previous regular expression by using lazy operators instead of greedy ones
        - ```js
          function stripComments(code) { return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "") }
          stripComments("1 /* a */+/* b */ 2")  // 1 + 1 <- here, both /* a */ and /* b */ are matched
          ```
- ###### Dynamically Creating `RegExp` Objects
    - There are cases when you might not know the exact pattern you need to match against when writing your code.
    - Dynamically matching with normal names
        - ```js
          let name = "Harry"
          let text = "Harry is a suspicious character"
          let regexp = new RegExp(`\\b(${name})\\b`, "gi")
          // second argument contains arguments for regular expression. In this case, "gi" = "global and insensitive case"
          // Remember to escape the slash that belongs to the bounding character when the regexp is expressed in a string.
          text.replace(regexp, "_$1_")  // _Harry_ is a suspicious character
          ```
    - Dynamically matching with weird strings
        - ```js
          // This will consequentially nonsensically evaluate the regular expression it is passed into
          name = "dea+hl[]rd"
          // And so, we'll use backslashes to escape any special character in a given string of input
          let nameEscaped = name.replace(/[\\[.+*?(){|^$]/g, "\\$&")
          regexp = new RegExp(`\\b${nameEscaped}\\b`, "gi")
          text = "This dea+hl[]rd guy is really annoying."
          text.replace(regexp, "_$&_")  // "This _dea+hl[]rd_ guy is really annoying"
          ```
- ###### The Search Method
    - The `indexOf()` method of strings cannot be used with regular expressions, and so we have an analog.
    - The `search()` method returns the index of the first pattern matched by the expression, otherwise `-1` if not found
    - Unlike `indexOf()` however we cannot indicate the starting index/offset to begin the search
    - ```js
      "  word".search(/\S/)  // 2 -> match what that isn't whitespace
      "    ".search(/\S/)  // -1 -> it's all whitespace, so -1 is returned as no match is found
      ```
- ###### The `LastIndex` Property
    - <i>"because confusion is an essential feature of JavaScript's regular-expression interface"</i>
    - Similarly, the `exec()` method also does not provide a way to indicate the offset of the search.
    - So, we're going to have to be inventive by using the properties of regular expression in JavaScript.
        - `RegExp.source`: contains the string the expression was created from
        - `RegExp.LastIndex`: controls, in limited circumstances, where the next match will start
            - these limited circumstances are when the expression has the global "g" or sticky "y" option passed in.
            - furthermore, the matching must happen with the `exec()` method and not other.
    - Be careful of how sticky and global regular expressions work, global options in particular as well.
        - Use the global property only when necessary:
            - when replacing parts of strings matched by a given pattern with `String.replace(RegExp, String)`
            - when explicitly using the `lastIndex` property to control the offset of where regex matching should begin in a given string.
    - *Remeber that the `lastIndex` property requires the use of the `exec()` method and the global "g" option in the given regular expression.*
    - The `lastIndex` property:
        - ```js
          // Matching for "y" with global option set
          let pattern = /y/g
          // It is a public property, so you can edit it if you want
          pattern.lastIndex = 0
          match = pattern.exec("xyzzy")
          // The index at which the matched pattern occurred in the given string.
          match.index == 4  // true
          // Successful matches update the lastIndex property accordingly to after the character, else is set to 0
          pattern.lastIndex == 5  // true
          ```
    - Demonstrating the difference between the global `g` and the sticky `y`:
        - ```js
          // Global searches for a match ahead of the lastIndex
          let globalExp = /abc/g
          globalExp.exp("xyz abc")  // ['abc', ...]
          // Sticky will only match successfully for patterns occuring at the lastIndex
          let stickyExp = /abc/y
          stickyExp.exec("xyz abc")  // null
          // Since the lastINdex starts at 0 upon construction, then a match will occur
          stickyExp.exec("abc")  // ['abc', ...]
          ```
    - Demonstrating an effect of invoking the same global regular expression
        - ```js
          let digit = /\d/g
          // lastIndex gets updated for the current match
          digit.exec("here it is: 1")  // ['1']
          // and thus, because it falls behind the lastIndex value
          digit.exec("and now: 1")  // null
          ```
    - Demonstrating how the global option can change the way the `String.match()` works
        - ```js
          // The global option enables String.match(RegExp) to return an array consisting of all matched patterns
          "Banana".match(/an/g)  // ['an', 'an']
          ```
- ###### Looping Over Matches
    - *scanning through all of the occurrences of a pattern in a given string*
    - Accessing the matched objects in a loop body
        - ```js
          let input = "A string with 3 numbers in it... 42 and 88."
          let numberExp = /\b\d+\b/g
          while (match = numberExp.exec(input)) console.log(`Found: ${match[0]} at index: ${match.index}`)
          ```
- ###### Parsing an INI File
    - *a common problem for using regular expressions*
    - The widely used format for the `.ini` file:
        - Blank lines and lines starting with semicolons are ignored:
        - Lines wrapped in `[` and `]` start a new section
        - Lines containing an alphanumeric identifier followed by an `=` character add a setting to the current section
        - Anything else is invalid
    - Task: "convert a stringified .ini file into a JavaScript object"
        - Split the file into separate lines.
        - ```js
          // Example function
          function parseINI(ini) {
              // Start with an object to hold the top-level fields
              let result = {}, section = {}
              ini.split(/\r?\n/).forEach(line => {
                  let match
                  if (match = line.match(/^(\w+)=(.*)$/)) section[match[1]] = match[2]
                  else if (match = line.match(/^\[(.*)\]$/)) section = result[match[1]] = {}
                  else if (!//) throw new Error (`Line '${line}' is not valid.`)
              })
          }
          // Strings instantiated via back-ticks retain new lines
          let file = `
          name=Vasilis
          [address]
          city=Tessaloniki
          [biology]
          type=Human
          `
          // Print results
          console.log(parseINI(file))
          // {name: 'Vasilis', address: }
          ```
- ###### International Characters
    - JavaScript/s regular expressions cannot support text outside of the English language due to JavaScript's simplistic implementations.
    - A word `(\w)` may consist of the following:
        - The 26 uppercase and lowercase characters of the Latin alphabet
        - Decimal digits
        - An underscore
    - Any character that do not match within the aforementioned will match with `\W` instead.
    - Whitespace `(\s)` however by strange historical accident do not have these limitations:
        - Matches to any whitespace character defined by Unicode standard.
        - Including the non-breaking space and the Mongolian vowel separator (what the).
    - Further issues are caused by the fact that regular expressions work on code units, not the characters themselves that the code represents.
        - This means that characters composed of two code units behave strangely.
    - Demonstrating JavaScript's strange regex implementation:
        - ```js
          /b{3}/.test("bbb")  // true
          /🍎{3}/.test("🍎🍎🍎")  // false
          // ^^ 🍎 is treated as two code units, yet the {3} applies only to the second
          /<.>/.test("<🌹>")  // false
          // ^^ The dot matches for a single code unit, not the two that make up 🌹
          /<.>/u.test("<🌹>")  // true
          // ^^ adding the "u" option at the end (for "Unicode") will solve these problems
          ```
    - Using `\p` in regular expressions to solve international character problems:
        - ```js
          // Use the {Property=Value} notation to match any character that has the value for the given property, else {Name} notation assumes binary or categories
          // You must have the "u" option enabled
          /\p{Script=Greek}/u.test("α")  // true
          /\p{Script=Arabic}/u.test("α")  // false
          /\p{Alphabetic}/u.test("α")  // true
          /\p{Alphabetic}/u.test("!")
          ```
- ###### Summary
    - Regular expressions are objects that represent patterns in strings.
        - They use their own language to represent these patterns.
    - `/abc/`    = a sequence of the characters "abc"
    - `/[abc]/`  = any character from the set of characters
    - `/[^abc]/` = any character NOT from the set of characters
    - `/[0-9]/`  = any character from the range of characters
    - `/x+/`     = one or more characters of the pattern "x"
    - `/x+?/`    = one or more characters (lazy)
    - `/x*/`    = zero or more occurrences
    - `/x?/`     = zero or one occurrence
    - `/x{2,4}/` = two to four occurrences
    - `/(abc)/`  = a group
    - `/a|b|c/`  = any one of several patterns
    - `/\d/`     = any digit character
    - `/\w/`     = any alphanumeric "word" character (Latin script + underscore)
    - `/\s/`     = any whitespace character (Unicode standard)
    - `/./`      = any character except newlines
    - `/\b/`     = a word boundary
    - `/^/`      = start of input
    - `/$/`      = end of input
    - JavaScript implements particular regular expression methods:
        - `RegExp.test(String)` -> returns true or false whether regex pattern is found in string
        - `RegExp.exec(String)` -> returns an array containing all matched groups and some other properties
        - `RegExp.exec(String).index` -> a property of aforementioned array that contains the index at which the pattern is found in the string
    - JavaScript implements particular string methods that utilize regular expressions:
        - `String.match(RegExp)` -> used to match against a regular expression
        - `String.search(RegExp)` -> searches for a pattern
        - `String.replace(RegExp, String)` -> replaces a portion of the string found by the regex pattern with another string
    - Regular expressions have options which are written after the closing forward slash
        - `i` -> make match-case insensitive
        - `g` -> make expression global (causes `String.replace()` to replace all instances)
        - `y` -> make expression sticky. Do not search ahead and skip part of the string when looking for a match
        - `u` -> Unicode mode. Used for international character problems
    - Regular expressions are both sharp and awkward tools. They can simplify a task and on the same token make complicated ones unmanageable.
    - Resist the urge to shoehorn things that cannot cleanly express themselves
---
### Exercises
- It is almost unavoidable that, in the course of working on these exercises, you will get confused and frustrated by some regular expression’s inexplicable behavior.
- Sometimes it helps to enter your expression into an online tool like https://debuggex.com to see whether its visualization corresponds to what you intended and to experiment with the way it responds to various input strings.
- ###### RegExp Golf
- ###### Quoting Style
- ###### Numbers Again
