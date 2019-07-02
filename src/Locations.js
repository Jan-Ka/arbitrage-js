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

        this.locations = [];

        for (const rawLocation of rawLocations) {
            const newLocation = new Location(rawLocation);

            newLocation.OnIsCurrentChangedEventListener = () => {
                const allIsCurrent = this.locations.filter((location) => location.IsCurrent);

                if(allIsCurrent.length > 1) {
                    throw new Error("Only one Location can be Current");
                }
            };

            this.locations.push(newLocation);
        }
    }

    findByName(name) {
        return this.locations.find((location) => location.Name === name);
    }
}
