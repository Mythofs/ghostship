let ghost;
let farmer;
let farmerv;
let score = 0;
let duration = 20;
let startTime;
let state = 'start';
let spawnEvery = 120;

function setup() {
  createCanvas(480, 360);
  farmerv = {x:2, y:2};
  farmer = {x:width/2, y:height/2};
  spawnGhost();
  spawnFarmer();
}

function mousePressed() {
  if (state === 'start' || state === 'over' || state === "farmer") {
    state = 'play';
    score = 0;
    startTime = millis();
    spawnGhost();
    return;
  }
  if (dist(mouseX, mouseY, ghost.x, ghost.y) < 30) {
    score += int(ghost.a / 255 * 5);
    spawnGhost();
    spawnEvery = lerp(spawnEvery, 60, 0.05)
  }
  if(dist(mouseX, mouseY, farmer.x, farmer.y) < 30) {
    state = "farmer";
  }
}

function draw() {
  background(15, 10, 25);

  if (state === 'start') {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text('You love pumpkins but are broke.\nIn order to get your beloved pumpkins,\nyou must steal them from the local farm\n for disabled people.\nDon\'t get caught\n\nClick to start', width / 2, height / 2);
    return;
  }
  if(state === "farmer") {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text('Caught by farmer\nGame over\nClick to retry', width / 2, height / 2);
    return;
  }
  if (state === 'over') {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text('\Pumpkins stolen: ' + score + '\nClick to retry', width / 2, height / 2);
    return;
  }
  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);
  if (timeLeft <= 0) {
    state = 'over';
    return;
  }
  fill(0, 0, 100);
  rect(0, 0, width, height - 100)
  fill(0, 100, 0);
  rect(0, height - 100, width, 100);
  fill(244, 246, 240);
  ellipse(100, 100, 75, 75);
  if (frameCount % spawnEvery === 0) {
    spawnGhost();
  }
  spawnFarmer();
  drawGhost(ghost.x, ghost.y);
  drawFarmer(farmer.x, farmer.y);

  textAlign(LEFT, TOP);
  fill(255);
  textSize(16);
  text('Score: ' + score, 12, 10);
  textAlign(RIGHT, TOP);
  text('Time: ' + ceil(timeLeft), width - 12, 10);
}

function spawnGhost() {
  ghost = { x: random(40, width - 40), y: random(40, height - 40), a: 255 };
}
function updateGhost() {
  ghost.a -= ghost.a * 1/30;
}
function spawnFarmer() {
  farmer.x += farmerv.x;
  farmer.y += farmerv.y;
  if(farmer.x < 30 || farmer.x > width - 30) farmerv.x *= -1;
  if(farmer.y < 30 || farmer.y > height - 30) farmerv.y *= -1;
}

function drawGhost(x, y) {
  noStroke();
  ghost.a -= ghost.a * 2/spawnEvery;
  fill(0, 255, 0, ghost.a);
  rect(x-7.5, y-35, 15, 20);
  fill(255, 165, 0, ghost.a);
  ellipse(x, y, 60, 50);
}
function drawFarmer(x, y) {
  noStroke();
  fill(255, 218, 185)
  ellipse(x, y, 60, 60);
  fill(0, 0, 0);
  triangle(x - 20, y - 10, x - 5, y - 5, x - 20, y - 5);
  triangle(x + 20, y - 10, x + 5, y - 5, x + 20, y - 5);
  circle(x - 15, y+2.5, 7);
  circle(x + 15, y+2.5, 7);
  fill(194, 167, 112);
  ellipse(x, y-20, 60, 20);
  rect(x-15,y-40,30,20)
}