var React = require("react");

// Include the Unit Frame views
var Portrait = require('./unitframe/portrait.js');
var Name = require('./unitframe/name.js');
var HealthBar = require('./unitframe/healthbar.js');
var HealthText = require('./unitframe/healthtext.js');
var StaminaBar = require('./unitframe/staminabar.js');
var StaminaText = require('./unitframe/staminatext.js');
var Effects = require('./unitframe/effects.js');

var UnitFrame = React.createClass({
    getInitialState: function() {
        return {
            healthWidth: 0,
            staminaWidth: 0,
        };
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
module.exports = UnitFrame;
