import Game from "../src/Game";
import GameState from "../src/GameState";

describe("Game", () => {
    it("has a Handler Class", () => {
        const game = new Game();

        expect(game).toBeDefined();
    });

    describe("State", () => {
        it("is available", () => {
            const game = new Game();

            expect(game.State).toBeDefined();
        });

        it("is of Type GameState", () => {
            const game = new Game();
            const gameState = game.State;

            expect(gameState instanceof GameState).toBeTruthy("Game.State is not instance of GameState");
        });
    });
});
