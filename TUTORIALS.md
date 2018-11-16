## Tutorials

## Templating

-   `&`, to do multiple queries at once.
-   `&&`, to make a program do multiple queries at once.
-   `--`, to add a linebreak in a note.
-   `@()`, to embed WildcardLISP

The `echo` command is very useful when testing wildcards.

## Triggers

Triggers are highly useful for applications such as dialog, feedback, and meaningful error handling. They are applied through the `trigger name response` syntax.

### Dialog Engine

This example demonstrates how to create a vessel with enabled dialog tools.

    create a character &
    enter the character &
    trigger say You said "@(query)". &
    leave &
    say hello

Copyable:
`create a character & enter the character & trigger say You said "@(query)". & leave & say hello`

### Dice

This example demonstrates how to embed wildcards in triggers.

    create a die &
    enter the die &
    trigger roll You rolled @( random 1 2 3 4 5 6 ). &
    leave &
    roll the die

Copyable:
`create a die & enter the die & trigger roll You rolled @( random 1 2 3 4 5 6 ). & leave & roll the die`

### A pocket watch

A pocket watch that tells you the time. It is currently broken due to the lack of a `time` wildcard.

    create a clock &
    enter the clock &
    trigger passive @(time) &
    leave &
    take the clock

Copyable:
`create a clock & enter the clock & trigger passive @(time) & leave & take the clock`

### RPS

A rock-paper-scissors machine.

    create a machine &
    enter the machine &
    trigger play You played @(query), the @(responder) played @(random rock paper scissors). &
    leave &
    play rock

Copyable:
`create a machine & enter the machine & trigger play You played @(query), the @(responder) played @(random rock paper scissors). & leave & play rock`

### Query/Responder

A vessel that tells you who it is, and what its ID is.

    create a machine &
    enter the machine &
    trigger greet I am the @(vessel ( responder name ) )(#@(responder)). &
    leave &
    greet the machine

Copyable:
`create a machine & enter the machine & trigger greet I am the @(vessel ( responder name ) )(#@(responder)). & leave & greet the machine`

## Programs

Programs allow for interactive objects that can act when you use them.

### Random Warp

This example demonstrates how to use a wildcard in a program. The `__random` wildcard does not function at this point.

    create a random warp &
    enter the random warp &
    program warp in @(__random) &
    leave &
    use the random warp

Copyable:
`create a random warp & enter the random warp & program warp in @__random & leave & use the random warp`

## Casting

Casting is a form of puppeteering, making a visible vessel act in your stead.

    create a blue spell &
    enter the blue spell &
    program transform into a fish &
    leave &
    create a cat &
    take the blue spell &
    cast the blue spell on the cat

### Fish Spell

This spell transforms vessels into fish.

Copyable:
`create a blue spell & enter the blue spell & program transform into a fish & leave & create a cat & take the blue spell & cast the blue spell on the cat`

### Discard Spell

This spell can be fired at unwanted vessels, sending them into a vessel discard bin, to be recycled later.

    create a recycling bin &
    create a discard spell &
    enter the discard spell &
    program warp in the recycling bin &
    leave &
    create a paper ball &
    take the discard spell &
    cast the discard spell on the paper ball

Copyable:
`create a recycling bin & create a discard spell & enter the discard spell & program warp in the recycling bin & leave & create a paper ball & take the discard spell & cast the discard spell on the paper ball`

## Advanced Applications

### A Typewriter

This program demonstrates the ability to append text to a note. It is currently broken because of changes in how `use` works.

    create a typewriter &
    enter the typewriter &
    program note @_note @(query) &
    trigger type You typed "@(query)". &
    leave &
    use the typewriter

Copyable:
`create a typewriter & enter the typewriter & program note @_note @(query) & trigger type You typed "@(query)". & leave & use the typewriter`

### A Coffee Machine

A coffee machine using the `error` wildcard. It fills empty mugs, and tells you if it can't. Bonus points if you make a mug that empties when you `use` it.

    create a coffee machine &
    enter the coffee machine &
    program transform a mug into a coffee mug &
    trigger use @( if success "You fill the mug with coffee." ( if ( equal error "NOCHANGE" ) "The mug is already full." "There is no mug to fill." ) ) &
    leave &
    create empty mug &
    use coffee machine

Copyable:
`create a coffee machine & enter the coffee machine & program transform a mug into a coffee mug & trigger use @( if success "You fill the mug with coffee." ( if ( equal error "NOCHANGE" ) "The mug is already full." "There is no mug to fill." ) ) & leave & create empty mug & use coffee machine`
