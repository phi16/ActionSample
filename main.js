const cw = 50, ch = 100;
var x = width/2-cw/2, y = height/2, vx = 0, vy = 0;

var key = {left:false,down:false,up:false,right:false};

function execute(draw){
  draw(x,y,cw,ch);
  if(key.left)vx-=3;
  if(key.right)vx+=3;
  vx *= 0.8;
  vy += 0.4;
  x += vx;
  y += vy;
  if(y > height-ch){
    vy = 0;
    y = height-ch;
  }
}
function input(e,pressing){
  if(e.keyCode==37)key.left = pressing;
  if(e.keyCode==38)key.up = pressing;
  if(e.keyCode==39)key.right = pressing;
  if(e.keyCode==40)key.down = pressing;
}