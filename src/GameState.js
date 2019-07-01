import { isNullOrUndefined } from "./Validation";

export default class GameState {
    get DaysLeft() {
        return this.daysLeft;
    }

    get Locations() {
        return [];
    }

    constructor(daysLeft) {
        this.daysLeft = isNullOrUndefined(daysLeft) ? null : daysLeft;
    }

    static from(previousState) {
        if (isNullOrUndefined(previousState)) {
            throw new Error("nothing to work from");
        }

        return new GameState();
    }
}
