var React = require("react");
var Reflux = require("reflux");

// Required for cuAPI.handlesCharacter
var cuAPI = require('../../cu-lib/API.js');

// The Character UI component pulls together the CharacterStore which
// tracks the "handlesCharacter": true events and the UnitFrame that
// will render the unitframe.
var CharacterStore = require("../../cu-lib/stores/Character.js");
var UnitFrame = require("../../cu-lib/views/unitframe.js");

var Character = React.createClass({

	// Hook store up to component.  Each time character data is changed,
	// our state is updated, triggering a render
	mixins: [
		Reflux.connect(CharacterStore, 'character')
	],

	// Provide an initial state (TODO: is there a better way to do this?)
	getInitialState: function() {
		return { character: CharacterStore.info };
	},

	// Render the unit frame using character data
	render: function() {
		var state = this.state, character = state.character;
		return (<UnitFrame
				className="character"
				name={character.name} race={character.race}
				health={character.health} maxHealth={character.maxHealth}
				stamina={character.stamina} maxStamina={character.maxStamina} />
			);
	}
});

module.exports = Character;
