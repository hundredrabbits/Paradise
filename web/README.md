## Actions

There are 16 base actions, you can queue multiple actions using the `&` character, for example `create a teapot & enter the teapot`.

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

#### Warp

- `warp to the red teacup` Warp to a **distant vessel**'s parent location.
- `warp in the yellow teacup` Warp in a **distant vessel**'s location.
- `warp to any teacup` Warp to a random **distant vessel**'s parent location.
- `warp in any teacup` Warp in a random **distant vessel**'s location.
- `warp anywhere` Warp in a random **distant vessel**'s location.

### Narrative

#### Learn

-   `learn` See available actions.
-   `learn to drop` See the documentation for the **drop** action.

#### Note

-   `note It is raining. Again.` Add a note to the **parent vessel**.

#### Inspect

-   `inspect the teacup` Inspect the target **visible vessel**.

#### Transform

-   `transform into a teacup` Rename the **current vessel**.
-   `transform the teacup into a crystal cat` Rename a **visible vessel**.
-   `transform into a foggy bat` Rename the **current vessel**.

### Programming

#### Program

- `program warp to the library` Automate the **parent vessel**.
- `program` Remove the program of the **parent vessel**.

#### Use

- `use the teacup` Trigger the **visible vessel**'s automation.

#### Trigger

-   `trigger open` Set the **parent vessel**'s trigger.
-   `trigger roll You rolled @( random 1 2 3 4 5 6 ).` Set a custom reaction to the **parent vessel**.
-   `trigger passive hello` Displays **hello** in the UI when carried.

#### Echo

-   `echo Hello` Print `hello` onto your screen.
-   `echo @( random 1 2 3 4 5 6 )` Evaluate LISP.

#### Cast

-   `cast the storm scroll at the golden beetle` Trigger a **distant vessel**'s automation as another vessel.

## TODOs

- Travel across server
- Can you "take" the parent paradox!?
