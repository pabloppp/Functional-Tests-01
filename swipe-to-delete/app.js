"use strict"
var app = angular.module('app', [])
.controller("mainCtrl", function($timeout){

	var main = this;

	main.moving;
	main.ems = 1;

	main.reloading = false;

	main.listElements = [
		{value: "uno"},
		{value: "dos"},
		{value: "tres"},
		{value: "cuatro"},
		{value: "cinco"}
	]

	main.destroy = function(element, $event){
		$event.element.classList.add("deleted");
		$timeout(function(){
			var position = main.listElements.indexOf(element);
			main.listElements.splice(position, 1);
			console.log(position);
		}, 500);
	}

	main.update = function(element, $event){
		/*var position = main.listElements.indexOf(element);
		main.listElements[position] = element+"+";
		console.log(position);*/
		main.reloading = true;
		$timeout(function(){
			$event.reset();
			main.reloading = false;
			element.value += " +";
		}, 1000);
		
	}

	main.swiping = function(elem, $event){
		//console.log($event);
		main.opacity = Math.abs($event.amount) / ($event.width/2);
		console.log(main.ems);
	}

	/*main.mouseDown = function($event){
		main.moving = $event.srcElement;
		main.moving.startx = $event.x;
		console.log("down");
	}

	main.mouseUp = function($event){
		if(main.moving){
			var aelem = angular.element(main.moving);
			aelem.css('transition', "all 0.3s");
			var disp = parseInt(aelem.css('left'), 10);
			var elemW = aelem[0].clientWidth;
			if(disp > elemW/2) aelem.css('left', elemW+"px");
			else if(disp < -elemW/2) aelem.css('left', -elemW+"px");
			else  aelem.css('left', "0px");
		}
		main.moving = null;
		console.log("up");
	}

	main.mouseMove = function($event){
		console.log("move");
		var elem = $event.srcElement;
		if(main.moving === elem){
			var aelem = angular.element(main.moving);
			var disp = $event.x-main.moving.startx;
			aelem.css('transition', "all 0s");
			aelem.css('left', disp+"px");
			//console.log($event.x-main.moving.startx);
		}
	}

	main.test = function(){
		console.log("AAA");
	}*/

})
.directive("ngSmartlist", function($timeout){
	return {
		link: function(scope, element, attrs){
			var setup = function(){
				var elements = element.find("li");
				for(var i=0; i<elements.length; i++){
					(function(){
						var rawElem = elements[i];
						var elem = angular.element(rawElem);
						var content = elem.html();

						if(rawElem._setted) return;

						if(rawElem.getElementsByClassName("left-bg").length > 0){
							elem._allowRight = true;
						}
						if(rawElem.getElementsByClassName("right-bg").length > 0){
							elem._allowLeft = true;
						}

						var touchStart = function($event){
							//console.log($event);
							if(!elem._dragging && !elem._disabled){
								elem._initX = $event.x || $event.touches[0].clientX;
								elem._dragging = true;
								console.log("start");
								elem.css("transition", "all 0s");
								elem._timeStart = new Date().getTime();
							}
						}

						var touchEnd = function($event){
							//console.log($event);
							if(elem._dragging && !elem._disabled){
								elem._dragging = false;
								var width = elem[0].clientWidth;
								var left = parseInt(elem.css("left"), 10);	
								console.log("end");
								elem.css("transition", "all 0.1s");

								var elapsedTime = (new Date().getTime()) - elem._timeStart;
								console.log(elapsedTime);
								var dragged = elapsedTime < 200 && Math.abs(left) > 10 ? true : false;
								if(left > width/2 || left < -width/2 || dragged){
									var sign  = left > 0 ? 1 : -1;
									elem._disabled = true;
									elem.css('left', (sign*width)+"px");
									$timeout(function(){
										var fn;
										if(sign > 0) fn = elem.attr("swiped-right");
										else fn = elem.attr("swiped-left");
										elem.scope().$event = {
											reset: reset,
											element: rawElem
										}
										if(fn) elem.scope().$eval(fn);	
									}, 200);
								}
								else {
									elem.css('left', "0px");
								}
							}
							
						}

						var touchMove = function($event){
							if(elem._dragging && !elem._disabled){
								var currentX = $event.x || $event.touches[0].clientX;
								var displacement = currentX - elem._initX;
								var width = elem[0].clientWidth;
								if(displacement > 0 && !elem._allowRight) displacement = 0;
								else if(displacement < 0 && !elem._allowLeft) displacement = 0;

								elem.css("left", displacement+"px");

								$timeout(function(){
									var fn = elem.attr("swiping");
									elem.scope().$event = {
										amount: displacement,
										width: width,
										element: rawElem
									}
									if(fn) elem.scope().$eval(fn);	
								}, 0);

							}
						}

						var reset = function(){
							console.log("resetting");
							elem.css('left', "0px");
							elem._disabled = false;
						}

						elem.on("touchstart", touchStart);
						elem.on("mousedown", touchStart);

						elem.on("touchend", touchEnd);
						elem.on("touchleave", touchEnd);
						elem.on("mouseup", touchEnd);
						elem.on("mouseleave", touchEnd);

						elem.on("touchmove", touchMove);
						elem.on("mousemove", touchMove);

						rawElem._setted = true;

					})()
				}
			}
			setup();

			scope.$watch(function(){ 
				return element.html() 
			}, function(){
				setup();
			})
		}
	}
})