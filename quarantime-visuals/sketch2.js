let k=0;
let t=0;
let m=0;
let circleRadius;
let cx, cy;
let cx2, cy2;
let cx3, cy3;
let cx4, cy4;

let size = 1;
//minimum size
let minSize = 4;
//maximum size
let maxSize = 8;
//change speed for size (how much will the size increase/decrease each frame)
let sizeSpeed = 0.05;


function preload() {
  font = loadFont('Bauhaus 93 Regular.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0,0,0);
  let radius = min(width, height) / 2;
  circleRadius = radius * 1.7;
  cx = windowWidth/2;
  cy = windowHeight/2;
  cx2 = -windowWidth/2;
  cy2 = -windowHeight/2;
  cx3 = -windowWidth/3;
  cy3 = windowHeight/2;
  cx4 = windowWidth/2;
  cy4 = -windowHeight/1.5;
}

function draw() {
  background(0,0,0);
  rectMode(CENTER);
  fill(238,134,49);
  noStroke();
  rect(windowWidth/2, windowHeight/2, windowWidth, windowHeight);


  textAlign(CENTER, CENTER);
  fill(255);
  noStroke();
  textFont(font, 25);
  text("W A I T I N G  O N  S E C O N D  P L A Y E R", windowWidth/2, windowHeight/2-100);

  translate(width/2-30,height/2);
  noStroke();
  fill(234, 62, 51);
  ellipse(100*sin(radians(k)),0,20*cos(radians(m)),20*cos(radians(m)));
  fill(80, 167, 151);
  ellipse(100*sin(radians(k)+PI/3),0,20*cos(radians(m)+PI/3),20*cos(radians(m)+PI/3));
  fill(34, 81, 89);
  ellipse(100*sin(radians(k)+PI/6),0,20*cos(radians(m)+PI/6),20*cos(radians(m)+PI/6));
  if(k<160){
    k+=2;
    if(90<k){
      if(m<160) m+=3;
      else m = 0;
    }
  }
  else {
    k=0;
    m=0;
  }

  //size variations dots
  size = map(sin(frameCount/sin(1.1) * sizeSpeed),-1.0,1.0,minSize,maxSize);

  //dot cirles
  stroke(234,62,51,60);
  strokeWeight(size);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 6) {
    let angle = radians(a);
    let x = cx + cos(angle) * circleRadius;
    let y = cy + sin(angle) * circleRadius;
    vertex(x, y);
    let x2 = cx2 + cos(angle) * circleRadius;
    let y2 = cy2 + sin(angle) * circleRadius;
    vertex(x2, y2);
    let x3 = cx3 + cos(angle) * circleRadius;
    let y3 = cy3 + sin(angle) * circleRadius;
    vertex(x3, y3);
    let x4 = cx4 + cos(angle) * circleRadius;
    let y4 = cy4 + sin(angle) * circleRadius;
    vertex(x4, y4);
  }
  endShape();

}
