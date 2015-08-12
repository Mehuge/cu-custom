// Gives us the REAL or a FAKE API if the real one does not exist.
var cuAPI = require("./fake-API.js");

// Event Handlers
var handlers = {};

// Listeners, these are the objects that will actually monitor the cuAPI events
// for a particular topic, e.g. "character" for handlesCharacter events.
var listeners = {

    "init": {
        listen: function() {
            var init = this, handler = handlers["init"];
            cuAPI.OnInitialized(function(){
                handler.fire();
            });
            this.listening = true;
        }
    },

    "character": {
         listen: function() {
            var character = this, handler = handlers["character"];

            // Character Name
            cuAPI.OnCharacterNameChanged(function(name) {
                // design? store properties directly in the object or in a
                // member hash?  Exposing HandlesCharacter interface to the
                // callback or just the data?
                character.name = name;
                console.log('character name ' + name);
                handler.fire(character);
            });

            // Character Race
            cuAPI.OnCharacterRaceChanged(function(race) {
                character.race = race;
                console.log('character race ' + race);
                handler.fire(character);
            });

            // Character Stamina
            cuAPI.OnCharacterStaminaChanged(function(stamina, maxStamina) {
                character.stamina = stamina;
                character.maxStamina = maxStamina;
                console.log('character stamina ' + stamina + "/" + maxStamina);
                handler.fire(character);
            });

            // Character Health
            cuAPI.OnCharacterHealthChanged(function(health, maxHealth) {
                character.health = health;
                character.maxHealth = maxHealth;
                console.log('character health ' + health + "/" + maxHealth);
                handler.fire(character);
            });

            // We are now listening
            this.listening = true;
        }
    }
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
    native: window.cuAPI,

    on: function(handles, callback) {
        var id;
        var listener = listeners[handles];
        if (listener) {
            id = (handlers[handles] = handlers[handles] || new Handler()).add(callback);
            if (!listener.listening) {
                listener.listen();
            }
        }
        return id;
    },

    ignore: function(handles, id) {
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
