let circleTrail = [];
let mousetest;
let pointsArray = [];
let triggerCircles = false;
let introTitleName = true;
let pos = 50;
let dpos = 1000;
let fadeWelcome = 0;
let fadeBlub = 0;
let fadeWinner = 0;
let color = 20;
let colorDirection = 1;
let millisecond;
let goal = false;
let rectFade = 0;
let rectFade2 = 0;
let goalFade = 0;
let goalFade2 = 0;
let instructions = false;
let endingMessage = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0,0,0);

  //first game trail
  for (let i = 100; i < 500; i = i + 55) {
    let a;
      a = createVector(i, 600-i);
      //point(a);
      pointsArray.push(a);
  }

  //continuation of game trail
  let x = 70;
  for (let i = 545; i < 1000; i = i + 70) {
    let a;
      a = createVector(i, x);
      //point(a);
      pointsArray.push(a);
      x = x + 25;
  }

  //continuation of game trail
  let x2 = 280;
  for (let i = 1010; i < 1090; i = i + 20) {
    let a;
      a = createVector(i, x2);
      //point(a);
      pointsArray.push(a);
      x2 = x2 + 75;
  }

  let col = 20;

    //push points into circletrail array (circle array)
    for (let i = 0; i < pointsArray.length; i++) {
      circleTrail.push(new Circle(pointsArray[i].x, pointsArray[i].y, col));
      col += 20;
    }

}

function draw() {
  background(0,0,0);
  millisecond = millis();

  if(introTitleName){
  updateColor();

  increaseFade();
  strokeWeight(0);
  fill(255,255,255,fadeWelcome);
  textFont("Nunito");
  textSize(35);
  increasePos();
  textAlign(CENTER, CENTER);
  text("W E L C O M E  T O", windowWidth/2, pos);

  fadeBlub = increaseFade2(fadeBlub);
  fill(40,color,color,fadeBlub);
  strokeWeight(0);
  textSize(93);
  textFont("Nunito");
  text("B L Ü B", windowWidth/2, 325);
  }

  if(millisecond > 7000){
    introTitleName = false;
  }

  if(millisecond > 5000 && triggerCircles === false && endingMessage === false){
    goal = true;
  }

  if(goal){
    rectFade = increaseFade2(rectFade);
    fill(0,0,0, rectFade);
    noStroke();
    rectMode(CENTER);
    rect(windowWidth/2, windowHeight/2, 1000, 800);

    if(millisecond > 6000 && goal === true){
      goalFade = increaseFade2(goalFade);
      fill(255,255,255, goalFade);
      textFont("Nunito");
      textSize(30);
      textAlign(CENTER, CENTER);
      text("T H E  G O A L", windowWidth/2, 180);
      fill(255,255,255, goalFade);
      textFont("Montserrat");
      textSize(15);
      textAlign(CENTER, CENTER);
      text("The game is made up of a trajectory of circles, where the start ", windowWidth/2, 220);
      text("and end of the trajectory are the two bases. Each team starts by", windowWidth/2, 240);
      text("sending one individual to run along the trajectory by jumping into", windowWidth/2, 260);
      text("each shape, along with their corresponding stick, trying to make ", windowWidth/2, 280);
      text("their way to their opposite base. However, when the two individuals", windowWidth/2, 300);
      text("collide while on the trajectory, they face a challenge (ex: rock, paper,", windowWidth/2, 320);
      text("scissors, match) to determine who continues the path, and who restarts ", windowWidth/2, 340);
      text("from the beginning. The winner is the first team to scan their stick ", windowWidth/2, 360);
      text("once they reach their opposite base.", windowWidth/2, 380);
    }
  }

  if(millisecond > 17000){
    goal = false;
  }

  if(millisecond > 14000 && triggerCircles === false && endingMessage === false){
    instructions = true;
  }

  if(instructions){
    rectFade2 = increaseFade2(rectFade2);
    fill(0,0,0, rectFade2);
    noStroke();
    rectMode(CENTER);
    rect(windowWidth/2, windowHeight/2, 1500, 800);

    if(millisecond > 15000 && instructions === true){
      goalFade2 = increaseFade2(goalFade2);
      fill(255,255,255, goalFade2);
      textFont("Nunito");
      textSize(30);
      textAlign(CENTER, CENTER);
      text("I N S T R U C T I O N S", windowWidth/2, 180);
      fill(255,255,255, goalFade2);
      textFont("Montserrat");
      textSize(15);
      textAlign(LEFT);
      text("1 | Divide yourselves in teams of minimum 2 people.", windowWidth/2 - 200, 230);
      text("2 | Each team should line up behind a base.", windowWidth/2 - 200, 260);
      text("3 | When the teams are set, let the first person from", windowWidth/2 - 200, 290);
      text("each team pick up the block from the base.", windowWidth/2 - 200, 315);
      text("4 | The game will start once both teams pick up the block.", windowWidth/2 - 200, 345);
      text("5 | When you are ready to start, pick up the block.", windowWidth/2 - 200, 375);
      textAlign(CENTER, CENTER);
      text("Get ready!", windowWidth/2, 400);
    }
  }

  if (keyCode === ENTER) {
    triggerCircles = true;
    instructions = false;
  }

  if(keyCode === BACKSPACE){
    triggerCircles = false;
    endingMessage = true;
  }

  if(endingMessage){
    updateColor();
    fadeWinner = increaseFade2(fadeWinner);
    fill(70,color,color,fadeWinner);
    strokeWeight(0);
    textSize(60);
    textFont("Nunito");
    text("W I N N E R  :  T E A M  1 !", windowWidth/2, 325);
  }


  if(triggerCircles){
    for (let i = 0; i < circleTrail.length; i++) {
      var individualCircle = circleTrail[i];
      individualCircle.behaviors();
      individualCircle.updateColor();
      individualCircle.update();
      individualCircle.display();
    }
  }
}

function increasePos(){
  if(pos < 240){
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
    fadeWelcome = fadeWelcome + 10;
  }
}

function increaseFade2(f){
  if(f < 250){
    f = f + 5;
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