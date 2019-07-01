import Game from "../src/Game";

describe("Playing", () => {

    beforeAll(() => {
        this.game = null;
    });

    describe("a new game", () => {
        it("does start", () => {
            this.game = new Game();

            expect(this.game.start).not.toThrow();
        });

        it("does start with 30 days left", () => {
            expect(this.game.State.DaysLeft).toBe(30);
        });
    });
});
