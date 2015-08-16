var React = require("react");
var StaminaText = React.createClass({
	render: function() {
		return (<div ref="text" id="stamina-text">{this.props.stamina} / {this.props.maxStamina}</div>);
	}
});module.exports = StaminaText;