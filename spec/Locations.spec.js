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
            const location = locations.first(testLocationName);

            expect(location.Name).toBe(testLocationName);
        });

        it("returns undefined if specific not found", () => {

            const locations = new Locations(["test"]);

            expect(locations.first("loc")).toBeUndefined();
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
});
