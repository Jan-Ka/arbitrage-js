export default class GameState {
    get DaysLeft() {
        return this.daysLeft;
    }

    constructor(daysLeft) {
        this.daysLeft = daysLeft;
    }
}
