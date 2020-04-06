"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListToMapLink = (function () {
    function ListToMapLink(source, target, mapAdapter, modifiers) {
        if (modifiers === void 0) { modifiers = []; }
        this.target = target;
        this.mapAdapter = mapAdapter;
        this.modifiers = modifiers;
        this.closable = source.addListenerAndCall(this.update.bind(this));
    }
    ListToMapLink.prototype.update = function (change) {
        var mapChange = this.mapAdapter.modify(change);
        for (var _i = 0, _a = this.modifiers; _i < _a.length; _i++) {
            var modifier = _a[_i];
            mapChange = modifier.modify(mapChange);
        }
        this.target.addList(mapChange.inserted());
        this.target.removeList(mapChange.removed());
    };
    ListToMapLink.prototype.close = function () {
        this.closable.close();
    };
    return ListToMapLink;
}());
exports.ListToMapLink = ListToMapLink;
//# sourceMappingURL=list-to-map.link.js.map