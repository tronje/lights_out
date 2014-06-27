/**
 *  Main JS
 */

var enemy;
var sprites = [];
var projectiles = [];
var shooting = false;
var projectile_x;
var projectile_y;
var empty = new jaws.Sprite({});

var density = 2;

var amount = 50; // amount of sprites

var collide_speed = 5;


//The main function
function main() {

  var player = new jaws.Sprite({x:450, y:300});
  //var player = new jaws.Sprite({x:450, y:300, scale: 1, image: "./player.png", anchor: "center"});
  //new jaws.Sprite({x:0, y:0, scale: 1, image: "./sprite.png"});

  //the speeds at which player moves
  var speed = 7;
  var sprite_speed = 0.2;

  this.setup = function () {
    var t = amount;
    while(t--) {
      var x = Math.floor(Math.random() * jaws.canvas.width);
      var y = Math.floor(Math.random() * jaws.canvas.width);
      var sprite = new jaws.Sprite({x:x, y:y, scale: 1, image: "./sprite.png"});
      sprite.vx = Math.random() * 0.5 - 1;
      sprite.vy = Math.random() * 0.5 - 1;
      sprites.push(sprite);
    };

    enemy = new jaws.Sprite({x:700, y:100, scale: 1, image: "./enemy.png"});;
  }


  //the update function is executed with every tick
  this.update = function() {
    projectile_x = player.x;
    projectile_y = player.y;

    if (shooting) {
      for (var i = 0; i < projectiles.length; i++) {
        projectiles[i].move(speed, 0);
      };
    };

    //controls
    if (jaws.pressed("a")) {player.move(-speed, 0)};
    if (jaws.pressed("d")) {player.move(speed, 0)};
    if (jaws.pressed("s")) {player.move(0, speed)};
    if (jaws.pressed("w")) {player.move(0, -speed)};
    if ((density < 9) && jaws.pressed("q")) {++density};
    if ((density > 1) && jaws.pressed("e")) {--density};
    jaws.on_keydown("space", shoot);

    for (var i = 0; i < sprites.length; ++i) {
      follow(sprites[i], player, sprite_speed);
    }

    //calls a function to keep the item within the bounds of the canvas
    forceInsideCanvas(player);

    //keeps sprites from stacking on top of each other
    for (var i = 0; i < sprites.length; ++i) {
      for (var j= 0; j< sprites.length; ++j) {
        //if (((Math.abs(sprites[i].x - sprites[j].x)) <= 4) && ((Math.abs(sprites[i].y - sprites[j].y)) <= 4)) {
        if (pythagory(sprites[i], sprites[j]) < density ) {
          //sprites[i].move(-1, 1);
          //sprites[j].move(1, -1);
          collide(sprites[i], sprites[j], collide_speed);
        };
      };
    };

    if (shooting) {
      for (var i = 0; i < projectiles.length; i++) {
        if (projectiles[i].x == jaws.canvas.width) {projectiles.splice(i, 1)}
      };
    };
  }

  //the draw function is called after every update and draws what's there
  this.draw = function() {
    jaws.clear();
    enemy.draw();
    if (shooting) {
      for (var i = 0; i < projectiles.length; i++) {
        projectiles[i].draw();
      };
    };

    for (var i = 0; i < sprites.length; ++i) {
      sprites[i].draw();
    }
  }
}

//when the window is loaded, execute the main function
window.onload = function() {
  jaws.assets.add("./sprite.png")
  jaws.assets.add("./enemy.png")
  jaws.start(main);
}

function shoot () {
  if (sprites.length > 1) {
    shooting = true;
    var projectile = new jaws.Sprite({x:projectile_x, y:projectile_y, scale: 1, image: "./sprite.png"});
    projectiles.push(projectile);
    sprites.pop();
  };
}