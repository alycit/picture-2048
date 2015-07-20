# Picture 2048 - A 2048 Clone.

## Summary

A clone of the game [2048](http://gabrielecirulli.github.io/2048/) using pure javascript.  

Currently Deployed at: http://chidbc2048.herokuapp.com

Features:

- Core gameplay using directional arrows
- Scoring
- Ability to start a new game
- Using local storage to save the current game state
- Mobile friendly via swipe events

**Not yet implemented:**

- Game over indicator
- Game won indicator

**Personalization:**

- Swap out the images in the `images` directory.
- Modify the imageMap object in `GameView.js` for your needs. (Legend is also generated based on this data).

  ```js
  imageMap: {
    2: { src: "mike.jpeg", name: "Mike" },
    4: { src: "casey.jpeg", name: "Casey" },
    8: { src: "matt.jpeg", name: "Matt" },
    16: { src: "duke.jpeg", name: "Duke" },
    32: { src: "alyssa.jpeg", name: "Alyssa" },
    64: { src: "maurice.jpeg", name: "Maurice" },
    128: { src: "courtney.jpeg", name: "Courtney" },
    256: { src: "lia.jpeg", name: "Lia" },
    512: { src: "torey.jpeg", name: "Torey" },
    1024: { src: "lucas.jpeg", name: "Lucas" },
    2048: { src: "leon.jpeg", name: "Leon" }
  },
  ```

**Testing:**

Game logic has been tested using jasmine.
