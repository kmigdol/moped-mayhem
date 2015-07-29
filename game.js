
var GRID_WIDTH = 10;
var GRID_HEIGHT = 11;
var TILE_WIDTH = 50; //Tiles are 50x50 pixels



//Constructor for Entitiy Class
function Entity (w,h,m,xPos,yPos,img) {
	this.width = w;
	this.height = h;
	this.canMoveOnto = m;
	this.x = xPos;
	this.y = yPos;
	this.imageSource = img;
}

function Character (xPos, yPos, img){
	this.x = xPos;
	this.y = yPos;
	this.img = img;
}

//Constructor for Tile Class
function Tile (w,h,m,xPos,yPos,img) {
	Entity.call(this,w,h,m,xPos,yPos,img);
} 

//Constructor for Movable Class
function Movable (w,h,m,xPos,yPos,img,xDir) {
	Entity.call(this,w,h,m,xPos,yPos,img);
	this.xMove = xDir;
} 

//Road Tile constructor
function Road (x,y) {
	Tile.call(this,1,1,true,x,y,"testImages/road.jpg");
}

//River constructor
function River (x,y) {
	Tile.call(this,1,1,false,x,y,"testImages/temp-tile.png");
}

//Ground Tile constructor
function Ground (x,y) {
	Tile.call(this,1,1,true,x,y,"testImages/temp-tile.png");
}

//Moped constructor
function Moped (x,y,dir) {
	Movable.call(this,1,1,false,x,y,"",dir);
}

//Boat constructor
function Boat (x,y,dir) {
	Movable.call(this,1,1,true,x,y,"",dir);	
}

//Medical Kit constructor
function MedicalKit(x,y) {
	Movable.call(this,1,1,true,x,y,"",0);
}

//Building constructor
function Building(x,y) {
	Movable.call(this,1,1,false,x,y,"",0);
}

function Tree(x,y) {
	Movable.call(this,1,1,false,x,y,"",0);
}

// constructor for tileRow
function tileRow (y) {
	this.tiles = [];
	this.objects = [];
	this.y = y;
	var rowType = Math.round(Math.random()*5);
	console.log(rowType);
	if (rowType === 0) {
		for (var i = 0; i < GRID_WIDTH; i++) {
			this.tiles[i] = new Ground(i,y);
		}
		var numOfObjects =  Math.round(Math.random()*2) + 3;
		var curX = 0;
		console.log(numOfObjects);
		for (var i = 0; i < numOfObjects; i++) {
			var objType = Math.round(Math.random()*3);
			console.log(objType);
			var object;
			if (objType === 0) {
				object = new MedicalKit(curX,y);
				console.log("Adding Medical Kit");
			}
			else if (objType === 1) {
				object = new Building(curX,y);
				console.log("adding Building");
			}
			else  {
				object = new Tree(curX,y);
				console.log("adding tree");
			}
			this.objects.push(object);
			curX += Math.round(Math.random()*3) + 1;
		}
		console.log("creating Ground");
	}
	else if (rowType < 3) {
		var dir = Math.round(Math.random(2));
		if (dir === 0) {
			dir -= 1;
		}
		for (var i = 0; i < GRID_WIDTH; i++) {
			this.tiles[i] = new Road(i,y);
		}
		var numOfMopeds = Math.round(Math.random()*2) + 3;
		var curX = 0;
		for (var i = 0; i < numOfMopeds; i++) {
			this.objects.push(new Moped(curX,y,dir));
			curX += Math.round(Math.random()*3) + 2;
		}	
		console.log("creating road");
	}
	else {
		var dir = Math.round(Math.random()*2);
		if (dir === 0) {
			dir -= 1;
		}
		for (var i = 0; i < GRID_WIDTH; i++) {
			this.tiles[i] = new River(i,y);
		}
		var numOfBoats = Math.round(Math.random()*2) + 3;
		var curX = 0;
		for (var i = 0; i < numOfBoats; i++) {
			this.objects.push(new Boat(curX,y,dir));
			curX += Math.round(Math.random()*3) + 2;
		}	
		console.log("creating river");
	}
}

//increases the y of a tileRow by one
tileRow.prototype.shiftDown = function() {
	this.y++;	
};

//constructor for the grid
function Grid () {
	this.rows = [];
	for (var i = 0; i < GRID_HEIGHT; i++) {
		this.rows.push(new tileRow(i));
	}
}

//shifts the grid down by one
Grid.prototype.shiftDown = function() {
	this.rows.pop();
	for (var i = 0; i < this.rows.length; i++) {
		this.rows[i].shiftDown();
	}
	this.rows.unshift(new tileRow(0));
};
// creates the grid
var grid = new Grid();
console.log(grid);


var stage;
runGame();
function runGame() {
	$(document).ready(function(){
		console.log("ready");
		stage = new createjs.Stage("demoCanvas");
		drawTiles();
   

	});
}

function drawTiles() {
	console.log("draw tiles");
	for(var row = 0; row < grid.rows.length; row++) {
		var tileRow = grid.rows[row];
		var arrayOfTiles = tileRow.tiles;
		
		for(var col = 0; col < arrayOfTiles.length; col++) {
			var tile = arrayOfTiles[col];
			//console.log("tiles");
			
			var image = new Image();
    		image.src = tile.imageSource;
    	//	image.src = "testImages/road.jpg";

    		//console.log(tile.x + " : " + tile.y);
    		
	    		var bitmap = new createjs.Bitmap(image);
	       		console.log("image loaded");
	         	
	         	stage.addChild(bitmap);
	         	bitmap.x = tile.x * TILE_WIDTH;
	         	bitmap.y = tile.y * TILE_WIDTH;  

	         	console.log(bitmap.x + " : " + bitmap.y);  
	         	
	         $(image).load(function(){
				stage.update();
         	 });	
   			

    		
		}
	}

}




//grid.shiftDown();
console.log(grid);


function init() {
    
  }

	
	



var character = new Character(5,10,"");


function printKey(e){
	console.log(e.keyCode);



	if(e.keyCode === 37){
	  console.log("left");
	  character.x-=1;

	}

	if(e.keyCode === 38){
	  console.log("up");
	  character.y-=1;
	}

	if(e.keyCode === 39){
	  console.log("right");
	  character.x+=1;
	}

	// if(e.keyCode === 40){
	//   console.log("down");
	//   character.y+=1;
	// }

}	



