var React = require("react");
var Portrait = React.createClass({
	render: function() {
		var  bg = this.props.race ?
				'transparent url(images/portraits/' + this.props.race + '.jpg) no-repeat top left'
				: '';
		return (<div id="portrait" style={{ background: bg }}></div>);
	}
});module.exports = Portrait;