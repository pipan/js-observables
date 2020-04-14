"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapToMapLink = (function () {
    function MapToMapLink(source, target, modifiers) {
        if (modifiers === void 0) { modifiers = []; }
        this.target = target;
        this.modifiers = modifiers;
        this.closable = source.addListenerAndCall(this.update.bind(this));
    }
    MapToMapLink.prototype.update = function (change) {
        for (var _i = 0, _a = this.modifiers; _i < _a.length; _i++) {
            var modifier = _a[_i];
            change = modifier.modify(change);
        }
        this.target.removeList(change.removed());
        this.target.addList(change.inserted());
    };
    MapToMapLink.prototype.close = function () {
        this.closable.close();
    };
    return MapToMapLink;
}());
exports.MapToMapLink = MapToMapLink;
//# sourceMappingURL=map-to-map.link.js.map