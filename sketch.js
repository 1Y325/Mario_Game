var bgImage, bg;
var mario, mario_running, mario_collided;
var jumpSound, dieSound, coinSound;
var brickImage, brickGroup;
var coinImage, coinsGroup;
var coinscore = 0;
var mushObstacleImage, turtleObstacleImage, obstacleGroup;
var gameState = "PLAY";
var restartImage, restart;

function preload() {
  bgImage = loadImage("images/bgnew.jpg");

  mario_running = loadAnimation(
    "images/mar1.png",
    "images/mar2.png",
    "images/mar3.png",
    "images/mar4.png",
    "images/mar5.png",
    "images/mar6.png",
    "images/mar7.png"
  );

  mario_collided = loadAnimation("images/dead.png");

  jumpSound = loadSound("sounds/jump.mp3");

  coinSound = loadSound("sounds/coinSound.mp3");

  dieSound = loadSound("sounds/dieSound.mp3");

  brickImage = loadImage("images/brick.png");
  coinImage = loadAnimation(
    "images/con1.png",
    "images/con2.png",
    "images/con3.png",
    "images/con4.png",
    "images/con5.png",
    "images/con6.png"
  );
  mushObstacleImage = loadAnimation(
    "images/mush1.png",
    "images/mush2.png",
    "images/mush3.png",
    "images/mush4.png",
    "images/mush5.png",
    "images/mush6.png"
  );

  turtleObstacleImage = loadAnimation(
    "images/tur1.png",
    "images/tur2.png",
    "images/tur3.png",
    "images/tur4.png",
    "images/tur5.png"
    // "images/tur6.png"
  );

  restartImage = loadImage("images/restart.png");
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(600, 300);
  bg.addImage(bgImage);
  bg.scale = 0.5;

  mario = createSprite(200, 520, 20, 50);
  mario.addAnimation("running", mario_running);
  mario.addAnimation("collided", mario_collided);

  mario.scale = 0.2;

  ground = createSprite(200, 580, 400, 10);
  brickGroup = new Group();
  coinsGroup = new Group();
  obstacleGroup = new Group();
  // coinsGroup = new Group();

  restart = createSprite(500, 300);
  restart.addImage(restartImage);
  restart.visible = false;
}

function draw() {
  drawSprites();

  if (gameState === "PLAY") {
    bg.velocityX = -7;
    if (bg.x < 100) {
      bg.x = bg.width / 4;
    }
    if (keyDown("space")) {
      mario.velocityY = -10;
      jumpSound.play();
    }
    mario.velocityY = mario.velocityY + 0.5;

    mario.collide(ground);
    ground.visible = false;

    generateBricks();

    for (let i = 0; i < brickGroup.length; i++) {
      var temp = brickGroup.get(i);
      if (temp.isTouching(mario)) {
        mario.collide(temp);
      }
    }

    if (mario.y < 50) {
      mario.y = 50;
    }

    if (mario.x < 200) {
      mario.x = 200;
    }

    generateCoins();

    for (let i = 0; i < coinsGroup.length; i++) {
      var temp = coinsGroup.get(i);
      if (temp.isTouching(mario)) {
        coinscore++;
        coinSound.play();
        temp.destroy();
        temp = null;
      }
    }
    genrateObstacle();

    bg.velocityX = -7;
    if (bg.x < 100) {
      bg.x = bg.width / 4;
    }
    if (keyDown("space")) {
      mario.velocityY = -10;
      jumpSound.play();
    }
    mario.velocityY = mario.velocityY + 0.5;

    mario.collide(ground);
    ground.visible = false;

    generateBricks();

    for (let i = 0; i < brickGroup.length; i++) {
      var temp = brickGroup.get(i);
      if (temp.isTouching(mario)) {
        mario.collide(temp);
      }
    }

    if (mario.y < 50) {
      mario.y = 50;
    }

    if (mario.x < 200) {
      mario.x = 200;
    }

    generateCoins();

    for (let i = 0; i < coinsGroup.length; i++) {
      var temp = coinsGroup.get(i);
      if (temp.isTouching(mario)) {
        coinscore++;
        coinSound.play();
        temp.destroy();
        temp = null;
      }
    }

    genrateObstacle();

    if (obstacleGroup.isTouching(mario)) {
      dieSound.play();
      gameState = "END";
    }
  } else if (gameState == "END") {
    bg.velocityX = 0;
    mario.velocityX = 0;
    mario.velocityY = 0;
    mario.changeAnimation("collided", mario_collided);
    mario.y = 570;

    brickGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);

    brickGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);

    restart.visible = true;

    if (mousePressedOver(restart)) {
      restartGame();
    }
  }
  textSize(20);
  fill("red");
  text("Coins Collected : " + coinscore, 450, 50);
}

function generateBricks() {
  if (frameCount % 70 === 0) {
    var brick = createSprite(1200, 120, 40, 10);
    brick.y = random(100, 450);
    brick.addImage(brickImage);
    brick.scale = 0.5;
    brick.velocityX = -5;
    brick.lifetime = 250;
    brickGroup.add(brick);
  }
}

function generateCoins() {
  if (frameCount % 60 === 0) {
    var coin = createSprite(1200, 120, 40, 10);
    coin.y = random(80, 350);
    coin.addAnimation("coin", coinImage);
    coin.scale = 0.1;
    coin.velocityX = -5;
    coin.lifetime = 250;
    coinsGroup.add(coin);
  }
}

function genrateObstacle() {
  if (frameCount % 90 === 0) {
    var obstacle = createSprite(1200, 555, 40, 10);
    // coin.y = random(80, 350);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;

    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1:
        obstacle.addAnimation("mush", mushObstacleImage);
        break;
      case 2:
        obstacle.addAnimation("turtle", turtleObstacleImage);
        break;
      default:
        break;
    }

    obstacle.lifetime = 250;
    obstacleGroup.add(obstacle);
  }
}

function restartGame() {
  gameState = "PLAY";
  mario.changeAnimation("running", mario_running);

  brickGroup.destroyEach();
  coinsGroup.destroyEach();
  obstacleGroup.destroyEach();
  

  coinscore = 0;
  restart.visible = false;
}
