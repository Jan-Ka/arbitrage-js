import Game from "../src/Game";
import GameState from "../src/GameState";

describe("Game", () => {
    it("has a Handler Class", () => {
        const game = new Game();

        expect(game).toBeDefined();
    });

    it("can start new", () => {
        const game = new Game();

        expect(game.start).toBeDefined();
    });

    it("can advance state", () => {
        const game = new Game();

        expect(game.next).toBeDefined();
    });

    describe("State", () => {
        it("is available", () => {
            const game = new Game();

            expect(game.State).toBeDefined();
        });

        it("is of Type GameState", () => {
            const game = new Game();
            game.start();
            const gameState = game.State;

            expect(gameState instanceof GameState).toBeTruthy("Game.State is not instance of GameState");
        });

        it("is initialized with 30 days", () => {
            const game = new Game();
            game.start();
            const gameState = game.State;
            const daysLeft = gameState.DaysLeft;

            expect(daysLeft).toBe(30);
        });

        describe("Advancing", () => {
            it("decreases days", () => {
                const game = new Game();
                game.start();
                game.next();
                const daysLeft = game.State.DaysLeft;

                expect(daysLeft).toBe(29);
            });
        });
    });
});
