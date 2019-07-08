
export var mouse = {};

mouse.x = 0;
mouse.y = 0;
mouse.delta = { x: 0, y: 0 };
mouse.last = { x: 0, y: 0 };
mouse.clic = false;

mouse.onmove = function(event)
{
	mouse.x = event.clientX;
	mouse.y = event.clientY;
};

mouse.update = function(elapsed)
{
  mouse.delta.x = mouse.last.x - mouse.x;
  mouse.delta.y = mouse.last.y - mouse.y;
  mouse.last.x = mouse.x;
  mouse.last.y = mouse.y;
}

mouse.onmousedown = function(event)
{
	mouse.clic = true;
};

mouse.onmouseup = function(event)
{
	mouse.clic = false;
};

mouse.onmouseout = function(event)
{
  mouse.clic = false;
  mouse.delta.x = 0;
  mouse.delta.y = 0;
};

window.addEventListener('mousemove', mouse.onmove, false);
window.addEventListener('mousedown', mouse.onmousedown, false);
window.addEventListener('mouseout', mouse.onmouseout, false);
window.addEventListener('mouseup', mouse.onmouseup, false);