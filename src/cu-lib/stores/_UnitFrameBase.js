var Reflux = require('reflux');
var cuAPI = require('../API.js');

var _UnitFrameBase = {
    start: function() {
        var store = this;
        store.info = {
            name: "", race: "", raceId: -1, health: 0, maxHealth: 100, stamina: 0, maxStamina: 100
        };
        cuAPI.on(this.handles.listener, function(unitFrame) {
            store.info = {
                name: unitFrame.name,
                race: unitFrame.race,
                raceId: unitFrame.raceId,
                health: unitFrame.health,
                maxHealth: unitFrame.maxHealth,
                stamina: unitFrame.stamina,
                maxStamina: unitFrame.maxStamina
            };
            store.trigger(store.info);
        });
    },
    init: function() {
        var store = this;
        cuAPI.on("init", function() {
            store.start();
        });
    }
};

module.exports = _UnitFrameBase;
