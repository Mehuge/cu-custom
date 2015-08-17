var React = require("react");
var HealthText = React.createClass({
	render: function() {
		var text = '';
		if (this.props.maxHealth) {
			text = this.props.health + '/' + this.props.maxHealth;
		}
		return (<div ref="text" id="health-text">{text}</div>);
	}
});
module.exports = HealthText;
