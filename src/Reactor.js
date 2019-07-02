import { isNullOrUndefined, isNullOrWhitespace } from "./Validation";
import ReactorEvent from "./ReactorEvent";

export default class Reactor {
    constructor() {
        /**
         * @type {Map<string, ReactorEvent>}
         */
        this.events = new Map();

        this.registerEvent = this.registerEvent.bind(this);
        this.addEventListener = this.addEventListener.bind(this);
        this.dispatchEvent = this.dispatchEvent.bind(this);

        this._hasEvent = this._hasEvent.bind(this);
    }

    registerEvent(eventName) {
        if (isNullOrWhitespace(eventName)) {
            throw new Error("EventName is required");
        }

        if (this._hasEvent(eventName)) {
            throw new Error("Can't register Event with same name");
        }

        this.events.set(eventName, new ReactorEvent(eventName));
    }

    addEventListener(eventName, callback) {
        const foundEvent = this.events.get(eventName);

        if (isNullOrUndefined(foundEvent)) {
            throw new Error(`No Event registered for ${eventName}`);
        }

        foundEvent.registerCallback(callback);
    }

    dispatchEvent(eventName, eventArgs) {
        const event = this.events.get(eventName);

        if (isNullOrUndefined(event)) {
            throw new Error("Can't dispatch non registered Event");
        }

        if(event.Callbacks.length === 0) {
            throw new Error("No Listeners registered for Event");
        }

        for (const callback of event.Callbacks) {
            callback(eventArgs);
        }
    }

    _hasEvent(eventName) {
        const event = this.events.get(eventName);

        return !isNullOrUndefined(event);
    }
}
