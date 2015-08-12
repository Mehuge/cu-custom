(function(){

	var React = require("react");
	var Reflux = require("reflux");
	var cuAPI = require("../cu-lib/API.js");
	var CharacterStore = require("../cu-lib/stores/character.js");

	var Portrait = React.createClass({
		render: function() {
			var  bg = this.props.race ?
					'transparent url(images/portraits/' + this.props.race + '.jpg) no-repeat top left'
					: '';
			console.log(bg);
			return (<div id="portrait" style={{ background: bg }}></div>);
		}
	});

	var Name = React.createClass({
		render: function() {
			return (<div id="name">{this.props.name}</div>);
		}
	});

	var HealthBar = React.createClass({
		render: function() {
			return (<div id="health-bar" style={{ width: this.props.width }}></div>);
		}
	});

	var HealthText = React.createClass({
		render: function() {
			return (<div ref="text" id="health-text">{this.props.health} / {this.props.maxHealth}</div>);
		}
	});

	var StaminaBar = React.createClass({
		render: function() {
			return (<div id="stamina-bar" style={{ width: this.props.width }}></div>);
		}
	});

	var StaminaText = React.createClass({
		render: function() {
			return (<div ref="text" id="stamina-text">{this.props.stamina} / {this.props.maxStamina}</div>);
		}
	});

	var Effects = React.createClass({
		render: function() {
			return (<div id="effects"></div>);
		}
	});

	var Character = React.createClass({
		getInitialState: function() {
			return {
				healthWidth: 0,
				staminaWidth: 0,
			}
		},
		componentDidMount: function() {
			this.setState({
				healthWidth: this.refs.healthText.getDOMNode().offsetWidth,
				staminaWidth: this.refs.staminaText.getDOMNode().offsetWidth
			});
		},
		render: function() {
			var healthWidth = this.props.maxHealth ? (this.props.health / this.props.maxHealth) * this.state.healthWidth : 0;
			var staminaWidth = this.props.maxStamina ? (this.props.stamina / this.props.maxStamina) * this.state.staminaWidth : 0;
			return (
				<div>
					<Portrait race={this.props.race}/>
			        <Name name={this.props.name}/>
			        <HealthBar width={healthWidth} />
			        <HealthText ref="healthText" health={this.props.health} maxHealth={this.props.maxHealth} />
			        <StaminaBar width={staminaWidth} />
			        <StaminaText ref="staminaText" stamina={this.props.stamina} maxStamina={this.props.maxStamina} />
			        <Effects/>
			    </div>
			);
		}
	});

	var CharacterContainer = React.createClass({
		mixins: [
			Reflux.connect(CharacterStore, 'character')
		],
		getInitialState: function() {
			return {
				character: {
					name: "", race: "",
					health: 0, maxHealth: 100,
					stamina: 0, maxStamina: 100
				}
			}
		},
		componentDidMount: function() {
			cuAPI.HandlesCharacter.start();
		},
		render: function() {
			var state = this.state, character = state.character;
			return (<Character
					name={character.name} race={character.race}
					health={character.health} maxHealth={character.maxHealth}
					stamina={character.stamina} maxStamina={character.maxStamina} />
				);
		}
	});

	cuAPI.on("init", function(){
		cuAPI.OpenUI("mehuge-chat.ui");
		React.render(
			<CharacterContainer/>,
			document.getElementById("character")
		);
	});

})();
