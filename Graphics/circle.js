class Circle {

  constructor(x, y, col) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.acc = p5.Vector.random2D();
    this.vel = createVector();
    this.r = 8;
    this.maxSpeed = 10;
    this.maxForce = 0.3;
    this.diam = 0;
    this.theta = 0;
    this.fade = 0;
    this.fadeDirection = 1;
    this.fadeArray = [];
    this.myNum = 0;
    this.fadeIn = true;
    this.color = col;
    this.colorSecond = col;
    this.colorDirection = 1;
    this.colorDirectionSecond = 1;
    for(let i = 0; i < 30; i += 1){
      this.fadeArray[i] = this.myNum;
      this.myNum-=20;
    }
  }

  behaviors(){
    var arrive = this.arrive(this.target);
    this.applyForce(arrive);
  }

  applyForce(f){
    this.acc.add(f);

  }

  update(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
    this.theta += 0.0005;
  }

  updateColor(col){
    if(this.color >= 200){
      this.colorDirection = -1;
    }
    if(this.color <= 60){
      this.colorDirection = 1;
    }

    this.color += this.colorDirection;

    if(this.colorSecond >= 150){
      this.colorDirectionSecond = -1;
    }
    if(this.colorSecond <= 60){
      this.colorDirectionSecond = 1;
    }

    this.colorSecond += this.colorDirectionSecond;
  }


  display() {
    stroke(this.colorSecond, this.color, this.color);
    strokeWeight(1);
    //strokeWeight(1 + (frameCount % 16));
    fill(0,0,0);
  //  console.log(this.diam);
    this.diam = 60 + sin(this.theta) * 3;

    ellipse(this.pos.x, this.pos.y, this.diam, this.diam);

    if(this.fadeArray[9] <= 255 && this.fadeIn === true){
      this.fadeDirection = 1;

  }
  if(this.fadeArray[9] >= 255 && this.fadeIn === true){
    this.fadeIn = false;
  }

  if(this.fadeArray[0] >= 0 && this.fadeIn === false){
   this.fadeDirection = -1;

  }
  if(this.fadeArray[0] <= 0 && this.fadeIn === false){
    this.fadeIn = true;
  }

    for(let i = 0; i < 30; i += 3){
      this.fadeArray[i] = this.fadeArray[i] + (6*(this.fadeDirection));
      // console.log(this.fadeArray[i]);
      stroke(this.colorSecond, this.color, this.color, this.fadeArray[i]);
      strokeWeight(3);
      noFill();
      ellipse(this.pos.x, this.pos.y, this.diam + i, this.diam + i);
    }

  }

  arrive(target){
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxSpeed;
    if(d < 100){
      speed = map(d, 0, 100, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }


  seek(target){
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }

}
