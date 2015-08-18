var Reflux = require('reflux');
var cuAPI = require('../API.js');
var _UnitFrameBase = require('./_UnitFrameBase.js');

var FriendlyTargetStore = Reflux.createStore({
    mixins: [ _UnitFrameBase ],
    handles: cuAPI.handlesFriendlyTarget
});

module.exports = FriendlyTargetStore;
