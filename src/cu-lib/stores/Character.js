var Reflux = require('reflux');
var cuAPI = require('../API.js');
var _UnitFrameBase = require('./_UnitFrameBase.js');

var CharacterStore = Reflux.createStore({
    mixins: [ _UnitFrameBase ],
    handles: cuAPI.handlesCharacter
});

module.exports = CharacterStore;
