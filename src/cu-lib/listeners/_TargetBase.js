var cuAPI = require("../fake-API.js");
var Race = require("../enums/Race.js");

module.exports = function(handlers, _super) {
    this._super = _super;
    _super.handlers = handlers;
    _super.listening = false;
};

module.exports.prototype.listen = function(type) {
    var target = this._super, handler = target.handlers[type.toLowerCase()];

    // only actually start listening if someone has actually registered
    // a handler for these events.
    if (handler) {
        var hasRace = "On"+type+"RaceChanged" in cuAPI;

        // Set initial state
        console.log(type + " LISTENER: Initialise State");
        target.name = "";
        if (hasRace) {
            target.race = "";
            target.raceID = -1;
        }
        target.health = target.stamina = 0;
        target.maxHealth = target.maxStamina = 100;
        handler.fire(target);

        // Target Name
        console.log(type + ' LISTENER: Listen for NAME change');
        cuAPI["On"+type+"NameChanged"](function(name) {
            console.log('target name ' + name);
            target.name = name;
            handler.fire(target);
        });

        // Target Race (only Character has this atm)
        if (hasRace) {
            console.log(type + ' LISTENER: Listen for RACE change');
            cuAPI["On"+type+"RaceChanged"](function(race) {
                console.log('target race ' + race);
                if (race === -1) {
                    target.race = "";
                    target.raceID = -1;
                } else {
                    target.race = Race[race].toLowerCase();
                    target.raceID = race;
                }
                handler.fire(target);
            });
        }

        // Target Stamina
        console.log(type + ' LISTENER: Listen for STAMINA change');
        cuAPI["On" + type + "StaminaChanged"](function(stamina, maxStamina) {
            console.log('target stamina ' + stamina + "/" + maxStamina);
            target.stamina = stamina;
            target.maxStamina = maxStamina;
            handler.fire(target);
        });

        // Target Health
        console.log(type + ' LISTENER: Listen for HEALTH change');
        cuAPI["On"+type+"HealthChanged"](function(health, maxHealth) {
            console.log('target health ' + health + "/" + maxHealth);
            target.health = health;
            target.maxHealth = maxHealth;
            handler.fire(target);
        });

        // We are now listening
        target.listening = true;
    }
};
