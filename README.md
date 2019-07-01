# arbitrage-js
A generic (and _[clean-room](https://en.wikipedia.org/wiki/Clean_room_design "Wikipedia Article about Clean Room Design")_) implementation of the Game [Drugwars](https://en.wikipedia.org/wiki/Drugwars "Wikipedia Article about Drugwars"), originally written for MS-DOS by John E. Dell in 1984.

## About the Project
### Features

* Generic Implementation of Drugwars
  * Neutral Names for Goods
  * Neutral Names for Locations
  * Generic Enemy

### Motivation

I wanted to reimplement a Game using Test Driven Development and to explore the possibilities of pure ECMAScript 6. Having played my fair share of DopeWars (for Palm OS; on a Palm Vx) I decided it was a good starting point.

This is at first a personal experiment and learning experience and while I hope to provide a playable version, it is not guaranteed.

## Installing / Getting started

* Clone Repository
* Open a Console within the cloned folder
* Install required packages with ```npm install```

## Developing

Nothing special is required to partake in development of arbitrage-js

### Tests

You can run the provided tests by using ```npm test```

To validate that the current Implementation supports a full game you can use ```npm run testGame```. This will run sequential tests that step through all operations required in the game.
