var React = require("react");

// We need access to cuAPI
var cuAPI = require("../cu-lib/API.js");

// And we are building a character Unit Frame
var CharacterUnitFrame = require("./views/character.js");

// Render when cuAPI is ready.
cuAPI.on("init", function(){
	cuAPI.OpenUI("mehuge-chat.ui");
	React.render(
		<CharacterUnitFrame/>,
		document.getElementById("character")
	);
});
