// Gives us the REAL or a FAKE API if the real one does not exist.
var cuAPI = require("./fake-API.js");
var Reflux = require("reflux");
var InitListener = require('./listeners/Init.js');
var CharacterListener = require('./listeners/Character.js');
var EnemyTargetListener = require('./listeners/EnemyTarget.js');
var FriendlyTargetListener = require('./listeners/FriendlyTarget.js');

// Event Handlers
var handlers = {};

// Listeners, these are the objects that will actually monitor the cuAPI events
// for a particular topic, e.g. "character" for handlesCharacter events.
var listeners = {
    "init": new InitListener(handlers),
    "character": new CharacterListener(handlers),
    "enemytarget": new EnemyTargetListener(handlers),
    "friendlytarget": new FriendlyTargetListener(handlers)
};

// Event handler class
function Handler() {
    var handlers = [], hid = 0;

    function add(handler, context) {
        var entry = { id: ++hid, handler: handler, context: context };
        var i = handlers.indexOf(null);
        if (i === -1) {
            handlers.push(entry);
        } else {
            handlers[i] = entry;
        }
        return entry.id;
    }

    function fire(args) {
        for (var i = 0; i < handlers.length; i++) {
            if (handlers[i] && handlers[i].handler) {
                console.log('fire handler args=' + (typeof args));
                handlers[i].handler.call(handlers[i].context||handlers[i], args);
            }
        }
    }

    function remove(id) {
        for (var i = 0; i < handlers.length; i++) {
            if (handlers[i].id === id) {
                handlers[i] = null;
            }
        }
    }

    return {
        add: add,
        fire: fire,
        remove: remove
    };
}

// Public cu-lib/API interface
module.exports = {
    native: cuAPI,

    // Listeners
    HandlesCharacter: { listener: "character" },
    HandlesEnemyTarget: { listener: "enemytarget" },
    HandlesFriendlyTarget: { listener: "friendlytarget" },

    on: function(handles, callback) {
        var id;
        var listener = listeners[handles];
        if (listener) {
            id = (handlers[handles] = handlers[handles] || new Handler()).add(callback);
            if (!listener.listening) {
                listener.start();
            }
        }
        return id;
    },

    off: function(handles, id) {
        var handler = handlers[handles];
        if (handler) {
            handler.remove(id);
        }
    },

    OpenUI: function(name) {
        try {
            cuAPI.OpenUI(name);
        } catch(e) {
            console.error('/closeui /openui this UI');
        }
    }
};

module.exports.addListener = module.exports.on;
module.exports.removeListener = module.exports.off;
