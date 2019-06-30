import Game from "../src/Game";

describe("test", () => {
    it("bla", () => {
        const testGame = new Game();

        expect(testGame.greet("tom")).toBe("Hello tom");
    });
});
