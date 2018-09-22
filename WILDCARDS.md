## Wildcards

The wildcards are being phased out in exchange for [ParadiseLISP](LISP.md).

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
- `@current`, the current vessel id. 
- `@parent`, the parent vessel id. 
- `@responder`, the reponder id of a trigger action. 
- `@query`, the query of a trigger action. ex: `say hello`, `@query = hello`

### Functions
- `@vessel(3)`, print the name and action connected to the vessel `#3`. 
- `@vessel(3 note)`, print the note connected to the vessel `#3`. 
- `@random(red green blue)`, choose a random word.
- `@if(a IS b THEN c ELSE d)`, a simple conditional function.

## Templating

- `&`, to do multiple queries at once.
- `&&`, to make a program do multiple queries at once.
- `--`, to add a linebreak in a note.