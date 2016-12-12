const cw = 50, ch = 100;
var x = width/2-cw/2, y = height/2, vx = 0, vy = 0;
var jumping = false;

var key = {left:false,down:false,up:false,right:false};

function execute(draw){
  draw(x,y,cw,ch);
  if(!jumping){
    if(key.left)vx-=3;
    if(key.right)vx+=3;
    vx *= 0.8;
  }else vx *= 0.99;
  vy += 0.8;
  x += vx;
  y += vy;
  if(y > height-ch){
    vy = 0;
    y = height-ch;
    jumping = false;
  }
  if(key.up && !jumping){
    vy = -15;
    jumping = true;
  }
  if(x < 0)x = 0, vx = 0;
  if(x > width-cw)x = width-cw, vx = 0;
}
function input(e,pressing){
  if(e.keyCode==37)key.left = pressing;
  if(e.keyCode==38)key.up = pressing;
  if(e.keyCode==39)key.right = pressing;
  if(e.keyCode==40)key.down = pressing;
}