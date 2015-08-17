var React = require("react");
var StaminaText = React.createClass({
	render: function() {
		var text = '';
		if (this.props.maxStamina) {
			text = this.props.stamina + '/' + this.props.maxStamina;
		}
		return (<div ref="text" id="stamina-text">{text}</div>);
	}
});module.exports = StaminaText;