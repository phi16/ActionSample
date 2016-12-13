const cw = 50, ch = 100;
var x = width/2-cw/2, y = height/2, vx = 0, vy = 0;
var jumpable = false;

var key = {left:false,down:false,up:false,right:false};

var current;
function ground(){
  vy = -15;
  current = jump1;
  jumpable = false;
}
function jump1(){
  if(jumpable){
    vy = -15;
    current = jump2;
    jumpable = false;
  }
}
function jump2(){
}
function wall(){
  if(jumpable){
    vy = -15;
    if(x < width/2)vx = 10;
    else vx = -10;
    current = jump1;
    jumpable = false;
  }
}

current = ground;

function execute(draw){
  draw(x,y,cw,ch);
  if(key.left)vx -= current==ground ? 3 : 0.001;
  if(key.right)vx += current==ground ? 3 : 0.001;
  vx *= current==ground ? 0.8 : 0.99;
  vy += 0.8;
  if(current==wall){
    if(x < width/2 && key.left || x > width/2 && key.right){
      vy = Math.min(vy,3.0);
    }
  }
  x += vx;
  y += vy;
  if(y > height-ch){
    vy = 0;
    y = height-ch;
    current = ground;
  }
  if(key.up){
    current();
  }
  if(x < 0 && vx < 0){
    x = 0, vx = 0;
    if(current!=ground)current = wall;
  }
  if(x > width-cw && vx > 0){
    x = width-cw, vx = 0;
    if(current!=ground)current = wall;
  }
  if(!key.up)jumpable = true;
}
function input(e,pressing){
  if(e.keyCode==37)key.left = pressing;
  if(e.keyCode==38)key.up = pressing;
  if(e.keyCode==39)key.right = pressing;
  if(e.keyCode==40)key.down = pressing;
}