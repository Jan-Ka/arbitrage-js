import ReactorEvent from "../src/ReactorEvent";

describe("ReactorEvent", () => {
    describe("Name", () => {
        it("can be retrieved", () => {
            const eventName = "test";
            const event = new ReactorEvent(eventName);

            expect("Name" in event).toBeTruthy();
            expect(event.Name).toBe(eventName);
        });

        it("throws an error when name is not a non-null string", () => {
            expect(() => {
                new ReactorEvent();
            }).toThrow();
        });
    });

    it("has callbacks", () => {
        const event = new ReactorEvent("test");

        expect("Callbacks" in event).toBeTruthy();
    });

    it("Callbacks are an array", () => {
        const event = new ReactorEvent("test");

        expect(Array.isArray(event.Callbacks)).toBeTruthy();
    });

    it("has a registerCallback instance method", () => {
        const event = new ReactorEvent("test");

        expect(typeof (event.registerCallback)).toBe("function");
    });

    it("can call registered callbacks", () => {
        const event = new ReactorEvent("test");

        const observer = { callback: () => { } };

        spyOn(observer, "callback");

        event.registerCallback(() => {
            observer.callback();
        });

        event.Callbacks[0]();

        expect(observer.callback).toHaveBeenCalled();
    });
});
