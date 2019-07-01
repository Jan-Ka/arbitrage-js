import { isNullOrUndefined } from "./Validation";
import Locations from "./Locations";

export default class GameState {
    get DaysLeft() {
        return this.daysLeft;
    }

    get Locations() {
        if(isNullOrUndefined(this.locations)) {
            this.locations = new Locations();
        }

        return this.locations;
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
