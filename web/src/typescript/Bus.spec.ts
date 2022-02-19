import { Bus } from "./Bus";

describe("Bus", () => {
  let bus: Bus<string>;

  beforeEach(() => {
    bus = new Bus();
  });

  it("should register the given listener and notify them once notify is called", () => {
    const value = "the value";
    const listener1 = jasmine.createSpy("listener1");
    const listener2 = jasmine.createSpy("listener2");

    bus.register(listener1);
    bus.register(listener2);

    // when
    bus.notify(value);

    // then
    expect(listener1).toHaveBeenCalledWith(value);
    expect(listener2).toHaveBeenCalledWith(value);
  });

  describe("register", () => {
    it("should return an unregister function", () => {
      const value = "the value";
      const listener = jasmine.createSpy("listener1");

      const registration = bus.register(listener);

      // when
      registration();
      bus.notify(value);

      // then
      expect(listener).not.toHaveBeenCalled();
    });
  });
});
