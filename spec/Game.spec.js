import Game from "../src/Game";
import GameState from "../src/GameState";

describe("Game", () => {
    it("has a Handler Class", () => {
        const game = new Game();

        expect(game).toBeDefined();
    });

    it("can start new", () => {
        const game = new Game();

        expect(game.new).toBeDefined();
    });

    describe("State", () => {
        it("is available", () => {
            const game = new Game();

            expect(game.State).toBeDefined();
        });

        it("is of Type GameState", () => {
            const game = new Game();
            game.new();
            const gameState = game.State;

            expect(gameState instanceof GameState).toBeTruthy("Game.State is not instance of GameState");
        });

        it("days left are only increased when a new game starts", () => {
            const game = new Game();
            game.new();
            const gameState = game.State;
            const daysLeft = gameState.DaysLeft;

            expect(daysLeft).toBe(30);
        });
    });
});
