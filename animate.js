// JavaScript Document
function animate(obj, target, callback) {
			clearInterval(obj.timer);
			obj.timer = setInterval(function() {
				var step = (target - obj.offsetLeft) / 10;
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				if(obj.offsetLeft == target) {
					clearInterval(obj.timer);
					if(callback) {
						callback();
					}
				}
				obj.style.left = obj.offsetLeft + step + 'px';
			}, 15);
		}
		var div = document.querySelector('div');
		
		var span = document.querySelector('span');
		var btn500 = document.querySelector('.btn500');
		var btn800 = document.querySelector('.btn800');
		btn500.addEventListener('click', function() {
			animate(span, 500);
		})
		btn800.addEventListener('click', function() {
			animate(span, 800, function() {
				span.style.backgroundColor = 'pink';
			});
		})
		animate(div, 300);