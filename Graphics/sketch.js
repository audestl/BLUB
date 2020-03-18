let circleTrail = [];
let mousetest;
let pointsArray = [];
let triggerCircles = false;
let introTitleName = true;
let pos = 50;
let dpos = 1000;
let fadeWelcome = 0;
let fadeWelcome2 = 0;
let fadeBlub = 0;
let fadeWinner = 0;
let color = 20;
let colorDirection = 1;
let millisecond;
let goal = false;
let goalText = false;
let blub = false;
let rectFade = 0;
let rectFade2 = 0;
let goalFade = 0;
let goalFade2 = 0;
let goalFade3 = 0;
let instructions = false;
let endingMessage = false;
let textDots = [];
let textDots2 = [];
let textDots3 = [];
let textDots4 = [];

var fireworks = [];
var gravity;


let font;
let font2;

function preload() {
  font = loadFont('Lulo Clean W01 Outline Bold.otf');
  font2 = loadFont('Lulo Clean W01 One Bold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0,0,0);


  //colorMode(HSB);
  gravity = createVector(0, 0.2);

  //first game trail
  for (let i = windowWidth/15; i < ((windowWidth/4)*1.5); i = i + 55) {
    if(i > (windowWidth/15.4 + 60)){
      let a;
        a = createVector(i, (windowHeight-windowHeight/30)-i);
        //point(a);
        pointsArray.push(a);
    }
  }

  //continuation of game trail
  let x = pointsArray[(pointsArray.length)-1].y;
  for (let i = pointsArray[(pointsArray.length)-1].x; i < ((windowWidth/4)*3); i = i + 70) {
    let a;
      a = createVector(i, x);
      //point(a);
      pointsArray.push(a);
      x = x + 10;
  }

  //continuation of game trail
  let x2 = (pointsArray[(pointsArray.length)-1].y);
  for (let i = pointsArray[(pointsArray.length)-1].x; i < (windowWidth - windowWidth/14); i = i + 50) {
    if(x2 < (windowHeight-windowHeight/5)){
      let a;
        a = createVector(i, x2);
        //point(a);
        pointsArray.push(a);
        x2 = x2 + 60;
    }
  }

  let col = 20;

    //push points into circletrail array (circle array)
    for (let i = 0; i < pointsArray.length; i++) {
      circleTrail.push(new Circle(pointsArray[i].x, pointsArray[i].y, col));
      col += 20;
    }

    //text for intro Blub
    textFont(font2, 120);
    var points  = font2.textToPoints("BLÜB", windowWidth/4+ 100, windowHeight/2+50);
    for(var i = 0; i < points.length; i++){
      var pt = points[i];
      var textDot = new Dot(pt.x, pt.y, 3);
      textDots.push(textDot);
    }

    //text for intro Blub
    textFont(font2, 70);
    var points2  = font2.textToPoints("The Goal", windowWidth/4+60, windowHeight/2-40);
    for(var i = 0; i < points2.length; i++){
      var pt = points2[i];
      var textDot2 = new Dot(pt.x, pt.y, 3);
      textDots2.push(textDot2);
    }

    //text for intro instructions
    textFont(font2, 70);
    var points3  = font2.textToPoints("Instructions", windowWidth/5, windowHeight/2-90);
    for(var i = 0; i < points3.length; i++){
      var pt = points3[i];
      var textDot3 = new Dot(pt.x, pt.y, 3);
      textDots3.push(textDot3);
    }

    //text for winner!!!
    textFont(font2, 90);
    var points4  = font2.textToPoints("Winner!!!", windowWidth/4-18, windowHeight/2+40);
    for(var i = 0; i < points4.length; i++){
      var pt = points4[i];
      var textDot4 = new Dot(pt.x, pt.y, 3);
      textDots4.push(textDot4);
    }
}

function draw() {

  background(0,0,0);
  rectMode(CENTER);
  strokeWeight(1);
  stroke(255, 255, 255);
  noFill();
  rect(windowWidth/2, windowHeight/2, windowWidth-30, windowHeight -30);
  millisecond = millis();

  if(introTitleName){
  updateColor();
  increaseFade();
  increasePos();
  textAlign(CENTER, CENTER);
  fill(255,255,255, fadeWelcome);
  noStroke();
  textFont(font2, 35);
  text("Welcome to", windowWidth/2, windowHeight/2);

  }

  if(millisecond > 2000 && introTitleName ===true){
    introTitleName = false;
    blub = true;
  }

  if(blub === true){
    fadeBlub = increaseFade2(fadeBlub);
    for(var i =0; i < textDots.length; i++){
      var v = textDots[i];
      noStroke();
      fill(50,color,color,fadeBlub);
      v.behaviors();
      v.update();
      v.display();
    }
  }

  if(millisecond > 7000 && triggerCircles === false && endingMessage === false && millisecond < 16000){
    goal = true;
    blub = false;
    fadeWelcome = 0;
  }

  if(goal){
    goalFade = increaseFade2(goalFade);
    for(var i =0; i < textDots2.length; i++){
      var v = textDots2[i];
      noStroke();
      fill(255,color,color,goalFade);
      v.behaviors();
      v.update();
      v.display();
    }

    if(millisecond > 9000 && goal === true){
      goalFade2 = increaseFade2(goalFade2);
      fill(255,255,255, goalFade2);
      textFont(font2);
      textSize(15);
      textAlign(CENTER, CENTER);
      text("Be the first team to bring the cube to the opposite base", windowWidth/2, windowHeight/2+10);
      text("by jumping in the circles that make up the trajectory.", windowWidth/2, windowHeight/2+35);
    }
  }

  if(millisecond > 16000){
    goal = false;
  }

  if(millisecond > 16000 && triggerCircles === false && endingMessage === false){
    instructions = true;
  }

  if(instructions){
    goalFade = increaseFade2(goalFade);
    for(var i =0; i < textDots3.length; i++){
      var v = textDots3[i];
      noStroke();
      fill(255,color,color,goalFade);
      v.behaviors();
      v.update();
      v.display();
    }

    if(millisecond > 18000 && instructions === true){
      goalFade3 = increaseFade2(goalFade3);
      fill(255,255,255, goalFade3);
      textFont(font2);
      textSize(14);
      textAlign(LEFT);
      text("1 | Divide yourselves in teams of minimum 2 people.", windowWidth/4, windowHeight/2-50);
      text("2 | Each team should line up behind a base.", windowWidth/4, windowHeight/2-20);
      text("3 | When the teams are set, let the first person from", windowWidth/4, windowHeight/2+10);
      text("each team pick up the block from the base.", windowWidth/4+35, windowHeight/2+40);
      text("4 | The game will start once both teams pick up their block.", windowWidth/4, windowHeight/2+70);
      text("5 | When 2 members of the opposite team collide, do rock", windowWidth/4, windowHeight/2+100);
      text("paper scissors to determine who continues the", windowWidth/4+35, windowHeight/2+130);
      text("trajectory and who restarts from the beginning. ", windowWidth/4+35, windowHeight/2+160);
    }
  }

  if (keyCode === ENTER) {
    triggerCircles = true;
    instructions = false;
  }

  if(keyCode === BACKSPACE){
    triggerCircles = false;
    endingMessage = true;
    instructions = false;
  }

  if(endingMessage){

    updateColor();
    fadeWinner = increaseFade2(fadeWinner);
    for(var i =0; i < textDots4.length; i++){
      var v = textDots4[i];
      noStroke();
      fill(70,color,color,fadeWinner);
      v.behaviors();
      v.update();
      v.display();
    }

    if (random(1) < 0.03) {
        fireworks.push(new Firework());
      }

      for (var i = fireworks.length - 1; i >= 0; i--) {
        stroke(255);
        strokeWeight(3);
        fireworks[i].update();
        fireworks[i].show();

        if (fireworks[i].done()) {
          fireworks.splice(i, 1);
        }
      }
  }


  if(triggerCircles){

    for (let i = 0; i < circleTrail.length; i++) {
      var individualCircle = circleTrail[i];
      individualCircle.behaviors();
      individualCircle.updateColor();
      individualCircle.update();
      individualCircle.display();
    }
    push();
    stroke(242,158,121);
    strokeWeight(4);
    translate(windowWidth-windowWidth/15.3, windowHeight-windowHeight/7.75);
    rotate(frameCount / -300.0);
    polygon(0, 0, 50, 8);
    pop();

    push();
    stroke(242,158,121);
    strokeWeight(4);
    translate(windowWidth/15.3, windowHeight-windowHeight/7.75);
    rotate(frameCount / -300.0);
    polygon(0, 0, 50, 8);
    pop();
  }
}

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


function increasePos(){
  if(pos < windowHeight/2 -90){
    pos = pos + 10;
  }
}


function decreasePos(){
  if(dpos > 350){
    dpos = dpos - 10;
  }
}

function increaseFade(){
  if(fadeWelcome < 200){
    fadeWelcome = fadeWelcome + 2;
  }
}

function increaseFade2(f){
  if(f < 250){
    f = f + 30;
  }
  return f;
}

function increaseFade3(f){
  if(f < 250){
    f = f + 30;
  }
  return f;
}

function updateColor(){
  if(color >= 170){
    colorDirection = -1;
  }
  if(color <= 50){
    colorDirection = 1;
  }
  color += colorDirection;
}
