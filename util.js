var width = 640, height = 480;
window.onload = function(){
  var cvsW = 0, cvsH = 0;
  var canvas = document.getElementById("canvas");
  function resize(){
    cvsW = canvas.width = document.getElementById("container").clientWidth;
    cvsH = canvas.height = document.getElementById("container").clientHeight;
  }
  resize();
  window.onresize = resize;

  var ctx = canvas.getContext('2d');
  ctx.textAlign = "center"
  ctx.font = height + "px 'Courier'";
  function render(){
    ctx.clearRect(0,0,cvsW,cvsH);
    ctx.save();
    ctx.translate(cvsW/2-width/2,cvsH/2-height/2);
    ctx.beginPath();
    ctx.rect(0,0,width,height);
    ctx.lineWidth = 2.0;
    ctx.stroke();
    if(execute)execute(function(x,y,w,h){
      ctx.fillStyle = 'rgb(0,100,255)';
      ctx.fillRect(x,y,w,h);
    },function(str){
      ctx.fillStyle = 'rgba(128,128,192,0.3)';
      ctx.fillText(str,width/2,height*0.8);
    },width,height);
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
