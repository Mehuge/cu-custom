(function() {
	var React = require("react");

	var Location = React.createClass({

		getData: function() {
			this.setState({ 
				fps: cuAPI.fps,
				x: cuAPI.locationX, y: cuAPI.locationY, z: cuAPI.locationZ
			});
		},

		getInitialState: function() {
			return {
				fps: 0,
				x: 0, y: 0, z: 0
			};
		},

		componentDidMount: function() {
			this.getData();
			setInterval(this.getData, this.props.pollInterval);
		},

		render: function() {
			var data = this.state;
			return (
				<span>
				{ 'FPS: ' + data.fps.toFixed(0) 
				+ ' Locaton: ' + data.x.toFixed(2) 
				+ ", " + data.y.toFixed(2) 
				+ ", " + data.z.toFixed(2) }
				</span>
			);
		}
	});

	// Run location UI at 5fps
	React.render(
	  <Location pollInterval={200}/>,
	  document.getElementById("loc")
	);

})();
