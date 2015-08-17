var _TargetBase = require("./_TargetBase.js");

var EnemyTarget = function(handlers) {
    this.target = new _TargetBase(handlers, this);
    EnemyTarget.prototype.start = function() {
        this.target.listen("EnemyTarget");
    };
};

module.exports = EnemyTarget;
