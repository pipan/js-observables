"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListToGroupLink = (function () {
    function ListToGroupLink(source, target, groupBy) {
        this.target = target;
        this.groupBy = groupBy;
        this.closable = source.addListenerAndCall(this.update.bind(this));
    }
    ListToGroupLink.prototype.update = function (change) {
        for (var _i = 0, _a = change.removed(); _i < _a.length; _i++) {
            var removed = _a[_i];
            this.target.remove(this.groupBy.modify(removed), removed);
        }
        for (var _b = 0, _c = change.inserted(); _b < _c.length; _b++) {
            var inserted = _c[_b];
            this.target.add(this.groupBy.modify(inserted), inserted);
        }
    };
    ListToGroupLink.prototype.close = function () {
        this.closable.close();
    };
    return ListToGroupLink;
}());
exports.ListToGroupLink = ListToGroupLink;
//# sourceMappingURL=list-to-group.link.js.map