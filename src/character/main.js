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
			return (<div id="health-bar" style={{ width: this.props.width+'px' }}></div>);
		}
	});

	var HealthText = React.createClass({
		render: function() {
			return (<div id="health-text">{this.props.health} / {this.props.maxHealth}</div>);
		}
	});

	var StaminaBar = React.createClass({
		render: function() {
			return (<div id="stamina-bar" style={{ width: this.props.width+'px' }}></div>);
		}
	});

	var StaminaText = React.createClass({
		render: function() {
			return (<div id="stamina-text">{this.props.stamina} / {this.props.maxStamina}</div>);
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
				name: "",
				health: 0, 
				maxHealth: 0,
				stamina: 0,
				maxStamina: 0,
				width: 154,
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
			this.setState({
				healthWidth: document.getElementById("health-text").offsetWidth,
				staminaWidth: document.getElementById("stamina-text").offsetWidth
			})
		},
		render: function() {
			var healthWidth = this.state.maxHealth ? (this.state.health / this.state.maxHealth) * this.state.healthWidth : 0;
			var staminaWidth = this.state.maxStamina ? (this.state.stamina / this.state.maxStamina) * this.state.staminaWidth : 0;
			return (
				<div>
				<Portrait race={this.state.race}/>
	        	<Name name={this.state.name}/>
	        	<HealthBar width={healthWidth} />
	        	<HealthText health={this.state.health} maxHealth={this.state.maxHealth} />
	        	<StaminaBar width={staminaWidth} />
	        	<StaminaText stamina={this.state.stamina} maxStamina={this.state.maxStamina} />
	        	<Effects/>
	        	</div>
			);
		}
	});

	React.render(
		<Character/>, 
		document.getElementById("character")
	);
})();