# Observable

Observables that can be connected together

[![Build Status](https://travis-ci.com/pipan/js-observables.svg?branch=master)](https://travis-ci.com/pipan/js-observables)

## Installaction

`npm i @wildebeest/observable`

## API

### Connectable

> a.k.a. Observable

This interface allows you to listen for changes or events. You are not able to get the state of the object because observable object does not have to have state

To create a statefull observable use `StatefulChannel` interface. This interface allows you to change the state with `dispatch` method and receive state with `get`  method. The are 2 implementations of `StatefulChannel` interface and that is `LazyObservable` and `EagerObservable`. Former will notify listeners only when new value is set, latter will notify listener right after listner is connected with current state value.

You can connect two classes together (source -> target) so that, when source changes it will notify target. `surce.connect(target)`

### Dispatchable

This interface allows you to `dispatch` an event or value. You are not able to listen or recieve state. This interface acts as an input layer for other objects or components of your application.

The only implementation of this interface is `Channel`. Chnnel allows you to dispatch events (or any other data) to listeners.

### Adaptable

### Pipable

## Examples

## Contribution

## Changelog

