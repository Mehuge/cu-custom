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
        target.name = "";
        if (hasRace) {
            target.race = "";
            target.raceId = -1;
        }
        target.health = target.stamina = 0;
        target.maxHealth = target.maxStamina = 100;
        handler.fire(target);

        // Target Name
        cuAPI["On"+type+"NameChanged"](function(name) {
            target.name = name;
            handler.fire(target);
        });

        // Target Race (only Character has this atm)
        if (hasRace) {
            cuAPI["On"+type+"RaceChanged"](function(race) {
                if (race === -1) {
                    target.race = "";
                    target.raceId = -1;
                } else {
                    target.race = Race[race].toLowerCase();
                    target.raceId = race;
                }
                handler.fire(target);
            });
        }

        // Target Stamina
        cuAPI["On" + type + "StaminaChanged"](function(stamina, maxStamina) {
            target.stamina = stamina;
            target.maxStamina = maxStamina;
            handler.fire(target);
        });

        // Target Health
        cuAPI["On"+type+"HealthChanged"](function(health, maxHealth) {
            target.health = health;
            target.maxHealth = maxHealth;
            handler.fire(target);
        });

        // We are now listening
        target.listening = true;
    }
};
