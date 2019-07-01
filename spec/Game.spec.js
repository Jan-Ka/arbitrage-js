import Game from "../src/Game";
import GameState from "../src/GameState";

describe("Game", () => {
    it("has a Handler Class", () => {
        const game = new Game();

        expect(game).toBeDefined();
    });

    it("can start new", () => {
        const game = new Game();

        expect(game.start).not.toThrow();
    });

    it("can advance state", () => {
        const game = new Game();

        expect(game.next).toBeDefined();
    });

    describe("State", () => {
        it("is available", () => {
            const game = new Game();

            expect("State" in game).toBeTruthy();
        });

        it("is of Type GameState", () => {
            const game = new Game();
            game.start();
            const gameState = game.State;

            expect(gameState instanceof GameState).toBeTruthy("Game.State is not instance of GameState");
        });
    });

    describe("Location", () => {
        it("Current is available", () => {
            const game = new Game();
            game.start();

            expect("Current" in game.State.Locations).toBeTruthy();
        });

        it("Current returns null if no Location is set as Current", () => {
            const game = new Game();
            game.start();

            expect(game.State.Locations.Current).toBe(null);
        });
    });
});
