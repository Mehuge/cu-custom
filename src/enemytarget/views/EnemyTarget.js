var React = require("react");
var Reflux = require("reflux");

// Required for cuAPI.HandlesEnemyTarget
var cuAPI = require('../../cu-lib/API.js');

// The EnemyTarget UI component pulls together the EnemyTargetStore which
// tracks the "handlesEnemyTarget": true events and the UnitFrame that
// will render the unitframe.
var EnemyTargetStore = require("../../cu-lib/stores/EnemyTarget.js");
var UnitFrame = require("../../cu-lib/views/unitframe.js");

console.log("!!!!!ENEMY TARGET UI STARTING!!!!!");

var EnemyTarget = React.createClass({

	// Hook store up to component.  Each time character data is changed,
	// our state is updated, triggering a render
	mixins: [
		Reflux.connect(EnemyTargetStore, 'target')
	],

	// Provide an initial state (TODO: is there a better way to do this?)
	getInitialState: function() {
		console.log("ENEMY TARGET: Return INITIAL state");
		return {
			target: {
				name: "", race: "",
				health: 0, maxHealth: 100,
				stamina: 0, maxStamina: 100
			}
		};
	},

	// Render the unit frame using character data
	render: function() {
		var state = this.state, target = state.target;
		console.log("ENEMY TARGET STATE" + JSON.stringify(state));
		return (<UnitFrame
				className="enemy"
				name={target.name} race={target.race}
				health={target.health} maxHealth={target.maxHealth}
				stamina={target.stamina} maxStamina={target.maxStamina} />
			);
	}
});

module.exports = EnemyTarget;
