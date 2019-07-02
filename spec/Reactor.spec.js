import Reactor from "../src/Reactor";

describe("Reactor", () => {
    it("can register events", () => {
        const reactor = new Reactor();

        reactor.registerEvent("test");

        expect(reactor.events.size).toBe(1);
    });

    describe("Events", () => {
        it("has registerEvent instance method", () => {
            const reactor = new Reactor();

            expect(typeof (reactor.registerEvent)).toBe("function");
        });

        describe("Registration", () => {
            it("throws an error on undefined eventName", () => {
                const reactor = new Reactor();
                expect(reactor.registerEvent.bind(null, undefined)).toThrow();
            });

            it("throws an error on empty eventName", () => {
                const reactor = new Reactor();
                expect(reactor.registerEvent.bind(null, "")).toThrow();
            });

            it("throws exception on duplicate name", () => {
                const reactor = new Reactor();
                const eventName = "test";

                reactor.registerEvent(eventName);

                expect(reactor.registerEvent.bind(null, eventName)).toThrow();
            });
        });

    });

    describe("EventListeners", () => {
        it("can be added", () => {
            const reactor = new Reactor();

            const eventName = "testEvent";

            reactor.registerEvent(eventName);

            expect(reactor.addEventListener.bind(null, eventName, () => { })).not.toThrow();
        });

        it("can only be added to existing events", () => {
            const reactor = new Reactor();

            expect(reactor.addEventListener.bind(null, "test", () => { })).toThrow();
        });
    });

    describe("Dispatch", () => {
        it("has dispatchEvent instance method", () => {
            const reactor = new Reactor();

            expect(typeof (reactor.dispatchEvent)).toBe("function");
        });

        it("throws error when trying to dispatch non registered event", () => {
            const reactor = new Reactor();
            expect(reactor.dispatchEvent.bind(null, "test")).toThrow();
        });

        it("throws an error dispatching event without listeners", () => {
            const reactor = new Reactor();
            const eventName = "test";

            reactor.registerEvent(eventName);

            expect(reactor.dispatchEvent.bind(null, eventName)).toThrow();
        });

        it("can dispatch events", () => {
            const reactor = new Reactor();
            const eventName = "test";

            reactor.registerEvent(eventName);

            const observer = { callback: () => { } };

            spyOn(observer, "callback");

            reactor.addEventListener(eventName, () => {
                observer.callback();
            });

            reactor.dispatchEvent(eventName);

            expect(observer.callback).toHaveBeenCalled();
        });

        it("can dispatch events with eventArgs", (done) => {
            const reactor = new Reactor();
            const eventName = "test";
            const testArgs = "testArgs";

            reactor.registerEvent(eventName);

            reactor.addEventListener(eventName, (eventArgs) => {
                expect(eventArgs).toBe(testArgs);
                done();
            });

            reactor.dispatchEvent(eventName, testArgs);
        });
    });
});
