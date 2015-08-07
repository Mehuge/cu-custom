(function(){

	var React = require("react");
	var Race = require("../lib/cu-race.js");
	var cuAPI = require("../lib/cuAPI.js");

	var Portrait = React.createClass({
		render: function() {
			return (
				<div id="portrait"
				style={{
					background: this.props.race
						? 'transparent url(images/portraits/' + this.props.race + '.jpg) no-repeat top left'
						: ''
			 	}}></div>
			 );
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
		getInitialState: function() {
			return {
				name: "",
				health: 0,
				maxHealth: 0,
				stamina: 0,
				maxStamina: 0,
				race: null
			}
		},
		componentDidMount: function() {
			var self = this;
			// monitor character events (handlesCharacter:true)
			cuAPI.OnCharacterRaceChanged(function(race) {
				self.setState({ race: Race[race].toLowerCase() });
			});
			cuAPI.OnCharacterNameChanged(function(name) {
				self.setState({ name: name });
			});
			cuAPI.OnCharacterStaminaChanged(function(stamina, maxStamina) {
				self.setState({
					stamina: stamina,
					maxStamina: maxStamina
				});
			});
			cuAPI.OnCharacterHealthChanged(function(health, maxHealth) {
				self.setState({
					health: health,
					maxHealth: maxHealth
				});
			});
		},
		render: function() {
			var state = this.state;
			return (<Character
					name={state.name} race={state.race}
					health={state.health} maxHealth={state.maxHealth}
					stamina={state.stamina} maxStamina={state.maxStamina}
			/>);
		}
	});

	cuAPI.OnInitialized(function(){
		React.render(
			<CharacterContainer/>,
			document.getElementById("character")
		);
	});

})();
