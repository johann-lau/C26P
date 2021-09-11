const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var playerArrows = [];
var wwidth, wheight;
var arrows_remaining = 10;


function preload() {
  backgroundImg = loadImage("./assets/background.png");
  baseimage = loadImage("./assets/base.png");
  playerimage = loadImage("./assets/player.png");
  boardimage = loadImage("./assets/board.png");
}

function setup() {
  wwidth = windowWidth
  wheight = windowHeight
  canvas = createCanvas(1184, 664);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);
  imageMode(CENTER);

  var options = {isStatic: true};

  playerBase = Bodies.rectangle(200, 350, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(250, playerBase.position.y - 160, 50, 180, options);
  World.add(world,player);

  playerArcher = new PlayerArcher(300, playerBase.position.y - 182, 120, 120);
  boardA = new Board(800, 400)
  boardB = new Board(1000, 200)

  fill("#FFFF");
  textAlign("center");
}

function draw() {
  image(backgroundImg, 592, 332, 1184, 664)

  Engine.update(engine);
  image(baseimage,playerBase.position.x,playerBase.position.y,180,150)
  image(playerimage,player.position.x,player.position.y,50,180)

  playerArcher.display();
  boardA.display();
  boardB.display();

  for (var i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();
      var b1c = Matter.SAT.collides(playerArrows[i].body, boardA.body).collided;
      var b2c = Matter.SAT.collides(playerArrows[i].body, boardB.body).collided;
      if (b1c) {
        console.log('collided with board 1');
        playerArrows[i].remove(i)
      }
      if (b2c) {
        console.log('collided with board 2');
        playerArrows[i].remove(i)
      }
    }
  }

  textSize(40);
  text("EPIC ARCHERY", wwidth / 2, 100);
  textSize(30);
  text("Arrows: "+arrows_remaining, 1000, 95);
}

function keyPressed() {
  if (keyCode === 32 && arrows_remaining > 0) {
    var posX = playerArcher.body.position.x;
    var posY = playerArcher.body.position.y;
    var angle = playerArcher.body.angle;

    var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

    Matter.Body.setAngle(arrow.body, angle);
    playerArrows.push(arrow);
  }
}

function keyReleased() {
  if (keyCode === 32 && arrows_remaining > 0) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
      arrows_remaining --
    }
  }
}
