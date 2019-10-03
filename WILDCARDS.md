# WildcardLISP

The wildcardLISP is a collection of tools to create more [dynamic vessels](TUTORIALS.md), using a tiny implementation of LISP. You can see the specs [here](./desktop/server/core/wildcard.js). The goal is to allow for more complex behaviours, the WildcardLISP project is part of the [ParadiseOS](https://github.com/neauoire/ParadiseOS) targets.

## Sights

### Self

- `Your id is @(self)`, to get your vessel id.

### Parent

- `Your parent vessel is @(parent)`, to get your parent id.

### Stem

- `You are in the @(stem) paradox`, to get the stem id.

## Logic

### equal

Tests values to see if they are equal. Returns `"true"` if yes, `nil` if no.

- `@(equal 1 1)`, true.
- `@(equal "blue" "red")`, false.

### if

The 'if' method allows to do basic logic tests, it basically does '@(if a b c)', or if a then b, else c. The 'truth' of a is judjed on whether it is not `nil`.

- `@(if "true" "yes" "no")` will print `yes`.
- `@(if nil "yes" "no")` will print `no`.
- `The vessel @(if (equal (vessel parent "name") "house") "is a house" "is not a house")`, will print `is a house`, if parent vessel is a house.

### and

Returns the first non-`nil` value it is given if all values are non-`nil`. If one or more values are `nil`, it returns `nil`.

- `@(and "true" "teapot" "yes")`, will print `yes`.
- `@(and "true" nil "yes")`, will print `nil`.

### or

Returns the first non-`nil` value it is given, or `nil` if all values are `nil`.

- `@(or "true" "yes" "teapot")`, will print `true`.
- `@(or nil "true" nil)`, will print `true`.
- `@(or nil nil nil)`, will print `nil`.

## Mathematics

### Basic Arithmetic

-   `add a b c ...`, adds numbers.
-   `sub a b`, subtracts b from a (a - b).
-   `mult a b c ...`, multiplies numbers.
-   `div a b`, divides a by b.
-   `pow a b`, returns a to the power of b (a ** b).
-   `inc a`, returns a + 1.
-   `dec a`, returns a - 1.

## random

The random wildcard picks a random items.

-   `Your favourite color is @(random "cyan" "magenta" "yellow")`
-   `You rolled a @(random 1 2 3 4 5 6).`

## Strings

### concat

Concatenate strings with a separator.

-   `@(concat " " "Hello" "World")`, will print "Hello World"
-   `@(concat "" "a" "b")`, will print "ab"

### lc

Transform a string to lowercase.

-   `@(lc (vessel parent "name"))`, will make the parent name lowercase.
-   `@(lc "Hello WORLD")`, will print `hello world`

### cc

Transform a string to sentence case.

-   `@(cc "hello world")`, will print `Hello world`.

### uc

Transform a string to lowercase.

-   `@(uc "hello world")`, will print `HELLO WORLD`.

### tc

Transform a string to title case.

-   `@(uc "hello world")`, will print `Hello World`

### format

Transform a string into an action.

-   `@(format "take")`, will print a clickable `take` trigger.
-   `@(format "learn" "learn to move")`, will print a clickable `learn` trigger.

## vessel

The vessel wildcard is the most commonly used wildcard, it allows to get a vessel data by its ID.

-   `You see @(vessel 0).`
-   `In the beginning, there was the @(vessel 0 "name").`
-   `You are the @(vessel self "name").`
-   `You are inside the @(vessel parent "name").`

## Programming

The programming wildcards are used with [triggers and programs](TUTORIALS.md).

-   `trigger say You said "@(query)" to vessel #@(responder).`

### query

The query passed to `trigger`

### responder

The vessel that responded to `trigger`

## Errors

### success

Whether or not the previous command succeeded.

    create
    echo @(success)

Because `create` failed, the output is `false`.

    create teapot
    echo @(success)

Because `create teapot` succeeded, the output is `true`.

### error

The technical name of the error output by the previous command.

    create
    echo @(error)

Because `create` failed due to a lack of parameters, the output is `NOPARAM`.

    create teapot
    echo @(error)

Because `create teapot` succeeded, the output is `none` - note the lowercase.

## Benchmark

    6=@(add 3 3)--
    0=@(self)--
    1=@(parent)--
    1=@(stem)--

    a ghost=@(vessel 0)--
    ghost=@(vessel 0 "name")--
    ghost=@(vessel self "name")--
    the ceramic library=@(vessel parent)--

    random_word=@(random "cyan" "magenta" "yellow")--
    random_number=@(random 1 2 3 4 5 6)--

    yes=@(if "true" "yes" "no")--
    no=@(if nil "yes" "no")--
    true=@(equal 1 1)--
    nil=@(equal "blue" "red")--

    ghost=@(lc (vessel 0 "name"))--
    Ghost=@(cc (vessel 0 "name"))--
    GHOST=@(uc (vessel 0 "name"))--
    Ghost=@(tc (vessel 0 "name"))

    nil=@(carry self "axe")

    @(if (equal query "hello") "yes" "no")
