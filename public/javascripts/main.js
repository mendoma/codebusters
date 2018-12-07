document.addEventListener('DOMContentLoaded', function () {

})

//================p5js======================
var socket;

function setup() {
 createCanvas(windowWidth, windowHeight);
 bg = loadImage("../images/bg_1.png")
 background(bg, [-250]);
 // Start a socket connection to the server
 // Some day we would run this server somewhere else
 socket = io.connect('http://localhost:3000');
 // We make a named event called 'mouse' and write an
 // anonymous callback function
 socket.on('mouse',
   // When we receive data
   function(data) {
     console.log("Got: " + data.x + " " + data.y);
     // Draw a blue circle
     fill(255,0,0);
     noStroke();
     ellipse(data.x, data.y, 10, 10);
   }
 );
}

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
 }

function draw() {
 // Nothing
}

function mouseDragged() {
 // Draw some white circles
 fill(255);
 noStroke();
 ellipse(mouseX,mouseY,10,10);
 // Send the mouse coordinates
 sendmouse(mouseX,mouseY);
}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
 // We are sending!
 //console.log("sendmouse: " + xpos + " " + ypos);

 // Make a little object with  and y
 var data = {
   x: xpos,
   y: ypos
 };

 // Send that object to the socket
 socket.emit('mouse',data);
}
//================p5js end==================