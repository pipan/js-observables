"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapToGroupLink = (function () {
    function MapToGroupLink(source, target, groupBy) {
        this.target = target;
        this.groupBy = groupBy;
        this.closable = source.addListenerAndCall(this.update.bind(this));
    }
    MapToGroupLink.prototype.update = function (change) {
        for (var _i = 0, _a = change.removed(); _i < _a.length; _i++) {
            var removed = _a[_i];
            var value = removed.getValue();
            this.target.remove(this.groupBy.modify(value), value);
        }
        for (var _b = 0, _c = change.inserted(); _b < _c.length; _b++) {
            var inserted = _c[_b];
            var value = inserted.getValue();
            this.target.add(this.groupBy.modify(value), value);
        }
    };
    MapToGroupLink.prototype.close = function () {
        this.closable.close();
    };
    return MapToGroupLink;
}());
exports.MapToGroupLink = MapToGroupLink;
//# sourceMappingURL=map-to-group.link.js.map