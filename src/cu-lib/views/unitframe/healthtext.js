var React = require("react");
var HealthText = React.createClass({
	render: function() {
		return (<div ref="text" id="health-text">{this.props.health} / {this.props.maxHealth}</div>);
	}
});
module.exports = HealthText;
