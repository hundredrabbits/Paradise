# Paradise

[Paradise](http://wiki.xxiivv.com/paradise) plays like a strange [interactive fiction novel](https://www.youtube.com/watch?v=9gmMVjHJ6cU), in an ever-changing world where you are not an avatar but a force acting upon places, and objects, and puns, words - moving around and into your other selves, threading through chaos.

_“I have always imagined that Paradise will be a kind of library.”_ — Jorge Luis Borges

## Actions

There are 16 base actions(excl. Learn). 
You can queue multiple actions using the `&` character, for example `create a teapot & enter the teapot`.

### Default

#### Learn
- `learn` See available actions.
- `learn to drop` See the documentation for the **drop** action.

### Basic

#### Create
- `create a ceramic teacup` Create a new vessel.

#### Become
- `become a teacup` Become a visible vessel.
- `become the red teacup` Become a distant vessel.

#### Enter
- `enter the teacup` Enter a visible vessel.

#### Leave
- `leave` Leave the current parent vessel.

### Advanced

#### Warp
- `warp to the red teacup` Warp to a distant vessel's parent location.
- `warp in the yellow teacup` Warp in a distant vessel's location.
- `warp to any teacup` Warp to a random distant vessel's parent location.
- `warp in any teacup` Warp in a random distant vessel's location.
- `warp anywhere` Warp in a random distant vessel's location.

#### Take
- `take the red teacup` Move a visible vessel into your vessel.
- `take any teacup` Move a visible vessel into your vessel.
- `take anything` Move a random visible vessel into your vessel.

#### Drop
- `drop the red teacup` Move a child vessel into the parent vessel.
- `drop a teacup` Move a child vessel into the parent vessel.
- `drop any teacup` Move a random child vessel into the parent vessel.

#### Move
- `move the red teacup in the blue teacup` Move a visible vessel into another visible vessel.

### Narrative

#### Note
- `note It is raining. Again.` Add a note to the parent vessel.

#### Inspect
- `inspect the teacup` Inspect the target visible vessel.

#### Transform
- `transform into a teacup` Rename the current vessel.
- `transform the teacup into a cat` Rename a visible vessel.

#### Transmute
- `transmute into glass` Add an adjective to the current vessel.
- `transmute glass into gold` Add an adjective to a visible vessel.
- `transmute into anything` Remove an adjective to the current vessel.
- `transmute glass into anything` Remove an adjective to a visible vessel.

### Programming

#### Program
- `program warp to the library` Automate a vessel.

#### Use
- `use the teacup` Trigger the vessel's automation.

#### Usage
- `usage open` Select the vessel's trigger.
- `usage roll You rolled @random(1 2 3 4 5 6).` Set a custom reacion.

#### Cast
- `cast the storm scroll at the golden beetle` Trigger a distant vessel's automation as another vessel.

## Wildcards

Wildcards are markups created for notes and programs, to make vessels more responsive to their environment. A simple example would be `note Hello @Name.`, rendered as `Hello Ghost`.

### Basics
- `@FULL`, display the current vessel attribute and name.(uppercase)
- `@NAME`, display the current vessel name.(uppercase)
- `@ATTR`, display the current vessel attribute.(uppercase)
- `@full`, display the current vessel attribute and name.(lowercase)
- `@name`, display the current vessel name.(lowercase)
- `@attr`, display the current vessel attribute.(lowercase)
- `@Full`, display the current vessel attribute and name.(capitalized)
- `@Name`, display the current vessel name.(capitalized)
- `@Attr`, display the current vessel attribute.(capitalized)
- `@note`, display the current vessel note.
- `@size`, size of the current inventory.

### Parent
- `_@FULL`, display the parent vessel attribute and name.(uppercase)
- `_@NAME`, display the parent vessel name.(uppercase)
- `_@ATTR`, display the parent vessel attribute.(uppercase)
- `_@full`, display the parent vessel attribute and name.(lowercase)
- `_@name`, display the parent vessel name.(lowercase)
- `_@attr`, display the parent vessel attribute.(lowercase)
- `_@Full`, display the parent vessel attribute and name.(capitalized)
- `_@Name`, display the parent vessel name.(capitalized)
- `_@Attr`, display the parent vessel attribute.(capitalized)
- `@_note`, display the parent vessel note.
- `@_size`, size of the current inventory.

### Parade
- `@__size`, size of the parade.
- `@__RANDOM`, random parade vessel.(uppercase)
- `@__random`, random parade vessel.(lowercase)
- `@__Random`, random parade vessel.(capitalized)
- `@__random-name`, random parade vessel name.
- `@__random-attr`, random parade vessel attribute.

### Stem
- `@STEM`, name of current parent stem vessel.(uppercase)
- `@stem`, name of current parent stem vessel.(lowercase)
- `@Stem`, name of current parent stem vessel.(capitalized)

### Time
- `@time`, [Desamber](https://wiki.xxiivv.com/#clock) time format **830:024**.
- `@time-beat`, [Desamber](https://wiki.xxiivv.com/#clock) time format **830**.
- `@time-pulse`, [Desamber](https://wiki.xxiivv.com/#clock) time format **024**.

### Program Tools
- `@(3)`, print the name and action connected with that vessel id. 
- `@and`, chain commands in programs. ex: `program create a vessel @and enter the vessel`.
- `@query`, access the content of a usage action. ex: `say hello`, `usage @if(@query IS hello THEN hi!)`
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

### Wildcard
This example demonstrates how to use a wildcard in a program.

```
create a random warp
enter the random warp
program warp in @__random
leave
use the random warp
```

### Dialog Engine
This example demonstrates how to create a vessel with enabled dialog tools.

```
create a character
enter the character
usage say You said "@query". @if(@query IS hello THEN The character replied "hi". ELSE The character looks confused "huh?".)
leave
say hello
```

## Useful Spells

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
usage type You typed "@query".
leave
use the typewriter
```

## Useless Spells

### A Dice

```
create a dice
enter the dice
program look
usage roll You rolled @random(1 2 3 4 5 6).
leave
roll the dice
```

## Extras

- Support this project through [Patreon](https://patreon.com/100).
- See the [License](LICENSE.md) file for license rights and limitations (MIT).
