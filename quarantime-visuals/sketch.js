let mainPage = true;
let timeGoalPage = false;
let timerPage = false;

let title = 'Q U A R A N T I M E';
var fade;
var fade2;
var fade3;
var fadeAmount = 1;
var fadeAmount2 = -50;
var fadeAmount3 = 1;


let r;
let stri = "testing something";
let redCircle = 0;
let blueCircle = 0;
let intVar = 1;
let secondsRadius;
let cx, cy;

let secondRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;

let timer = 6;

function preload() {
  font = loadFont('Bauhaus 93 Regular.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0,0,0);
  r = ceil(random(0, 20));
  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.48;
  secondRadius = radius * 0.44;
  secondRadius2 = radius * 0.55;
  clockDiameter = radius * 1.7;
  cx = windowWidth / 2;
  cy = windowHeight / 2;
  fade = 0;
  fade2 = 0;
  fade3 = 0;

}

function draw() {
  background(0,0,0);

  if(mainPage === true){
    noStroke();
    fill(234,62,51);
    rect(0,0, windowWidth/5, windowHeight);

    noStroke();
    fill(236,92,60);
    rect(windowWidth/5,0, windowWidth/5, windowHeight);

    noStroke();
    fill(238,134,49);
    rect(windowWidth/5 + windowWidth/5,0, windowWidth/5, windowHeight);

    noStroke();
    fill(80,167,161);
    rect(windowWidth/5 + windowWidth/5 + windowWidth/5,0, windowWidth/5, windowHeight);

    noStroke();
    fill(34,81,89);
    rect(windowWidth/5 + windowWidth/5 + windowWidth/5 + windowWidth/5,0, windowWidth/5, windowHeight);

    // Angles for sin() and cos() start at 3 o'clock;
    // subtract HALF_PI to make them start at the top
    let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;


    //hands of clock main page
    stroke(33,82,89,fade2);
    strokeWeight(1);
    line(cx, cy, cx + cos(s) * secondRadius, cy + sin(s) * secondRadius);
    //hands of clock main page

    //dot cirles
    stroke(33,82,89,fade3);
    strokeWeight(4);
    beginShape(POINTS);
    for (let a = 0; a < 360; a += 6) {
      let angle = radians(a);
      let x = cx + cos(angle) * secondRadius2;
      let y = cy + sin(angle) * secondRadius2;
      vertex(x, y);
    }
    endShape();


    textAlign(CENTER, CENTER);
    fill(255, 255, 255, fade);
    noStroke();
    textFont(font, 100);
    text(str(title), windowWidth/2, windowHeight/2);

    //fade for title
    if (fade<0) fadeAmount=1;
    fade += fadeAmount*1.4;

    //fade for tick
    if (fade2<0) fadeAmount2=1;
    if (fade2< 70) fade2 += fadeAmount2*1.0;

    //fade for circle
    if (fade3<0) fadeAmount3=1;
    if (fade3< 70) fade3 += fadeAmount3*0.9;
  }

  if (keyCode === ENTER){
    mainPage = false;
    timeGoalPage = true;
  }
  //on enter create timer
  if (timeGoalPage === true){

    noStroke();
    fill(234,62,51);
    rect(0,0, windowWidth/2, windowHeight);

    noStroke();
    fill(34,81,89);
    rect(windowWidth/2,0, windowWidth/2, windowHeight);

    ellipseMode(CENTER);
    noStroke();
    fill(238,134,49);
    ellipse(windowWidth/2,windowHeight/2, windowWidth/3, windowWidth/3);

    textAlign(CENTER, CENTER);
    fill(255,255,255);
    noStroke();
    textFont(font, 100);
    text(str(r), windowWidth/2, windowHeight/2-12);

    let hr = hour();
    let mn = min();
    let sc = second();

    //circle
    strokeWeight(30);
    stroke(255);
    noFill();
    ellipse(windowWidth/2,windowHeight/2,windowWidth/3,windowWidth/3);

    strokeWeight(32);
    stroke(33,82,89);

    blueCircle = increaseBluePath(blueCircle);
    arc(windowWidth/2,windowHeight/2,windowWidth/3,windowWidth/3,blueCircle,-blueCircle);


    //arc
    strokeWeight(32);
    stroke(234,62,51);
    redCircle = decreaseRedPath(redCircle);

    arc(windowWidth/2,windowHeight/2,windowWidth/3,windowWidth/3,-redCircle,redCircle);

    strokeWeight(8);
    stroke(33,82,89);
    beginShape(POINTS);
    for (let a = 0; a < 360; a += 12) {
      let angle = radians(a);
      let x = cx + cos(angle) * secondsRadius;
      let y = cy + sin(angle) * secondsRadius;
      vertex(x, y);
    }
    endShape();

    //text time to pick up
    textAlign(CENTER, CENTER);
    fill(34,81,89);
    noStroke();
    textFont(font, 25);
    text("T I M E   T O", windowWidth/2, windowHeight/2-80);
    text("P I C K   U P", windowWidth/2, windowHeight/2+80);
  }

  if(keyCode === BACKSPACE){
    timerPage = true;
    timeGoalPage = false;
    mainPage = false;
  }

  if(timerPage === true){
    noStroke();
    fill(234,62,51);
    rect(0,0, windowWidth/2, windowHeight);

    noStroke();
    fill(34,81,89);
    rect(windowWidth/2,0, windowWidth/2, windowHeight);

    ellipseMode(CENTER);
    noStroke();
    fill(238,134,49);
    ellipse(windowWidth/2,windowHeight/2, windowWidth/3, windowWidth/3);

    //circle border white
    strokeWeight(30);
    stroke(255);
    noFill();
    ellipse(windowWidth/2,windowHeight/2,windowWidth/3,windowWidth/3);

    //ARC BLUE
    strokeWeight(32);
    stroke(33,82,89);

    blueCircle = increaseBluePath(blueCircle);
    arc(windowWidth/2,windowHeight/2,windowWidth/3,windowWidth/3,blueCircle,-blueCircle);

    //ARC RED
    strokeWeight(32);
    stroke(234,62,51);
    redCircle = decreaseRedPath(redCircle);

    arc(windowWidth/2,windowHeight/2,windowWidth/3,windowWidth/3,-redCircle,redCircle);

    //dot cirles
    strokeWeight(8);
    stroke(33,82,89);
    beginShape(POINTS);
    for (let a = 0; a < 360; a += 12) {
      let angle = radians(a);
      let x = cx + cos(angle) * secondsRadius;
      let y = cy + sin(angle) * secondsRadius;
      vertex(x, y);
    }
    endShape();

    //text 4ime to pick up
    textAlign(CENTER, CENTER);
    fill(255,255,255);
    noStroke();
    textFont(font, 18);
    text("G A M E  S T A R T S  I N", windowWidth/2, windowHeight/2-80);

    if (frameCount % 60 == 0 && timer >= 1) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
      timer --;
    }

    if(timer > 0){
      textAlign(CENTER, CENTER);
      textSize(100);
      text(timer, windowWidth/2, windowHeight/2-10);
    }

    if (timer == 0) {
      textAlign(CENTER, CENTER);
      textSize(100);
      text("GO!", windowWidth/2, windowHeight/2);
    }

  }
}

function increaseBluePath(circle){
  circle = circle + 0.05;
  return circle;
}

function decreaseRedPath(circle){
  circle = circle + 0.009;
  return circle;
}
