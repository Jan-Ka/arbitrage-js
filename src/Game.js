import GameState from "./GameState";
// import { isNullOrUndefined } from "./Validation";

export default class Game {

    get State() {
        return this.state;
    }

    constructor() {
        this.state = null;

        this.start = this.start.bind(this);
    }

    start() {
        this.state = new GameState(30);
    }

    next() {

    }
}
