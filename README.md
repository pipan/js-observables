# Observe Changes

Generic oobservable for javascript

[![Build Status](https://travis-ci.com/pipan/js-observe-change.svg?branch=master)](https://travis-ci.com/pipan/js-observe-change)

## Installaction

`npm i @wildebeest/observable`

## API

### Observable Property

Create observable property

```ts
let property: ObservableProperty<any> = new SimpleObservableProperty();
```

Listen for property change and get access to `previous` and `next` value. Property change is triggered, when property value is not strictly equal to existing value.

```ts
let closable: Closable = property.addListener((change: PropertyChange<any>) => {
    console.log(change.previous());
    console.log(change.next());
});
```

Or call listener callback function after registering listener.

```ts
let closable: Closable = property.addListenerAndCall((change: PropertyChange<any>) => {
    console.log(change.previous());
    console.log(change.next());
});
```

Remove listener by calling `close` method;

```ts
closable.close();
```

### Observable List

Create observable list

```ts
let list: ObservableList<any> = new SimpleObservableList();
```

Listen for list change and get access to `inserted` and `removed` values. ListChange does not inform about position item was inserted into.

```ts
let closable: Closable = list.addListener((change: ListChange<any>) => {
    console.log(change.removed());
    console.log(change.inserted());
});
```

Or call listener callback function after registering listener.

```ts
let closable: Closable = list.addListenerAndCall((change: ListChange<any>) => {
    console.log(change.removed());
    console.log(change.inserted());
});
```


Remove listener by calling `close` method;

```ts
closable.close();
```

### Observable Map

Create observable map

```ts
let map: ObservableMap<any> = new SimpleObservableMap();
```

Listen for map change and get access to `inserted` and `removed` `MapEntry`. If item in map was replaced, then there will be one record in removed and one record in inserted under the same key. We recommend to handle removed entries first.

```ts
let closable: Closable = map.addListener((change: MapChange<any>) => {
    console.log(change.removed());
    console.log(change.inserted());
});
```

Or call listener callback function after registering listener.

```ts
let closable: Closable = map.addListenerAndCall((change: MapChange<any>) => {
    console.log(change.removed());
    console.log(change.inserted());
});
```

Remove listener by calling `close` method;

```ts
closable.close();
```

### Observable Group

Very simular to Observable Map, but values of the map are `ObservableList<U>`. Fires change only if new key is added or removed. Does not fire if item is added to existing key / list.

### Links

Connect structures together. You can link list to map, so any change do list will automaticaly propagate to map. Or connect map to group and so on.

```ts
let link: Closable = new ListToMapLink(
    new SimpleListProperty(),
    new SimpleMapProperty()
)
```

You can close this link by calling `close` method of the link.

```ts
link.close();
```

## Examples

## Contribution

## Changelog

