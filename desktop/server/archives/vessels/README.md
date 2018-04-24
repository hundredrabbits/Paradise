# human
    
Default Paradise vessel.

## Available actions

```
Generic
  Look           | Sight.
  Help           | List commands.
  Inspect        | Get a visible vessel id.
Basic
  Create         | Create a new vessel at your current location. Vessel names and attributes must include less than 14 characters and be unique. 
  Become         | Become a visible vessel, the target vessel must be present and visible in the current parent vessel. Adding a bookmark with your browser will preserve your vessel id for your return.
  Enter          | Enter a visible vessel.
  Leave          | Exit the parent vessel.
Movement
  Warp           | Enter a distant vessel by either its name, or its warp id. The vessel must be visible.
  Take           | Move a visible vessel into a child vessel.
  Drop           | Move a child vessel into the parent vessel.
Communication
  Say            | Add a message into the global dialog.
  Emote          | Add an emote message into the global dialog.
  Signal         | Broadcast your current visible parent vessel.
Narrative
  Note           | Add a description to the current parent vessel.
  Transform      | Change your current vessel name and attribute.
  Set            | Directly write attributes for a owned vessel, the set command is meant to be used with programs and casted as spells.
Programming
  Program        | Add an automation program to a vessel, making it available to the use command. A program cannot exceed 60 characters in length.
  Use            | Add an automation program to a vessel, making it available to the use command.
  Cast           | Use a vessel program's from anywhere. By default, the spell will be cast onto the current active vessel, casting can also target a visible vessel.
```

## Documentation

Generated with [Nataniev](http://wiki.xxiivv.com/Nataniev) on **Pentesamber 19, 2017**, view the [project site](htp://google.com).

##License

See the [LICENSE](https://github.com/neauoire/License/README.md) file for license rights and limitations (CC).
