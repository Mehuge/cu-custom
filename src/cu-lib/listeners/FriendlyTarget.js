var _TargetBase = require("./_TargetBase.js");

var FriendlyTarget = function(handlers) {
    this.target = new _TargetBase(handlers);
    FriendlyTarget.prototype.start = function() {
        this.target.listen("FriendlyTarget");
    };
};

module.exports = FriendlyTarget;
