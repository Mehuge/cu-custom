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

        // Set initial state
        console.log("CHARACTER STORE: Initialise Store State");
        this.name = this.race = "";
        this.raceID = -1;
        this.health = this.stamina = 0;
        this.maxHealth = this.maxStamina = 100;
        handler.fire(character);

        // Character Name
        console.log('Character Store: Listen for NAME change');
        cuAPI.OnCharacterNameChanged(function(name) {
            // design? store properties directly in the object or in a
            // member hash?  Exposing "character" listener interface to the
            // callback or just the data?  The listener could provide extra
            // functionality to the handler through its interface. Can't
            // think of a use-case off hand though.
            console.log('character name ' + name);
            character.name = name;
            handler.fire(character);
        });

        // Character Race
        console.log('Character Store: Listen for RACE change');
        cuAPI.OnCharacterRaceChanged(function(race) {
            console.log('character race ' + race);
            if (race === -1) {
                character.race = "";
                character.raceID = -1;
            } else {
                character.race = Race[race].toLowerCase();
                character.raceID = race;
            }
            handler.fire(character);
        });

        // Character Stamina
        console.log('Character Store: Listen for STAMINA change');
        cuAPI.OnCharacterStaminaChanged(function(stamina, maxStamina) {
            console.log('character stamina ' + stamina + "/" + maxStamina);
            character.stamina = stamina;
            character.maxStamina = maxStamina;
            handler.fire(character);
        });

        // Character Health
        console.log('Character Store: Listen for HEALTH change');
        cuAPI.OnCharacterHealthChanged(function(health, maxHealth) {
            console.log('character health ' + health + "/" + maxHealth);
            character.health = health;
            character.maxHealth = maxHealth;
            handler.fire(character);
        });

        // We are now listening
        this.listening = true;
    }
};
