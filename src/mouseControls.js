var yaw = 90.0;
var pitch = 0.0;
var newfront = [];

// canvas.onmousedown = function(ev) {  //Mouse is pressed
//      oldx = ev.clientX;
//      oldy = ev.clientY;
//      dragging = true;
//    };
//
//    canvas.onmouseup = function(ev){ //Mouse is released
//      dragging = false;
//    }
//
//    canvas.onmousemove = function(ev) { //Mouse is moved
//      x = ev.clientX;
//      y = ev.clientY;
//      let offsetx = oldx - x;
//      let offsety = oldy - y;
//      let sensitivty = 0.05;
//      offsetx *= sensitivty;
//      offsety *= sensitivty;
//      if(dragging) {
//        yaw += offsetx
//        pitch += offsety
//        newfront[0] = Math.cos(yaw) * Math.cos(pitch);
//        newfront[1] = Math.sin(pitch);
//        newfront[2] = Math.sin(yaw) * Math.cos(pitch)
//        front = normalize(vec3(newfront[0], newfront[1], newfront[2]));
//      }
//      lastX = x;
//      lastY = y;
//
//    }
