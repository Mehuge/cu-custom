var Reflux = require('reflux');
var cuAPI = require('../API.js');

var _UnitFrameBase = {
    start: function() {
        var store = this;
        cuAPI.on(this.handles.listener, function(unitFrame) {
            store.info = {
                name: unitFrame.name,
                race: unitFrame.race,
                health: unitFrame.health,
                maxHealth: unitFrame.maxHealth,
                stamina: unitFrame.stamina,
                maxStamina: unitFrame.maxStamina
            };
            console.log("UNIT FRAME BASE [" + store.handles.listener + "] " + JSON.stringify(store.info));
            store.trigger(store.info);
        });
    },
    init: function() {
        var store = this;
        cuAPI.on("init", function() {
            console.log("UNIT FRAME BASE [" + store.handles.listener + "] START");
            store.start();
        });
    }
};

module.exports = _UnitFrameBase;
