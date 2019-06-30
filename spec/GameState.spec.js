import GameState from "../src/GameState.js";

describe("GameState", () => {
    it("has a Handler Class", () => {
        const gameState = new GameState();

        expect(gameState).toBeDefined();
    });

    describe("Days", () => {
        it("has a getter", () => {
            const gameState = new GameState();

            expect(gameState.DaysLeft).toBeDefined();
        });

        it("are a number", () => {
            const gameState = new GameState();
            const daysLeft = gameState.DaysLeft;

            expect(typeof (daysLeft)).toBe("number");
        });

        it("are only increased when a new game starts", () => {
            const gameState = new GameState();
            const daysLeft = gameState.DaysLeft;

            expect(daysLeft).toBe(30);
        });
    });

});
