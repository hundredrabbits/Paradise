# Paradise

## Actions

You can input multiple commands using the `&` character to break a command into multiple.

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

#### Help
- `help` See available help.
- `help with drop` See help for the **drop** action.

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

### Programming
#### Program
- `program warp to the library` Automate a vessel.

#### Use
- `use the teacup` Trigger the vessel's automation.

#### Usage
- `usage open` Select the vessel's trigger.

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

### Program Tools
- `@and`, chain commands in programs. ex: `program create a vessel @and enter the vessel`.

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

## Useful Spells

### Discard Spell
This spell can be fired at unwanted vessels, sending them into a vessel discard bin, to be recycled later.  

```
create a recycling bin
create a discard spell
enter the discard spell
take the discard spell
program warp to the recycling bin
cast the discard spell on the unwanted vessel
```
