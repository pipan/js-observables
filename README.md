# Observe Changes

Generic oobservable for javascript

[![Build Status](https://travis-ci.com/pipan/js-observe-change.svg?branch=master)](https://travis-ci.com/pipan/js-observe-change)

## Installaction

`npm i @wildebeest/observable`

## API

### Observable

This interface allows you to listen for changes or events. You are not able to get the state of the object because observable object does not have to have state

To create a statefull observable use `ValueObservable` interface. This interface allows you to change the state with `set` method and receive state with `get`  method. The are 2 implementations of `ValueObserver` interface and that is `LazyObservable` and `EagerObservable`. Former will notify listeners only when new value is set, latter will notify listener right after listner is registered with current state value.

### Dispatcher

This interface allows you to `dispatch` an event or value. You are not able to listen or recieve state. This interface acts as an input layer for other objects or components of your application.

The only implementation of this interface is `Channel`. Chnnel allows you to dispatch events (or any other data) to listeners.

### Connectable

Soetimes you have two parts of a application that use Observables. And you need to connect those observable together. One part has to be a `source` of data flow in your application and the other part has to be `target` of your data flow in applicatin. So you can use `Connectable` interface, specificaly `OneWayConnector` to bridge the gap between those two parts of an application.

## Examples

## Contribution

## Changelog

