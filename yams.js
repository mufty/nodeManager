var exports = module.exports = {};

var listeners = {};

exports.addListener = function(ev, cb){
	if(listeners[ev])
		listeners[ev].push(cb);
	else {
		listeners[ev] = [];
		listeners[ev].push(cb);
	}
};

exports.removeListener = function(cb){
	for(var k in listeners){
		var eventListeners = listeners[k];
		var index = eventListeners.indexOf(cb);
		if(index > -1){
			eventListeners.splice(index, 1);
		}
	}
};

exports.triggerEvent = function(ev){
	if(listeners[ev]){
		for(var i in listeners[ev]){
			var cb = listeners[ev][i];
			cb(ev);
		}
	}
};