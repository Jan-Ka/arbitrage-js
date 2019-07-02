import { isNullOrUndefined, isNullOrWhitespace } from "./Validation";

export default class Reactor {
    constructor() {
        this.events = new Map();

        this.registerEvent = this.registerEvent.bind(this);
        this.addEventListener = this.addEventListener.bind(this);
    }

    registerEvent(eventName) {
        if (isNullOrWhitespace(eventName)) {
            throw new Error("EventName is required");
        }

        if (!isNullOrUndefined(this.events.get(eventName))) {
            throw new Error("Can't register Event with same name");
        }

        this.events.set(eventName, true);
    }

    addEventListener(eventName) {
        const foundEvent = this.events.get(eventName);

        if (isNullOrUndefined(foundEvent)) {
            throw new Error(`No Event registered for ${eventName}`);
        }
    }
}
