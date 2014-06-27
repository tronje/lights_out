/**
 *  Helper JS - with helpfull stuff
 */

var temp1;
var temp2;

//keeps an item within the boundaries of the canvas
function forceInsideCanvas(item) {
  if(item.x < 0) { item.x = 0  }
  if(item.x + item.width > jaws.width) { item.x = jaws.width - item.width }
  if(item.y < 0) { item.y = 0 }
  if(item.y + item.height  > jaws.height) { item.y = jaws.height - item.height }
}

//algorithm to make sprite follow player
function follow (sprite, player, speed) {
  var vector;
  vector = [Math.abs(sprite.x - player.x), Math.abs(sprite.y - player.y)];

  if (sprite.x > player.x) {
    sprite.move(-vector[0]*speed, 0);
  };

  if (sprite.x < player.x) {
    sprite.move(vector[0]*speed, 0);
  };

  if (sprite.y > player.y) {
    sprite.move(0, -vector[1]*speed);
  };

  if (sprite.y < player.y) {
    sprite.move(0, vector[1]*speed);
  };
  // if (sprite.x > player.x) {
  //   sprite.move(-speed, 0);
  // };

  // if (sprite.x < player.x) {
  //   sprite.move(speed, 0);
  // };

  // if (sprite.y > player.y) {
  //   sprite.move(0, -speed);
  // };

  // if (sprite.y < player.y) {
  //   sprite.move(0, speed);
  // };
}

function rand () {
  temp1 = Math.floor(Math.random() * 3);
  temp2 = Math.floor(Math.random() + 1);
  temp1 = ((-1) ^ temp2) * temp1;
  return temp1;
}

function pythagory (sprite_1, sprite_2) {
  // var x = (sprite_1.x - sprite_2.x)^2;
  // var y = (sprite_1.y - sprite_2.y)^2;
  // var c = Math.sqrt(x+y);
  return Math.sqrt(Math.pow((sprite_1.x - sprite_2.x), 2) + Math.pow((sprite_1.y - sprite_2.y), 2));
}

function collide (sprite_1, sprite_2, speed) {
  var nx = sprite_1.x - sprite_2.x;
  var ny = sprite_1.y - sprite_2.y;

  var norm = normalize(nx, ny);
  nx = nx * norm * speed;
  ny = ny * norm * speed;

  sprite_1.move(nx, ny);
  sprite_2.move(-nx, -ny);
}

function normalize (x, y) {
  return (1 / (Math.sqrt(x * x + y * y)));
}