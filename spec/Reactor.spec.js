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

            expect(typeof(reactor.registerEvent)).toBe("function");
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
});
