"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListToListLink = (function () {
    function ListToListLink(source, target, modifiers) {
        if (modifiers === void 0) { modifiers = []; }
        this.target = target;
        this.modifiers = modifiers;
        this.closable = source.addListenerAndCall(this.update.bind(this));
    }
    ListToListLink.prototype.update = function (change) {
        for (var _i = 0, _a = this.modifiers; _i < _a.length; _i++) {
            var modifier = _a[_i];
            change = modifier.modify(change);
        }
        this.target.removeAll(change.removed());
        this.target.addAll(change.inserted());
    };
    ListToListLink.prototype.close = function () {
        this.closable.close();
    };
    return ListToListLink;
}());
exports.ListToListLink = ListToListLink;
//# sourceMappingURL=list-to-list.link.js.map