# Paradise

[Paradise](http://wiki.xxiivv.com/paradise) plays like an [interactive fiction novel](https://www.youtube.com/watch?v=9gmMVjHJ6cU), in an ever-changing world where you are not an avatar but a force acting upon words - moving around and into your other selves, threading through chaos.

_“I have always imagined that Paradise will be a kind of library.”_ — Jorge Luis Borges

## Install

You can use paradise directly [in your browser](https://hundredrabbits.github.io/Paradise/).

### Cli/Desktop

Move to either `/desktop`, or `/cli` and run:

```sh
npm install
npm start
```

## Actions

There are 16 base actions, you can queue multiple actions using the `&` character, for example `create a teapot & enter the teapot`. To see the action documention from within Paradise, use `learn to create`.

- `create`: Create a new vessel at your current location.
- `enter`: Enter a visible vessel.
- `leave`: Exit the parent vessel.
- `become`: Become a visible vessel.
- `take`: Move a visible vessel into a child vessel.
- `drop`: Move a child vessel into the parent vessel.
- `warp`: Move to a distant vessel.
- `note`: Add a description to the current parent vessel.
- `pass`: Add a passive note to the current parent vessel.
- `program`: Add an automation program to a vessel, making it available to the use command.
- `learn`: Read documentation for each action, or see a list of action.
- `use`: Trigger a vessel's program.
- `transform`: Change your current vessel name.
- `move`: Move a visible vessel into another visible vessel.

## Programming

Paradise has a small [lisp language](https://en.wikipedia.org/wiki/Lisp_(programming_language)) that allows for basic scripting, you can find the list of functions [here](https://github.com/hundredrabbits/Paradise/blob/master/web/scripts/lisp.library.js). If you would like to display the name of acting vessel for example.

```
note you are the (guest) in the (host). # you are the ghost in the house.
```

You can access class methods like this:

```
note you carry (len (guest:inventory)) items.
```

You can also do basic math like:

```
note (mul 4 (add 2 1))
```

## Extras

- This application supports the [Ecosystem Theme](https://github.com/hundredrabbits/Themes).
- Support this project through [Patreon](https://patreon.com/100).
- See the [License](LICENSE.md) file for license rights and limitations (MIT).
- Pull Requests are welcome!
