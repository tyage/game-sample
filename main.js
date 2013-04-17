$(function(){
	Boku2D.Object.prototype.elastic = 10;
	Boku2D.Object.prototype.viscosity = 3;
	Boku2D.Object.prototype.afterStep = Boku2D.Object.prototype.drawElem;
	Boku2D.Model.cloud = $.extend(false, Boku2D.Model.fixed, {
		elastic: 0.3,
		createContact: function(contact, manifold) {
			if (manifold.direction.y < 0) {
				var manifolds = contact.manifolds;
				for (var i=0,l=manifolds.length;i<l;i++) {
					manifolds[i].direction.x = 0;
					manifolds[i].direction.y = 0;
				}
			}
		}
	});
	Boku2D.Model.enemy = $.extend(false, Boku2D.Model.block, {
		randForce: new Boku2D.Vec(100, 0),
		beforeStep: function(time) {
			if (this.randForce) {
				this.applyForce(this.randForce.multiply(Math.random()-0.5));
			}
			if (this.randJump && Math.random() < 0.1 && this.canJump()) {
				this.applyForce(this.randJump);
			}
		}
	});
	
	var world = new Boku2D.World();
	world.initDOM($('#world').get(0));

	$('.object.fixed').each(function () {
		var object = new Boku2D.Object(Boku2D.Model.fixed);
		object.initDOM($(this).get(0));
		world.createObject(object);
		$(this).data('object', object);
	});
	$('.object.controll').each(function () {
		var object = window.aobject = new Boku2D.Object(Boku2D.Model.controll);
		object.initDOM($(this).get(0));
		world.createObject(object);
		$(this).data('object', object);
	});
	
	var timer = setInterval(function () {
		world.step(0.1);
	}, 13);

	$('.object.editable').click(function() {
		var object = $(this).data('object'), 
			data = {
			center: object.center,
			size: object.size,
			createContact: (function() {
				alert(1);
			}) + ""
		};
		$('#code')
			.val("\
{\n\
 // 場所の座標です\n\
 center: {\n\
  x: "+object.center.x+",\n\
  y: "+object.center.y+"\n\
 },\n\
 // 大きさです\n\
 size: {\n\
  x: "+object.size.x+",\n\
  y: "+object.size.y+"\n\
 },\n\
 // ゆるみんとぶつかったときに実行される関数です\n\
 createContact: "+object.createContact+"\n\
}")
			.data('object', object);
	});
	$('#code').keyup(function() {
		var object = $(this).data('object'),
			data = (new Function("return "+$(this).val()))();
		
		object.center = data.center;
		object.size = data.size;
		object.createContact = data.createContact;
	});
});
