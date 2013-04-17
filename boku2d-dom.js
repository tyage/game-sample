(function() {

var initDOM = function (obj, elem) {
	var key, data = jQuery(elem).data();
	for (key in data) {
		if (data.hasOwnProperty(key)) {
			obj[key] = data[key];
		}
	}
};

Boku2D.Object.prototype.elem = null;
Boku2D.Object.prototype.drawElem = function(time) {
	var elem = this.elem;
	if (elem) {
		var pos = this._minPos,
			size = this.size;
		elem.style.left = pos.x + "px";
		elem.style.top = pos.y + "px";
		elem.style.width = size.x + "px";
		elem.style.height = size.y + "px";
	}
};
Boku2D.Object.prototype.initDOM = function(option) {
	var $elem = jQuery(option),
		pos = $elem.position();
		
	initDOM(this, option);
	this.elem = option;
	this.size = new Boku2D.Vec($elem.width(), $elem.height());
	this.center = (new Boku2D.Vec(pos.left, pos.top))
		.add(this.size.divide(2));
};

Boku2D.World.prototype.initDOM = function(option) {
	var $elem = jQuery(option);
	
	initDOM(this, option);
	this.size = new Boku2D.Vec($elem.width(), $elem.height());
};

})();
