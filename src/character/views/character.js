var React = require("react");
var Reflux = require("reflux");

// Required for cuAPI.HandlesCharacter
var cuAPI = require('../../cu-lib/API.js');

// The Character UI component pulls together the CharacterStore which
// tracks the "handlesCharacter": true events and the UnitFrame that
// will render the unitframe.
var CharacterStore = require("../../cu-lib/stores/character.js");
var UnitFrame = require("../../cu-lib/views/unitframe.js");

console.log("!!!!!CHARACTER UI STARTING!!!!!");

var Character = React.createClass({

	// Hook store up to component.  Each time character data is changed,
	// our state is updated, triggering a render
	mixins: [
		Reflux.connect(CharacterStore, 'character')
	],

	// Provide an initial state (TODO: is there a better way to do this?)
	getInitialState: function() {
		console.log("CHARACTER: Return INITIAL state");
		console.log("CHARACTER STORE INFO " + CharacterStore.info);
		return {
			character: {
				name: "", race: "",
				health: 0, maxHealth: 100,
				stamina: 0, maxStamina: 100
			}
		};
	},

	// Render the unit frame using character data
	render: function() {
		var state = this.state, character = state.character;
		console.log("CHARACTER STATE" + JSON.stringify(state));
		return (<UnitFrame
				name={character.name} race={character.race}
				health={character.health} maxHealth={character.maxHealth}
				stamina={character.stamina} maxStamina={character.maxStamina} />
			);
	}
});

module.exports = Character;
