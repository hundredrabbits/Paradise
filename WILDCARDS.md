## WildcardLISP

The wildcardLISP is a collection of tools to create more dynamic vessels, using the LISP formatting. You can see the implementation [here](./desktop/server/core/wildcard.js).

### Self/Parent/Stem

- `Your id is @(self)`, to get your vessel id.
- `Your parent vessel is @(parent)`, to get your parent id.
- `You are in the @(stem) paradox`, to get the stem id.

### Vessel

The vessel wildcard is the most commonly used wildcard, it allows to get a vessel data by its ID.

- `In the beginning, there was the @(vessel 0 "name").`
- `You are the @(vessel self "name").`
- `You are inside the @(vessel parent "name").`

### If

The 'if' method allows to do basic logic tests, it basically does '@(if a b c)', or if a then b, else c.

- `The vessel @(if (equal (vessel parent "name") "house") "is a house" "is not a house")`

### Random

The random wildcard picks a random items.

- `Your favourite color is @(random "cyan" "magenta" "yellow")`
- `You rolled a @(random 1 2 3 4 5 6).`

### Equal

Tests values to see if they are equal.

- `@(equal 1 1 1)`, true.
- `@(equal "blue" "blue" "red")`, false.

### lc/cc/uc

To transform a value to an uppercased, lowercased or capitalized string, use the 'lc', 'cc' and 'uc' functions.

- `@(uc (vessel parent "name"))`