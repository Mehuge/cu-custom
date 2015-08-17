var React = require("react");
var Reflux = require("reflux");

// Required for cuAPI.HandlesFriendlyTarget
var cuAPI = require('../../cu-lib/API.js');

// The FriendlyTarget UI component pulls together the FriendlyTargetStore which
// tracks the "handlesFriendlyTarget": true events and the UnitFrame that
// will render the unitframe.
var FriendlyTargetStore = require("../../cu-lib/stores/FriendlyTarget.js");
var UnitFrame = require("../../cu-lib/views/unitframe.js");

console.log("!!!!!FRIENDLY TARGET UI STARTING!!!!!");

var FriendlyTarget = React.createClass({

	// Hook store up to component.  Each time FriendlyTarget data is changed,
	// our state is updated, triggering a render
	mixins: [
		Reflux.connect(FriendlyTargetStore, 'target')
	],

	// Provide an initial state (TODO: is there a better way to do this?)
	getInitialState: function() {
		console.log("FRIENDLY TARGET: Return INITIAL state");
		return { target: FriendlyTargetStore.info };
	},

	// Render the unit frame using target data
	render: function() {
		var state = this.state, target = state.target;
		console.log("FRIENDLY TARGET STATE" + JSON.stringify(state));
		return (<UnitFrame
				className="enemy"
				name={target.name} race={target.race}
				health={target.health} maxHealth={target.maxHealth}
				stamina={target.stamina} maxStamina={target.maxStamina} />
			);
	}
});

module.exports = FriendlyTarget;
