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
	}, 1000/60);

	$('.object.editable').click(function() {
		var object = $(this).data('object');
		
		$('.checked').removeClass('checked');
		$(this).addClass('checked');
		
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
 // 質量です\n\
 weight: "+object.weight+",\n\
 // 反発係数です\n\
 elastic: "+object.elastic+",\n\
 // 粘性係数です\n\
 viscosity: "+object.viscosity+",\n\
 // 摩擦係数です\n\
 friction: "+object.friction+",\n\
 // 常に実行される関数です\n\
 beforeStep: "+object.beforeStep+",\n\
 // ゆるミンとぶつかったときに実行される関数です\n\
 createContact: "+object.createContact+"\n\
}")
			.data('object', object);
	});
	$('#code').keyup(function() {
		var object = $(this).data('object'),
			data = (new Function("return "+$(this).val()))();
		
		for (key in data) {
			object[key] = data[key];
		}
	});
});
