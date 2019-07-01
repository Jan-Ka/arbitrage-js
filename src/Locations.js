import { isNullOrUndefined } from "./Validation";
import Location from "./Location";

export default class Locations {
    /**
     * @returns {any[]}
     */
    get All() {
        return this.locations;
    }

    get Current() {
        return this.locations.find((location) => location.IsCurrent);
    }

    constructor(locations) {
        const rawLocations = isNullOrUndefined(locations) || !Array.isArray(locations) ? [] : locations;

        this.locations = rawLocations.map((rawLocation) => {
            if (typeof (rawLocation) === "string") {
                return new Location(rawLocation);
            }
        });
    }

    findByName(name) {
        return this.locations.find((location) => location.Name === name);
    }
}
