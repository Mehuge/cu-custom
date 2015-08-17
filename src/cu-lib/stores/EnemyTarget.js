var Reflux = require('reflux');
var cuAPI = require('../API.js');
var _UnitFrameBase = require('./_UnitFrameBase.js');

var EnemyTargetStore = Reflux.createStore({
    mixins: [ _UnitFrameBase ],
    handles: cuAPI.HandlesEnemyTarget
});

module.exports = EnemyTargetStore;
