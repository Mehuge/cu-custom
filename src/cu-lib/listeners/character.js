var _TargetBase = require("./_TargetBase.js");

var Character = function(handlers) {
    this.target = new _TargetBase(handlers);
    FriendlyTarget.prototype.start = function() {
        this.target.listen("Character");
    };
};

module.exports = Character;
