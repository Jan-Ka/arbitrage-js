import { isNullOrUndefined } from "./Validation";

export default class GameState {
    get DaysLeft() {
        return this.daysLeft;
    }

    constructor(daysLeft) {
        this.daysLeft = isNullOrUndefined(daysLeft) ? null : daysLeft;
    }
}
