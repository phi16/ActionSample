const cw = 50, ch = 100;
var x = width/2-cw/2, y = height/2, vx = 0, vy = 0;

var key = {left:false,down:false,up:false,right:false};
var isGround = true, isWall = false;
var current;

function setState(g){
  current = g();
  current.next();
}
function* upKeyHandler(){
  var x;
  while(x = yield, !x);
  current.next();
  while(1){
    while(x = yield, x);
    while(x = yield, !x);
    current.next();
  }
}
var upKey;
function resetJumps(){
  upKey = upKeyHandler();
  upKey.next();
}
resetJumps();

function* ground(){
  isGround = true;
  isWall = false;
  resetJumps();
  yield;
  setState(jumping);
}
function* jumping(){
  isGround = false;
  isWall = false;
  vy = -15;
  yield;
  vy = -15;
}
function* wall(){
  isGround = false;
  isWall = true;
  yield;
  vy = -15;
  if(x < width/2)vx = 10;
  else vx = -10;
  setState(jumping);
}

setState(ground);

function step(){
  if(key.left)vx -= isGround ? 3 : 0.001;
  if(key.right)vx += isGround ? 3 : 0.001;
  vx *= isGround ? 0.8 : 0.99;
  vy += 0.8;
  if(isWall){
    if(x < width/2 && key.left || x > width/2 && key.right){
      vy = Math.min(vy,3.0);
    }
  }
  x += vx;
  y += vy;
  if(y > height-ch){
    vy = 0;
    y = height-ch;
    setState(ground);
  }
  if(x < 0 && vx < 0){
    x = 0, vx = 0;
    if(!isGround)setState(wall);
  }
  if(x > width-cw && vx > 0){
    x = width-cw, vx = 0;
    if(!isGround)setState(wall);
  }
}

function execute(draw){
  draw(x,y,cw,ch);
  step();
}
function input(e,pressing){
  if(e.keyCode==37)key.left = pressing;
  if(e.keyCode==38)key.up = pressing;
  if(e.keyCode==39)key.right = pressing;
  if(e.keyCode==40)key.down = pressing;

  if(e.keyCode==38){
    upKey.next(pressing);
  }
}