var React = require("react");
var Name = React.createClass({
	render: function() {
		return (<div id="name">{this.props.name}</div>);
	}
});
module.exports = Name;
