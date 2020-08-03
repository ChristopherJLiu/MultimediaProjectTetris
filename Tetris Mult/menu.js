//Handlers for the menu buttons etc and img stuff 
var I = new Image();
var L = new Image();
var J = new Image();
var O = new Image();
var Z = new Image();
var S = new Image();
var T = new Image();

I.src = 'imgs/Cyan.png';
L.src = 'imgs/Orange.png';
J.src = 'imgs/Blue.png';
O.src = 'imgs/Yellow.png';
Z.src = 'imgs/Green.png';
S.src = 'imgs/Red.png';
T.src = 'imgs/Purple.png';



var mode=0;
var volume=0.5;
var nlevel=5;

$('.normal').click(function() {
  $('#main').hide();
  var obj = document.createElement("audio");
  obj.src="sound/beep.wav";
  obj.volume=volume;
  obj.autoPlay=false;
  obj.preLoad=true; 
  obj.play();
  var canvas = document.createElement('canvas');
  canvas.id     = "tetris";
  canvas.width  = 420;
  canvas.height = 600;
  document.body.appendChild(canvas);
  var canvasnext = document.createElement('canvas');
  canvasnext.id     = "tetrisnextpiece";
  canvasnext.width  = 150;
  canvasnext.height = 150;
  document.body.appendChild(canvasnext);
  $( '#menu' ).append( '<div class="score">SCORE: <span id="score"></span></div>');
  $( '#menu' ).append( '<div class="level">LEVEL: <span id="level"></span></div>');
  $( '#menu' ).append( '<div class="next" id="next">NEXTPIECE</div');
  $( '#menu' ).append( '<div class="game-over" id="game-over">GAME OVER</div');
  mode=1;
   $.getScript("tetrisc.js");
});

$('.challenge').click(function() {
  $('#main').hide();
  var obj = document.createElement("audio");
  obj.src="sound/beep.wav";
  obj.volume=volume;
  obj.autoPlay=false;
  obj.preLoad=true; 
  obj.play();
  var canvas = document.createElement('canvas');
  canvas.id     = "tetris";
  canvas.width  = 420;
  canvas.height = 600;
  document.body.appendChild(canvas);
  var canvasnext = document.createElement('canvas');
  canvasnext.id     = "tetrisnextpiece";
  canvasnext.width  = 150;
  canvasnext.height = 150;
  document.body.appendChild(canvasnext);
  $( '#menu' ).append( '<div class="score">SCORE: <span id="score"></span></div>');
  $( '#menu' ).append( '<div class="level">LEVEL: <span id="level"></span></div>');
  $( '#menu' ).append( '<div class="next" id="next">NEXTPIECE</div');
  $( '#menu' ).append( '<div class="game-over" id="game-over">GAME OVER</div');
  mode=2;
   $.getScript("tetrisc.js");
});

$('.settings').click(function() {
  document.getElementById('Volume').innerText = volume.toFixed(1);
  document.getElementById('Level').innerText = nlevel;
  var obj = document.createElement("audio");
  obj.src="sound/beep.wav";
  obj.volume=volume;
  obj.autoPlay=false;
  obj.preLoad=true; 
  obj.play();
  $('#main').hide();
  $('#settings').show();
});



$('.help').click(function() {
  var obj = document.createElement("audio");
  obj.src="sound/beep.wav";
  obj.volume=volume;
  obj.autoPlay=false;
  obj.preLoad=true; 
  obj.play();
  $('#main').hide();
  $('#help').show();
});

$('.back').click(function() {
  var obj = document.createElement("audio");
  obj.src="sound/beep.wav";
  obj.volume=volume;
  obj.autoPlay=false;
  obj.preLoad=true;
  obj.play();
  $('#help').hide();
  $('#credits').hide();
  $('#settings').hide();
  $('#main').show();
});

$('.credit').click(function() {
  var obj = document.createElement("audio");
  obj.src="sound/beep.wav";
  obj.volume=volume;
  obj.autoPlay=false;
  obj.preLoad=true; 
  obj.play();
  $('#main').hide();
  $('#credits').show();
});

$('.minusv').click(function() {
  if(volume>0){
    volume=volume-0.1;
  }
  else{
    volume=0;
  }
  document.getElementById('Volume').innerText = volume.toFixed(1);
  var obj = document.createElement("audio");
  obj.src="sound/beep.wav";
  obj.volume=volume;
  obj.autoPlay=false;
  obj.preLoad=true; 
  obj.play();
});

$('.plusv').click(function() {
  if(volume<1){
    volume=volume+0.1;
  }
  else{
    volume=1;
  }
  document.getElementById('Volume').innerText = volume.toFixed(1);
  var obj = document.createElement("audio");
  obj.src="sound/beep.wav";
  obj.volume=volume;
  obj.autoPlay=false;
  obj.preLoad=true; 
  obj.play();
});


$('.minusl').click(function() {
  if(nlevel<=1){
    nlevel=1;
  }
  else{
    nlevel--;
  }
  document.getElementById('Level').innerText = nlevel;
  var obj = document.createElement("audio");
  obj.src="sound/beep.wav";
  obj.volume=volume;
  obj.autoPlay=false;
  obj.preLoad=true; 
  obj.play();
});

$('.plusl').click(function() {
  if(nlevel>=10){
    nlevel=10;
  }
  else{
    nlevel++;
  }
  document.getElementById('Level').innerText = nlevel;
  var obj = document.createElement("audio");
  obj.src="sound/beep.wav";
  obj.volume=volume;
  obj.autoPlay=false;
  obj.preLoad=true; 
  obj.play();
});



