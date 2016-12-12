const cw = 50, ch = 100;
var x = width/2-cw/2, y = height/2, vx = 0, vy = 0;
var jumpable = false;

var key = {left:false,down:false,up:false,right:false};

var current;

function ground(){
  if(key.left)vx-=3;
  if(key.right)vx+=3;
  vx *= 0.8
  vy += 0.8;
  x += vx;
  y += vy;
  if(y > height-ch){
    vy = 0;
    y = height-ch;
  }
  if(key.up){
    vy = -15;
    current = jump1;
    jumpable = false;
  };
  if(x < 0 && vx < 0)x = 0, vx = 0;
  if(x > width-cw && vx > 0)x = width-cw, vx = 0;
}

function jump1(){
  if(key.left)vx-=0.001;
  if(key.right)vx+=0.001;
  vx *= 0.99;
  vy += 0.8;
  x += vx;
  y += vy;
  if(y > height-ch){
    vy = 0;
    y = height-ch;
    current = ground;
  }
  if(key.up){
    if(jumpable){
      vy = -15;
      current = jump2;
      jumpable = false;
    }
  }
  if(x < 0 && vx < 0)x = 0, vx = 0, current = wall;
  if(x > width-cw && vx > 0)x = width-cw, vx = 0, current = wall;
}

function jump2(){
  if(key.left)vx-=0.001;
  if(key.right)vx+=0.001;
  vx *= 0.99;
  vy += 0.8;
  x += vx;
  y += vy;
  if(y > height-ch){
    vy = 0;
    y = height-ch;
    current = ground;
  }
  if(x < 0 && vx < 0)x = 0, vx = 0, current = wall;
  if(x > width-cw && vx > 0)x = width-cw, vx = 0, current = wall;
}

function wall(){
  if(key.left)vx-=0.001;
  if(key.right)vx+=0.001;
  vx *= 0.99;
  vy += 0.8;
  if(x < width/2 && key.left || x > width/2 && key.right){
    vy = Math.min(vy,3.0);
  }
  x += vx;
  y += vy;
  if(y > height-ch){
    vy = 0;
    y = height-ch;
    current = ground;
  }
  if(key.up){
    if(jumpable){
      vy = -15;
      if(x < width/2)vx = 10;
      else vx = -10;
      current = jump1;
      jumpable = false;
    }
  }
  if(x < 0 && vx < 0)x = 0, vx = 0;
  if(x > width-cw && vx > 0)x = width-cw, vx = 0;
}

current = ground;

function execute(draw){
  draw(x,y,cw,ch);
  current();
  if(!key.up)jumpable = true;
}
function input(e,pressing){
  if(e.keyCode==37)key.left = pressing;
  if(e.keyCode==38)key.up = pressing;
  if(e.keyCode==39)key.right = pressing;
  if(e.keyCode==40)key.down = pressing;
}