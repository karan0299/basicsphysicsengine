// declaring our variables...
var context, controller, rectangle, loop;

// setting up the canvas...
context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 512;
context.canvas.width = 1080;

//setting up some music...
var bgsound = new Audio();
bgsound.src = "sound.mp3";
bgsound.play();

//setting up some graphics...



// Basic object in our environment...
rectangle = {

  height:32,
  jumping:true,
  width:32,
  x:512, // center of the canvas
  x_velocity:0,
  y:0,
  y_velocity:0

};

// Setting up the controller...
controller = {

  left:false,
  right:false,
  up:false,

  keyListener:function(event) {

    var key_state = (event.type == "keydown") ? true : false;

    switch(event.keyCode) {

      case 37:// left key
        controller.left = key_state;
      break;

      case 38:// up key
        controller.up = key_state;
      break;

      case 39:// right key
        controller.right = key_state;
      break;

    }
  }
};

// Starting the loop...
function loop() {

    if (controller.up && rectangle.jumping == false) {

        rectangle.y_velocity -= 20;
        rectangle.jumping = true;
    }

    if (controller.left) {

        rectangle.x_velocity -= 0.5;
    }

    if (controller.right) {

        rectangle.x_velocity += 0.5;
    }

    rectangle.y_velocity += 1.5;// gravity
    rectangle.x += rectangle.x_velocity;
    rectangle.y += rectangle.y_velocity;

    if (rectangle.y == 512-32-16){   // when rectangle is on ground...
        rectangle.x_velocity *= 0.9;  // friction
    }else{
        rectangle.x_velocity *=0.95; // air resistance
    }

    rectangle.y_velocity *= 0.95; // air resistance

    // if rectangle is falling below floor line
    if (rectangle.y > 512 - 16 - 32) {

        rectangle.jumping = false;
        rectangle.y = 512 - 16 - 32;
        rectangle.y_velocity = 0;

    }else if(rectangle.y < 0 ){  // is rectangle goes above the top line...
        rectangle.y = 0;
        rectangle.y_velocity = 10
    }

    // if rectangle is going off the left of the screen
    if (rectangle.x < -32) {

        rectangle.x = -32;
        rectangle.x_velocity = 10;


    } else if (rectangle.x > 1080) {// if rectangle goes past right boundary

        rectangle.x = 1080;
        rectangle.x_velocity = -10;

    }

    context.fillStyle = "#202020";
    context.fillRect(0, 0, 1080, 512);// x, y, width, height
    
    // Rectangle...
    context.fillStyle = "#ff0000";// hex for red
    context.beginPath();
    context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    context.fill();
    

    // Bottom line...
    context.strokeStyle = "#202830";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(0, 512 - 16);
    context.lineTo(1080, 512 -16);
    context.stroke();

    // call update when the browser is ready to draw again...
    window.requestAnimationFrame(loop);

    };

    window.addEventListener("keydown", controller.keyListener)
    window.addEventListener("keyup", controller.keyListener);
    loop();
