const cw = 50, ch = 100;
var x = width/2-cw/2, y = height/2, vx = 0, vy = 0;
var jumpable = false;

var key = {left:false,down:false,up:false,right:false};

var state = 0;
// 0:ground
// 1:jump1
// 2:jump2
// 3:wall

function execute(draw){
  draw(x,y,cw,ch);
  if(key.left)vx -= state==0 ? 3 : 0.001;
  if(key.right)vx += state==0 ? 3 : 0.001;
  vx *= state==0 ? 0.8 : 0.99;
  vy += 0.8;
  if(state==3){
    if(x < width/2 && key.left || x > width/2 && key.right){
      vy = Math.min(vy,3.0);
    }
  }
  x += vx;
  y += vy;
  if(y > height-ch){
    vy = 0;
    y = height-ch;
    state = 0;
  }
  if(key.up){
    switch(state){
      case 0:
        vy = -15;
        state = 1;
        jumpable = false;
        break;
      case 1:
        if(jumpable){
          vy = -15;
          state = 2;
          jumpable = false;
        }
        break;
      case 2:
        break;
      case 3:
        if(jumpable){
          vy = -15;
          if(x < width/2)vx = 10;
          else vx = -10;
          state = 1;
          jumpable = false;
        }
        break;
    }
  }
  if(x < 0 && vx < 0){
    x = 0, vx = 0;
    if(state!=0)state = 3;
  }
  if(x > width-cw && vx > 0){
    x = width-cw, vx = 0;
    if(state!=0)state = 3;
  }
  if(!key.up)jumpable = true;
}
function input(e,pressing){
  if(e.keyCode==37)key.left = pressing;
  if(e.keyCode==38)key.up = pressing;
  if(e.keyCode==39)key.right = pressing;
  if(e.keyCode==40)key.down = pressing;
}