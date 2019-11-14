var yaw = -90.0;
var pitch = 0.0;
var lastX;
var lastY;

class Camera{

  constructor(type){
    if(type === "orbital"){
      //*******************drag orbital camera*************
      canvas.onmousedown = function(event) {  //Mouse is pressed
           x = event.clientX;
           y = event.clientY;
           var rect = event.target.getBoundingClientRect();
           if (rect.left <= x && rect.right > x &&
            rect.top <= y && rect.bottom > y) {
            lastX = x;
            lastY = y;
            dragging = true;
        }
         };

       canvas.onmouseup = function(event){ //Mouse is released
         dragging = false;
       }

       canvas.onmousemove = function(event) { //Mouse is moved
         if(dragging) {
           x = event.clientX;
           y = event.clientY;
           dx = (x - lastX)/canvas.width;
           dy = (y - lastY)/canvas.height;
           let scale = 50;
           yaw += scale * dx
           // yaw = Math.max(Math.min(yaw, 90), -90);
           pitch += scale * dy;
           pitch = Math.max(Math.min(pitch, 90), -90);
           at = vec3(Math.sin(yaw), pitch, -Math.cos(yaw));
         }
         lastX = x;
         lastY = y;
       }
    } else {
      //*****************************************************
      // START OF LOCK MOSUSE FPS CAMERA
      canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock;
      document.exitPointerLock = document.exitPointerLock ||
                                 document.mozExitPointerLock;
      canvas.onclick = function() {
        canvas.requestPointerLock();
      };

      // pointer lock event listeners

      // Hook pointer lock state change events for different browsers
      document.addEventListener('pointerlockchange', lockChangeAlert, false);
      document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

      function lockChangeAlert() {
        if (document.pointerLockElement === canvas ||
            document.mozPointerLockElement === canvas) {
          console.log('The pointer lock status is now locked');
          document.addEventListener("mousemove", updatePosition, false);
        } else {
          console.log('The pointer lock status is now unlocked');
          document.removeEventListener("mousemove", updatePosition, false);
        }
      }

      function updatePosition(event){
        let xscale = 0.1;
        let yscale = 0.1;
        yaw += xscale * event.movementX;
        pitch += yscale * event.movementY;
        pitch = Math.max(Math.min(pitch, 89), -89);
        at = vec3(Math.cos((Math.PI/180) *pitch) * Math.cos((Math.PI/180) * yaw), Math.sin((Math.PI/180) * pitch), Math.cos((Math.PI/180) *pitch) * Math.sin((Math.PI/180) *yaw));
      }
    }
  }
}

window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);

window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

function tick(){
  if (keyState[38] || keyState[87]){
    forwardX += at[0] * 0.005; // move in forward in direction camera
    forwardZ += at[2] * 0.005; // move in forward in direction camera
    bobs += 0.1;//for bobbing during walking
  }
  if (keyState[40] || keyState[83]){
    forwardX -= at[0] * 0.005; // move in backwards in direction camera
    forwardZ -= at[2] * 0.005; // move in backwards in direction camera
    bobs -= 0.1;//for bobbing during walking
  }
  // if (keyState[65] || keyState[65]){
  //   forwardX += at[0] * 0.005; // move in forward in direction camera
  //   bobs += 0.1;//for bobbing during walking
  // }
  // if (keyState[68] || keyState[68]){
  //   forwardX += at[0] * 0.005; // move in forward in direction camera
  //   forwardZ += at[2] * 0.005; // move in forward in direction camera
  //   bobs += 0.1;//for bobbing during walking
  // }
  eye[0] = Math.sin(dy) * Math.cos(dx) + forwardX;
  eye[1] = 0.01 * Math.cos(bobs) + 0.4; //0.25 for stationary
  eye[2] = Math.cos(dy) * Math.cos(dx) + forwardZ;
  console.log()
}
