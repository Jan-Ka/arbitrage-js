import Locations from "../src/Locations";
import Location from "../src/Location";

describe("Locations", () => {
    it("allows to retrieve All Locations", () => {
        const locations = new Locations();

        expect("All" in locations).toBeTruthy();
    });

    it("ensures that All returns an Array", () => {
        const locations = new Locations();

        expect(Array.isArray(locations.All)).toBeTruthy();
    });

    describe("first", () => {

        it("retrieve specifc via name", () => {
            const testLocationName = "Loc";

            const expectedLocations = [
                testLocationName,
                "LocB"
            ];

            const locations = new Locations(expectedLocations);
            const location = locations.findByName(testLocationName);

            expect(location.Name).toBe(testLocationName);
        });

        it("returns undefined if specific not found", () => {

            const locations = new Locations(["test"]);

            expect(locations.findByName("loc")).toBeUndefined();
        });

    });

    it("allows to retrieve all available Locations", () => {
        const expectedLocations = [
            "LocA",
            "LocB"
        ];

        const locations = new Locations(expectedLocations);

        expect(locations.All[0].Name).toBe(expectedLocations[0]);
        expect(locations.All[1].Name).toBe(expectedLocations[1]);
    });

    it("instantiates Location Classes", () => {
        const locations = new Locations(["LocA"]);

        expect(locations.All[0] instanceof Location).toBeTruthy();
    });

    describe("Current", () => {
        it("is available", () => {
            const locations = new Locations(["test"]);

            expect("Current" in locations).toBeTruthy();
        });

        it("returns undefined if no Location is set as Current", () => {
            const locations = new Locations(["test"]);

            expect(locations.Current).toBeUndefined();
        });

        it("finds current if the internal array way updated", () => {
            const testLocation = "LocB";

            const expectedLocations = [
                "LocA",
                testLocation
            ];

            const locations = new Locations(expectedLocations);

            locations.findByName(testLocation).IsCurrent = true;

            expect(locations.Current.Name).toBe(testLocation);
        });

        it("setting more than one location to current throws error", () => {
            const expectedLocations = [
                "LocA",
                "LocB"
            ];

            const locations = new Locations(expectedLocations);

            expect(() => {
                for (const location of locations.All) {
                    location.IsCurrent = true;
                }
            }).toThrow();
        });
    });
});
