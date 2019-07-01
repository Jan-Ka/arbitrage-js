import Location from "../src/Location";

describe("Location", () => {
    it("has a name property", () => {
        const locA = new Location("Loc");

        expect("Name" in locA).toBeTruthy();
    });

    it("retains its name", () => {
        const testName = "Loc";
        const locA = new Location(testName);

        expect(locA.Name).toBe(testName);
    });

    it("throws error if name is not provided", () => {
        expect(() => {
            new Location();
        }).toThrow();
    });

    it("throws error if name is empty", () => {
        expect(() => {
            new Location("");
        }).toThrow();
    });

    describe("Equality", () => {
        it("has a equals method", () => {
            const locA = new Location("Loc");

            expect(typeof (locA.equals)).toBe("function");
        });

        it("throws error when not comparing instances of Location", () => {
            const locA = new Location("Loc");

            expect(locA.equals.bind(null, "test")).toThrow();
        });

        it("is given when two Locations are instantiated with the same values", () => {
            const testName = "Loc";

            const locA = new Location(testName);
            const locB = new Location(testName);

            expect(locA.equals(locB)).toBeTruthy();
        });
    });

    it("has a Current Location Flag", () => {
        const locA = new Location("Loc");

        expect("IsCurrent" in locA).toBeTruthy();
    });

    it("is set to not Current Location by default", () => {
        const locA = new Location("Loc");

        expect(locA.IsCurrent).toBeFalsy();
    });

    it("can be flagged as current Location", () => {
        const locA = new Location("Loc");
        locA.IsCurrent = true;

        expect(locA.IsCurrent).toBeTruthy();
    });
});
