import { hashWithDjb2 } from "./Utilities";
import { isNullOrUndefined, isEmpty } from "./Validation";

export default class Location {
    get Name() {
        return this.name;
    }

    constructor(name) {
        if (isNullOrUndefined(name) || isEmpty(name)) {
            throw new Error("Location needs a Name");
        }

        this.name = name;
    }

    equals(x) {
        if (!(x instanceof Location)) {
            throw new Error("can only compare to other Location");
        }

        return this.getEqualityHash() === x.getEqualityHash();
    }

    getEqualityHash() {
        return hashWithDjb2("");
    }
}
