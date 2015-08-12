var cuAPI = require("../fake-API.js");
var Race = require("../enums/Race.js");

module.exports = function(handlers) {
    this.handlers = handlers;
    this.listening = false;
};

module.exports.prototype.start = function() {
    var character = this, handler = this.handlers["character"];

    // only actually start listening if someone has actually registered
    // a handler for these events.
    if (handler) {
        // Character Name
        cuAPI.OnCharacterNameChanged(function(name) {
            // design? store properties directly in the object or in a
            // member hash?  Exposing "character" listener interface to the
            // callback or just the data?  The listener could provide extra
            // functionality to the handler through its interface. Can't
            // think of a use-case off hand though.
            character.name = name;
            console.log('character name ' + name);
            handler.fire(character);
        });

        // Character Race
        cuAPI.OnCharacterRaceChanged(function(race) {
            character.race = Race[race].toLowerCase();
            character.raceID = race;
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
};
