import { hashWithDjb2 } from "./Utilities";
import { isNullOrUndefined, isEmpty } from "./Validation";
import Reactor from "./Reactor";

const OnChangeCurrentEventListenerEventName = "OnChangeCurrentEventListener";

export default class Location extends Reactor {
    get Name() {
        return this.name;
    }

    get IsCurrent() {
        if (isNullOrUndefined(this.current)) {
            this.current = false;
        }

        return this.current;
    }

    set IsCurrent(x) {
        this.current = x;

        if (this.hasEventListeners) {
            this.dispatchEvent(OnChangeCurrentEventListenerEventName);
        }
    }

    set OnIsCurrentChangedEventListener(newListener) {
        this.addEventListener(OnChangeCurrentEventListenerEventName, newListener);
        this.hasEventListeners = true;
    }

    constructor(name) {
        super();

        this.registerEvent(OnChangeCurrentEventListenerEventName);
        this.hasEventListeners = false;

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
