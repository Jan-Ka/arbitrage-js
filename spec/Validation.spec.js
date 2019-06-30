import { isNullOrUndefined } from "../src/Validation";

describe("Validation", () => {
    describe("isNullOrUndefined", () => {
        it("is statically available from Validation", () => {
            expect(isNullOrUndefined).toBeDefined();
        });

        it("returns true on undefined", () => {
            expect(isNullOrUndefined(undefined)).toBeTruthy();
        });

        it("returns true on null", () => {
            expect(isNullOrUndefined(null)).toBeTruthy();
        });

        it("returns false on boolean", () => {
            expect(isNullOrUndefined(true)).toBeFalsy("returned true on true");
            expect(isNullOrUndefined(false)).toBeFalsy("returned true on false");
        });

        it("returns false on string", () => {
            expect(isNullOrUndefined("test")).toBeFalsy();
        });

        it("returns false on empty string", () => {
            expect(isNullOrUndefined("")).toBeFalsy();
        });
    });
});
