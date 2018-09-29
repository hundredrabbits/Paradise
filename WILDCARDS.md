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

### Equal

Tests values to see if they are equal.

- `@(equal 1 1)`, true.
- `@(equal "blue" "red")`, false.

### If

The 'if' method allows to do basic logic tests, it basically does '@(if a b c)', or if a then b, else c.

- `@(if 1 "yes" "no")` will print `yes`.
- `The vessel @(if (equal (vessel parent "name") "house") "is a house" "is not a house")`, will print `is a house`, if parent vessel is a house.

### Random

The random wildcard picks a random items.

- `Your favourite color is @(random "cyan" "magenta" "yellow")`
- `You rolled a @(random 1 2 3 4 5 6).`

## Strings

### lc

Transform a string to lowercase.

- `@(lc (vessel parent "name"))`, will make the parent name lowercaase.

### cc

Transform a string to lowercase.

- `@(cc "hello")`, will print `Hello`.

### uc

Transform a string to lowercase.

- `@(uc "hello")`, will print `HELLO`.

### format

Transform a string into an action.

- `@(format "take")`, will print a clickable `take` trigger.
- `@(format "learn" "learn to move")`, will print a clickable `take` trigger.

## Vessel

The vessel wildcard is the most commonly used wildcard, it allows to get a vessel data by its ID.

- `You see @(vessel 0).`
- `In the beginning, there was the @(vessel 0 "name").`
- `You are the @(vessel self "name").`
- `You are inside the @(vessel parent "name").`

## Programming

The programming wildcards are used with [triggers and programs](TUTORIALS.md).

- `trigger say You said "@(query)" to vessel #@(responder).`

## Benchmark

```
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

yes=@(if 1 "yes" "no")--
no=@(if 0 "yes" "no")--
true=@(equal 1 1)--
false=@(equal "blue" "red")--

ghost=@(lc (vessel 0 "name"))--
Ghost=@(cc (vessel 0 "name"))--
GHOST=@(uc (vessel 0 "name"))--

false=@(carry self "axe")

@(if (equal query "hello") "yes" "no")
```

