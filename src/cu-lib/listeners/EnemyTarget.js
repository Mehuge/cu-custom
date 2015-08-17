var _TargetBase = require("./_TargetBase.js");

var EnemyTarget = function(handlers) {
    this.target = new _TargetBase(handlers);
    EnemyTarget.prototype.start = function() {
        this.target.listen("EnemyTarget");
    };
};

module.exports = EnemyTarget;
