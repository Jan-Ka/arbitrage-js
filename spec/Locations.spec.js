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
