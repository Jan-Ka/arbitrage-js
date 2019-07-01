import GameState from "../src/GameState.js";
import {isEmpty} from "../src/Validation";

describe("GameState", () => {
    it("has a Handler Class", () => {
        const gameState = new GameState();

        expect(gameState).toBeDefined();
    });

    describe("from", () => {
        it("is a static member", () => {
            expect(typeof (GameState.from)).toBe("function", "GameState proto missing static from");
        });

        it("requires a previous state", () => {
            expect(GameState.from).toThrow();
        });
    });

    describe("Days", () => {
        it("has a getter", () => {
            const gameState = new GameState();

            expect("DaysLeft" in gameState).toBeTruthy();
        });

        it("in new state returns null as days left", () => {
            const gameState = new GameState();
            const daysLeft = gameState.DaysLeft;

            expect(daysLeft).toBe(null);
        });
    });

    describe("Locations", () => {
        it("has a getter", () => {
            const gameState = new GameState();

            expect("Locations" in gameState).toBeTruthy();
        });

        it("in new state returns an empty array", () => {
            const gameState = new GameState();
            const locations = gameState.Locations;

            expect(isEmpty(locations)).toBeTruthy();
        });
    });

});
