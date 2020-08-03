const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');

const canvasnext = document.getElementById('tetrisnextpiece');
const ctxnext = canvasnext.getContext('2d');

const levelspeed =[1000,1000,900,800,700,600,500,400,300,200,100];

const colors = [
    null,
    I,
    L,
    J,
    O,
    Z,
    S,
    T,
];
var backgroundAudio = new Audio("sound/kick_shock.wav");
backgroundAudio.loop = true;
backgroundAudio.volume = volume;
backgroundAudio.load();
backgroundAudio.play();
var gameover=0;

ctx.scale(30,30);
ctxnext.scale(30,30);

ctx.fillRect(0, 0, canvas.width, canvas.height);
ctxnext.fillRect(0, 0, canvas.width, canvas.height);

function sweep() {
    outer: for (let y = board.length -1; y > 0; --y) {
        for (let x = 0; x < board[y].length; ++x) {
            if (board[y][x] === 0) {
                continue outer;
            }
        }

        const row = board.splice(y, 1)[0].fill(0);
        board.unshift(row);
        ++y;

        player.score+=player.level*10;
        if(mode == 2){//if challenger mode
            if(player.score>=player.level*10 && player.level<10){//FOR TESTING PLAYER.LEVEL*10 NORMALLY SHOULD BE PLAYER.LEVEL*100
                player.level++;
                dropInterval=levelspeed[player.level];
            }
        }
    }
}


function collision(board, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 && // check player matrix !=0
               (board[y + o.y] && // check if the board is at the end 
                board[y + o.y][x + o.x]) !== 0) {// check if the spot is not occupied
                return true;
            }
        }
    }
    return false;
}

function Piece(type){
    if (type === 'I') {
        return [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ];
    } else if (type === 'L') {
        return [
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2],
        ];
    } else if (type === 'J') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [3, 3, 0],
        ];
    } else if (type === 'O') {
        return [
            [4, 4],
            [4, 4],
        ];
    } else if (type === 'Z') {
        return [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'T') {
        return [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
        ];
    }
}


function createMatrix (width, height){
	const matrix=[];
	while(height--){
		matrix.push(new Array(width).fill(0));
	}
	return matrix;
}

function draw(){
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctxnext.fillStyle = 'black';
	ctxnext.fillRect(0, 0, canvasnext.width, canvasnext.height);
	drawMatrix(board, {x:0, y:0})
	drawMatrix(player.matrix, player.pos);
	drawNextMatrix(player.matrixnext,{x:1,y:1});

}

function drawMatrix(matrix, offset){
	matrix.forEach((row,y) =>{
		row.forEach((value,x) =>{
			if(value !==0) {
				ctx.drawImage(colors[value],x+offset.x,y+offset.y,1,1);
			}
		});
	});
}

function drawNextMatrix(matrix, offset){
	matrix.forEach((row,y) =>{
		row.forEach((value,x) =>{
			if(value !==0) {
                ctxnext.drawImage(colors[value],x+offset.x,y+offset.y,1,1);
			}
		});
	});
}





//drop speed calc
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
function update(time=0){//update screen
	const dTime = time - lastTime;
	lastTime = time;
	dropCounter+=dTime;
	if(dropCounter>dropInterval){
		if(gameover!=1)
			playerDrop();
	}
	draw();
	requestAnimationFrame(update);
}

function updatescorelevel(){
	document.getElementById('score').innerText = player.score;
	document.getElementById('level').innerText = player.level;
}

function copy(board, player) {//copy the value from player to board
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                board[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function playerRotate(dir){
	const pos = player.pos.x;
	let offset =1;
	rotate(player.matrix, dir);
	while(collision(board,player)){
		player.pos.x += offset;
		offset = -(offset+(offset> 0 ? 1: -1));
		if(offset > player.matrix[0].length){
			rotate(player.matrix, -dir);
			player.pos.x=pos;
			return ;
		}
	}
}

function rotate(matrix, dir){//Transpose+reverse=rotate
	for(let y=0; y<matrix.length ; ++y){
		for(let x=0; x<y; ++x){
			[matrix[x][y],matrix[y][x],]=[matrix[y][x],matrix[x][y],];
		}
	}
	if(dir>0){
		matrix.forEach(row=> row.reverse());
	}else{
		matrix.reverse();
	}
}

function playerDrop(){
	player.pos.y++;
	if(collision(board,player)){
		player.pos.y--;
		copy(board,player);
		PieceRandom();
		sweep();
		updatescorelevel();
	}
	dropCounter=0;
}

function playerMove(dir){
	player.pos.x += dir;
	if(collision(board,player)){
		player.pos.x -= dir;
	}
}

function PieceRandom() {
    const pieces = 'TJLOSZI';
    if(player.matrix==null){//Game starting no pieces
    	player.matrix = Piece(pieces[pieces.length * Math.random() | 0]);
    	player.matrixnext = Piece(pieces[pieces.length * Math.random() | 0]);
    }
    else{
    	player.matrix=player.matrixnext;
    	player.matrixnext = Piece(pieces[pieces.length * Math.random() | 0]);    
    }
    player.pos.y = 0;
    player.pos.x = (board[0].length / 2 | 0) -(player.matrix[0].length / 2 | 0);//puts piece on mid of screen
    if (collision(board, player)) {//gameover
    	gameover=1;
    	ctx.clearRect(0,0,canvas.width,canvas.height);
    	backgroundAudio.pause();
    	document.getElementById('game-over').style.display = "block";
    	$( "#tetris" ).remove();
    	$( "#tetrisnextpiece" ).remove();
		$( ".next").remove();
		$( ".score" ).remove();
		$( ".level").remove();
    	$( '#menu' ).append('<a href="javascript:void(0)" class="button back">Back</a>');
    	$('.back').click(function() {
			var obj = document.createElement("audio");
        	obj.src="sound/beep.wav";
        	obj.volume=0.20;
        	obj.autoPlay=false;
        	obj.preLoad=true;
        	obj.play();
			$( ".game-over" ).remove();
			$( ".back" ).remove();
 			$('#main').show();
 			window.location.reload(true);
		});
    }
}



document.addEventListener('keydown', event=> {
	if( event.keyCode == 37){//Moves piece to left
		playerMove(-1);
	}
	if( event.keyCode == 39){//Moves piece to right
		playerMove(1);
	}
	if( event.keyCode == 40){//Moves piece faster down
		if(gameover!=1)
			playerDrop();
	}
	if( event.keyCode == 32){//Rotate
		playerRotate(1);
	}
})


const board = createMatrix(14,20);

const player = {
	pos:{x:0, y:0},
	matrix: null,
	matrixnext: null,
	score:0,
	level:1,
}

function Mode(){//if mode = normal sets speed
    if(mode==1){
        player.level=nlevel;
        dropInterval=levelspeed[player.level];
    }
}

Mode();
document.getElementById('score').innerText = player.score;
document.getElementById('level').innerText = player.level;
PieceRandom();
update();