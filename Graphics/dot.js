class Dot {

  constructor(x, y, diam) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.acc = p5.Vector.random2D();
    this.vel = createVector();
    this.r = 8;
    this.maxSpeed = 10;
    this.maxForce = 0.3;
    this.diam = diam;
    this.theta = 0;
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
  }

  display() {
    ellipse(this.pos.x, this.pos.y, this.diam, this.diam);

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
