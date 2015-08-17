var React = require("react");

// We need access to cuAPI
var cuAPI = require("../cu-lib/API.js");

// And we are building a character Unit Frame
var EnemyTargetUnitFrame = require("./views/EnemyTarget.js");

// Render when cuAPI is ready.
cuAPI.on("init", function(){
	React.render(
		<EnemyTargetUnitFrame/>,
		document.getElementById("main")
	);
});
