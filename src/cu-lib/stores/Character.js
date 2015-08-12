var Reflux = require('reflux');
var cuAPI = require('../API.js');
var Race = require('../enums/Race.js');

module.exports = Reflux.createStore({
   listenables: [ cuAPI.HandlesCharacter ],
   start: function() {
      var store = this;
      cuAPI.on("character", function(character) {
          store.info = {
              name: character.name,
              race: character.race,
              health: character.health,
              maxHealth: character.maxHealth,
              stamina: character.stamina,
              maxStamina: character.maxStamina
          };
          store.trigger(store.info);
      });
   }
});
