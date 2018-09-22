## Tutorials

### Casting 
Casting is a form of puppeteering, making a visible vessel act in your stead.

```
create a blue spell &
enter the blue spell &
program transform into a fish &
leave &
create a cat &
take the blue spell &
cast the blue spell on the cat
```

### Dialog Engine

This example demonstrates how to create a vessel with enabled dialog tools.

```
create a character &
enter the character &
trigger say You said "@query".  &
leave &
say hello
```

### Wildcards

```
create a dice & 
enter the dice & 
program look & 
trigger roll You rolled @random(1 2 3 4 5 6). & 
leave & 
roll the dice
```

### Random Warp
This example demonstrates how to use a wildcard in a program.

```
create a random warp &
enter the random warp &
program warp in @__random &
leave &
use the random warp
```

### Discard Spell
This spell can be fired at unwanted vessels, sending them into a vessel discard bin, to be recycled later.  

```
create a recycling bin & 
create a discard spell & 
enter the discard spell & 
program warp to the recycling bin & 
leave & 
take the discard spell & 
cast the discard spell on the unwanted vessel
```

### Append Spell

```
create a typewriter &
enter the typewriter &
program note @_note @query &
trigger type You typed "@query". &
leave &
use the typewriter
```

### A pocket watch

```
create a clock &
enter the clock &
trigger passive @time &
leave &
take the clock
```

### RPS

```
trigger play You played @query, the @responder played @random(rock paper scissors).
```

### Query/Responder

```
I am the @vessel(@responder name)(#@responder).
```