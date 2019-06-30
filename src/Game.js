import GameState from "./GameState";
// import { isNullOrUndefined } from "./Validation";

export default class Game {

    get State() {
        return this.state;
    }

    constructor() {
        this.state = null;
    }

    start() {
        this.state = new GameState(30);
    }

    next() {

    }
}
