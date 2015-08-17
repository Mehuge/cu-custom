var cuAPI = require("../fake-API.js");

module.exports = function(handlers) {
    this.handlers = handlers;
    this.listening = false;
};

module.exports.prototype.start = function() {
    var init = this, handler = this.handlers["init"];
    // only actually start listening if someone has actually registered
    // a handler for these events.
    if (handler) {
        cuAPI.OnInitialized(function(){
            handler.fire();
        });
        this.listening = true;
    }
};
