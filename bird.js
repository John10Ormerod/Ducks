// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Neuro-Evolution Flappy Bird

class Bird {
  constructor(brain) {
        
    this.y = height / 2;
    this.x = 64;

    this.gravity = 0.8;
    this.lift = -12;
    this.velocity = 0;
    this.timer = random(5.9);

    this.score = 0;
    this.fitness = 0;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }
  }

  show() {
    //stroke(255);
    //fill(255, 100);
    if (floor(this.timer) >= 5) {
      image(img[0], this.x -16, this.y -16, 32, 32);
    } else {
      if (floor(this.timer) == 4) {
        image(img[1], this.x -16, this.y -16, 32, 32);
      } else {
        if (floor(this.timer) == 3) {
          image(img[2], this.x -16, this.y -16, 32, 32);
        } else {
          if (floor(this.timer) == 2) {
            image(img[3], this.x -16, this.y -16, 32, 32);
          } else {
            if (floor(this.timer) == 1) {
              image(img[4], this.x -16, this.y -16, 32, 32);
            } else {
              //ellipse(this.x, this.y, 32, 32);
              image(img[5], this.x -16, this.y -16, 32, 32);
            }
          }
        }
      }
    }
  }
  
  up() {
    this.velocity += this.lift;
  }

  mutate() {
    this.brain.mutate(0.1);
  }

  think(pipes) {
    // Find the closest pipe
    let closest = null;
    let closestD = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let d = pipes[i].x + pipes[i].w - this.x;
      if (d < closestD && d > 0) {
        closest = pipes[i];
        closestD = d;
      }
    }

    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = closest.top / height;
    inputs[2] = closest.bottom / height;
    inputs[3] = closest.x / width;
    inputs[4] = this.velocity / 10;
    let output = this.brain.predict(inputs);
    //if (output[0] > output[1] && this.velocity >= 0) {
    if (output[0] > output[1]) {
      this.up();
    }
  }

  offScreen() {
    return this.y > height || this.y < 0;
  }

  update() {
    this.score++;

    this.velocity += this.gravity;
    //this.velocity *= 0.9;
    this.y += this.velocity;
    this.timer -= 0.1;
    if(this.timer <= 0.0) {
      this.timer = 5.9;
    }
  }

}