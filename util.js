window.onload = function(){
  var width = 0, height = 0;
  var canvas = document.getElementById("canvas");
  function resize(){
    width = canvas.width = document.getElementById("container").clientWidth;
    height = canvas.height = document.getElementById("container").clientHeight;
  }
  resize();
  window.onresize = resize;

  var ctx = canvas.getContext('2d');
  var w = 640, h = 480;
  function render(){
    ctx.clearRect(0,0,width,height);
    ctx.save();
    ctx.translate(width/2-w/2,height/2-h/2);
    ctx.beginPath();
    ctx.rect(0,0,w,h);
    ctx.lineWidth = 2.0;
    ctx.stroke();
    ctx.fillStyle = 'rgb(0,100,255)';
    if(execute)execute(function(x,y,w,h){
      ctx.fillRect(x,y,w,h);
    },w,h);
    ctx.restore();
    requestAnimationFrame(render);
  }
  render();
};
window.onkeydown = function(e){
  if(input)input(e,true);
};
window.onkeyup = function(e){
  if(input)input(e,false);
};