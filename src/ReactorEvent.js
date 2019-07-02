import { isNullOrWhitespace } from "./Validation";

export default class ReactorEvent {
    get Name() {
        return this.name;
    }

    get Callbacks() {
        return this.callbacks;
    }

    constructor(name) {
        if(isNullOrWhitespace(name)) {
            throw new Error("EventName is required");
        }

        this.name = name;
        this.callbacks = [];

        this.registerCallback = this.registerCallback.bind(this);
    }

    registerCallback(callback) {
        this.callbacks.push(callback);
    }
}
