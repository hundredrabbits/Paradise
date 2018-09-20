# Paradise

[Paradise](http://wiki.xxiivv.com/paradise) plays like a strange [interactive fiction novel](https://www.youtube.com/watch?v=9gmMVjHJ6cU), in an ever-changing world where you are not an avatar but a force acting upon places, and objects, and puns, words - moving around and into your other selves, threading through chaos. See also [Paradise OS](https://github.com/neauoire/ParadiseOS).

_“I have always imagined that Paradise will be a kind of library.”_ — Jorge Luis Borges

## Actions

There are 16 base actions, you can queue multiple actions using the `&` character, for example `create a teapot & enter the teapot`.

### Default

#### Learn
- `learn` See available actions.
- `learn to drop` See the documentation for the **drop** action.

### Basic

#### Create
- `create a ceramic teacup` Create a **new vessel**.

#### Become
- `become a teacup` Become a **visible vessel**.
- `become the red teacup` Become a **distant vessel**.

#### Enter
- `enter the teacup` Enter a **visible vessel**.

#### Leave
- `leave` Leave the current **parent vessel**.

### Advanced

#### Warp
- `warp to the red teacup` Warp to a **distant vessel**'s parent location.
- `warp in the yellow teacup` Warp in a **distant vessel**'s location.
- `warp to any teacup` Warp to a random **distant vessel**'s parent location.
- `warp in any teacup` Warp in a random **distant vessel**'s location.
- `warp anywhere` Warp in a random **distant vessel**'s location.

#### Take
- `take the red teacup` Move a **visible vessel** into your vessel.
- `take any teacup` Move a **visible vessel** into your vessel.
- `take anything` Move a random **visible vessel** into your vessel.

#### Drop
- `drop the red teacup` Move a **child vessel** into the **parent vessel**.
- `drop a teacup` Move a **child vessel** into the **parent vessel**.
- `drop any teacup` Move a random **child vessel** into the **parent vessel**.

#### Move
- `move the red teacup in the blue teacup` Move a **visible vessel** into another **visible vessel**.

### Narrative

#### Note
- `note It is raining. Again.` Add a note to the **parent vessel**.

#### Inspect
- `inspect the teacup` Inspect the target **visible vessel**.

#### Transform
- `transform into a teacup` Rename the **current vessel**.
- `transform the teacup into a cat` Rename a **visible vessel**.

#### Transmute
- `transmute into glass` Add an adjective to the **current vessel**.
- `transmute glass into gold` Add an adjective to a **visible vessel**.
- `transmute into anything` Remove an adjective to the **current vessel**.
- `transmute glass into anything` Remove an adjective to a **visible vessel**.

### Programming

#### Program
- `program warp to the library` Automate the **parent vessel**.
- `program` Remove the program of the **parent vessel**.

#### Use
- `use the teacup` Trigger the **visible vessel**'s automation.

#### Trigger
- `trigger open` Set the **parent vessel**'s trigger.
- `trigger roll You rolled @random(1 2 3 4 5 6).` Set a custom reaction to the **parent vessel**.
- `trigger passive hello` Displays **hello** in the UI when carried.

#### Cast
- `cast the storm scroll at the golden beetle` Trigger a **distant vessel**'s automation as another vessel.

## Wildcards

Wildcards are markups created for notes and programs, to make vessels more responsive to their environment. A simple example would be `note Hello @Name.`, rendered as `Hello Ghost`.

### Basics
- `@FULL`, `@full`, `@Full` display the current vessel attribute and name.(uppercase)
- `@NAME`, `@name`, `@Name` display the current vessel name.(uppercase)
- `@ATTR`, `@attr`, `@Attr` display the current vessel attribute.(uppercase)
- `@STEM`, `@stem`, `@Stem` name of current parent stem vessel.(uppercase)
- `@size`, number of children vessels.

### Parent
- `@_FULL`, `@_full`, `@_Full` display the parent vessel attribute and name.(uppercase)
- `@_NAME`, `@_name`, `@_Name` display the parent vessel name.(uppercase)
- `@_ATTR`, `@_attr`, `@_Attr` display the parent vessel attribute.(uppercase)
- `@_size`, number of sibling vessels.

### Paradise
- `@__RANDOM`, `@__random`, `@__Random` random paradise vessel.(uppercase)
- `@__random-name`, random paradise vessel name.
- `@__random-attr`, random paradise vessel attribute.
- `@__size`, size of the entire paradise.

### Time
- `@time`, [Desamber](https://wiki.xxiivv.com/Desamber) time format **830:024**.
- `@time-beat`, [Desamber](https://wiki.xxiivv.com/Desamber) time format **830**.
- `@time-pulse`, [Desamber](https://wiki.xxiivv.com/Desamber) time format **024**.

### Program Tools
- `@query`, access the content of a trigger action. ex: `say hello`, `trigger @if(@query IS hello THEN hi!)`

### Functions
- `@vessel(3)`, print the name and action connected with that vessel id. 
- `@random(red green blue)`, choose a random word.
- `@if(a IS b THEN c ELSE d)`, a simple conditional function.

## Tutorials

### Casting 
Casting is a form of puppeteering, making a visible vessel act in your stead.

```
create a blue spell
enter the blue spell
program transform into a fish
leave
create a cat
take the blue spell
cast the blue spell on the cat
```

### Dialog Engine

This example demonstrates how to create a vessel with enabled dialog tools.

```
create a character
enter the character
trigger say You said "@query". 
leave
say hello
```

### Wildcards

```
create a dice
enter the dice
program look
trigger roll You rolled @random(1 2 3 4 5 6).
leave
roll the dice
```

### Random Warp
This example demonstrates how to use a wildcard in a program.

```
create a random warp
enter the random warp
program warp in @__random
leave
use the random warp
```

### Discard Spell
This spell can be fired at unwanted vessels, sending them into a vessel discard bin, to be recycled later.  

```
create a recycling bin
create a discard spell
enter the discard spell
program warp to the recycling bin
leave
take the discard spell
cast the discard spell on the unwanted vessel
```

### Append Spell

```
create a typewriter
enter the typewriter
program note @_note @query
trigger type You typed "@query".
leave
use the typewriter
```

### A pocket watch

```
create a clock
enter the clock
trigger passive @time
leave
take the clock
```

## Extras

- Support this project through [Patreon](https://patreon.com/100).
- See the [License](LICENSE.md) file for license rights and limitations (MIT).
