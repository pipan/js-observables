"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pipe = (function () {
    function Pipe(pipes) {
        this.pipes = [];
        this.pipes = pipes;
    }
    Pipe.prototype.execute = function (value) {
        for (var _i = 0, _a = this.pipes; _i < _a.length; _i++) {
            var pipe = _a[_i];
            value = pipe.execute(value);
        }
        return value;
    };
    return Pipe;
}());
exports.Pipe = Pipe;
//# sourceMappingURL=Pipe.js.map