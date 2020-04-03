import 'ts-jest';
import { ObservableProperty, SimpleObservableProperty, PropertyChange, Closable } from '../src';

test("get return null after construction", () => {
    let property: ObservableProperty<string> = new SimpleObservableProperty();

    expect(property.get()).toBeNull();
});

test("get returns value that was set in constructor", () => {
    let property: ObservableProperty<string> = new SimpleObservableProperty("test");

    expect(property.get()).toBe("test");
});

test("get returns value that was set", () => {
    let property: ObservableProperty<string> = new SimpleObservableProperty();
    property.set("test");

    expect(property.get()).toBe("test");
});

test("isEmpty is true when constructor empty", () => {
    let property: ObservableProperty<string> = new SimpleObservableProperty();

    expect(property.isEmpty()).toBeTruthy();
});

test("isEmpty is true when value is null", () => {
    let property: ObservableProperty<string> = new SimpleObservableProperty(null);

    expect(property.isEmpty()).toBeTruthy();
});

test("isEmpty is true when value is undefined", () => {
    let property: ObservableProperty<string> = new SimpleObservableProperty(undefined);

    expect(property.isEmpty()).toBeTruthy();
});

test("isEmpty is false when value is string", () => {
    let property: ObservableProperty<string> = new SimpleObservableProperty("string");

    expect(property.isEmpty()).toBeFalsy();
});

test("isEmpty is false when value is empty string", () => {
    let property: ObservableProperty<string> = new SimpleObservableProperty("");

    expect(property.isEmpty()).toBeFalsy();
});

test("isEmpty is false when value is empty array", () => {
    let property: ObservableProperty<string[]> = new SimpleObservableProperty([]);

    expect(property.isEmpty()).toBeFalsy();
});

test("isEmpty is false when value is false", () => {
    let property: ObservableProperty<boolean> = new SimpleObservableProperty(false);

    expect(property.isEmpty()).toBeFalsy();
});

test("isEmpty is false when value is zero", () => {
    let property: ObservableProperty<number> = new SimpleObservableProperty(0);

    expect(property.isEmpty()).toBeFalsy();
});

test("addListenerAndCall fires event on register with previous null and initial value as next", () => {
    let property: ObservableProperty<string> = new SimpleObservableProperty("hallo");

    property.addListenerAndCall((change: PropertyChange<string>) => {
        expect(change.next()).toBe("hallo");
        expect(change.previous()).toBeNull();
    });
});

test("addListener fires after change", (done) => {
    let property: ObservableProperty<string> = new SimpleObservableProperty("hallo");

    property.addListener((change: PropertyChange<string>) => {
        expect(change.previous()).toBe("hallo");
        expect(change.next()).toBe("from test side");
        done();
    });

    property.set("from test side");
});

test("addListener does not fire when setting same value", () => {
    let property: ObservableProperty<string> = new SimpleObservableProperty("test");

    let called: boolean = false;
    property.addListener((change) => {
        called = true;
    });

    property.set("test");
    expect(called).toBeFalsy();
});

test("removeListener removes listener and change is not called", () => {
    let property: ObservableProperty<string> = new SimpleObservableProperty();

    let called: boolean = false;
    let listener: (change: PropertyChange<string>) => void = (change) => {
        called = true;
    }
    property.addListener(listener);
    property.removeListener(listener);

    property.set("test");
    expect(called).toBeFalsy();
});

test("close removes listener and change is not called", () => {
    let property: ObservableProperty<string> = new SimpleObservableProperty();

    let called: boolean = false;
    let closable: Closable = property.addListener((change) => {
        called = true;
    });
    closable.close();

    property.set("test");
    expect(called).toBeFalsy();
});