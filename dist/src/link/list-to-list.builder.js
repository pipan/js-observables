"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_to_list_link_1 = require("./list-to-list.link");
var filter_list_modifier_1 = require("./modifier/list/filter-list.modifier");
var adapter_list_modifier_1 = require("./modifier/list/adapter-list.modifier");
var ListToListBuilder = (function () {
    function ListToListBuilder() {
        this.modifiers = [];
    }
    ListToListBuilder.prototype.withSource = function (source) {
        this.source = source;
        return this;
    };
    ListToListBuilder.prototype.withTarget = function (target) {
        this.target = target;
        return this;
    };
    ListToListBuilder.prototype.withModifier = function (modifier) {
        this.modifiers.push(modifier);
        return this;
    };
    ListToListBuilder.prototype.withFilter = function (fn) {
        return this.withModifier(new filter_list_modifier_1.FilterListModifier(fn));
    };
    ListToListBuilder.prototype.withAdapter = function (fn) {
        return this.withModifier(new adapter_list_modifier_1.AdapterListModifier(fn));
    };
    ListToListBuilder.prototype.build = function () {
        return new list_to_list_link_1.ListToListLink(this.source, this.target, this.modifiers);
    };
    return ListToListBuilder;
}());
exports.ListToListBuilder = ListToListBuilder;
//# sourceMappingURL=list-to-list.builder.js.map