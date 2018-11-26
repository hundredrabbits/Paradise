## TODOs

-   Build a chat routing vessel example.
-   Complete the RPS example.
    -   Logic to tell if you won?
-   Expand the default world.
-   Improve walkthrough, add checks for multi-line.
-   Potentially add syntax highlighting for both Paradise Commands and WildcardLISP.
-   Make various class methods (eg. Vessel.parent) into getters
-   Add more sections to walkthrough
-   Maybe add menu item for walkthrough?

```javascript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}

const square = new Rectangle(10, 10);

console.log(square.area); // 100
```

### Time - in progress

-   `@time`, [Desamber](https://wiki.xxiivv.com/Desamber) time format **830:024**.
-   `@time-beat`, [Desamber](https://wiki.xxiivv.com/Desamber) time format **830**.
-   `@time-pulse`, [Desamber](https://wiki.xxiivv.com/Desamber) time format **024**.

### WildcardLISP

-   Implement logarithms (?), and any other maths operators I can think of.
-   Loops
    -   Like `map` combined with `range`
-   Key-value data structures
-   Add the rest of the (as-of-yet) untransferred wildcards.
    -   `time`, `beat`, `pulse`
-   Pretty print lists

### Save / Load

-   Implement a save/load feature for the CLI
