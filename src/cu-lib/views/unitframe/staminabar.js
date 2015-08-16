var React = require("react");
var StaminaBar = React.createClass({
	render: function() {
		return (<div id="stamina-bar" style={{ width: this.props.width }}></div>);
	}
});
module.exports = StaminaBar;
