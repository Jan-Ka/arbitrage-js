import { isNullOrUndefined, isEmpty, isNullOrWhitespace } from "../src/Validation";

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

    describe("isEmpty", () => {
        it("is statically available from Validation", () => {
            expect(isEmpty).toBeDefined();
        });

        it("returns false on undefined", () => {
            expect(isEmpty(undefined)).toBeFalsy();
        });

        it("returns false on null", () => {
            expect(isEmpty(null)).toBeFalsy();
        });

        it("returns true on empty string", () => {
            expect(isEmpty("")).toBeTruthy();
        });

        it("returns false on whitespace string", () => {
            expect(isEmpty("    ")).toBeFalsy();
        });

        it("returns true on empty array", () => {
            expect(isEmpty([])).toBeTruthy();
        });
    });

    describe("isNullOrWhitespace", () => {
        it("is statically available from Validation", () => {
            expect(isNullOrWhitespace).toBeDefined();
        });

        it("returns true on undefined", () => {
            expect(isNullOrWhitespace(undefined)).toBeTruthy();
        });

        it("returns true on undefined", () => {
            expect(isNullOrWhitespace(null)).toBeTruthy();
        });

        it("returns true on empty string", () => {
            expect(isNullOrWhitespace("")).toBeTruthy();
        });

        it("returns false on string", () => {
            expect(isNullOrWhitespace("test")).toBeFalsy();
        });
    });
});
