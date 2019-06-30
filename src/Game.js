import GameState from "../src/GameState";

export default class Game {
    constructor() {
        this.state = null;
    }

    get State() {
        if (this.state == null) {
            this.state = new GameState();
        }

        return this.state;
    }
}
