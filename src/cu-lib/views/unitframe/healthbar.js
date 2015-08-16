var React = require("react");
var HealthBar = React.createClass({
	render: function() {
		return (<div id="health-bar" style={{ width: this.props.width }}></div>);
	}
});
module.exports = HealthBar;
