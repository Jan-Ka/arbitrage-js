import GameState from "../src/GameState.js";

describe("GameState", () => {
    it("has a Handler Class", () => {
        const gameState = new GameState();

        expect(gameState).toBeDefined();
    });


});
