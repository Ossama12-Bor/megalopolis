//representing different Block colors
enum BlockColor {GREEN=0,
		   GRAY=1,
		   BLUE=2,
		   ORANGE=3
		  };

//representing the 4 directions
enum Direction {N=0,
		E=1,
		S=2,
		W=3
	       };

//representation of 2D coordinates
type Coord2D = {
    x : number | undefined,
    y : number | undefined
};

//representation of a road
type Road = Direction[] | undefined;

//Rep. of a Block : quartier
type Block = {
    color : BlockColor,
    coord : Coord2D,
    road : Road /*can be undefined of not a road*/
};

//Rep. of a Tile : tuile
type Tile = {
    blockList : Block[],
    coord : Coord2D
};

/*Function to return the string of a color*/
function colorToString(color : BlockColor) : string{
    let Cstrings = ["GREEN","GRAY","BLUE","ORANGE"];
    return Cstrings[color];
}

/*Returning coords of a block*/
function getBlockCoord(b : Block) : Coord2D{
    return b.coord;
}

/*Returning a block s color*/
function getBlockColor(b : Block) : BlockColor{
    return b.color;
}

/*Returning coords of a tile*/
function getTileCoord(t : Tile) : Coord2D{
    return t.coord;
}

function getBlockList(t : Tile) : Block[]{
    return t.blockList;
}

function extractBlock(t : Tile,index : number) : Block{
    return getBlockList(t)[index];
}

function getRoad(b : Block) : Road{
    return b.road;
}

function CreateBlock(c: BlockColor, coord: Coord2D, r: Road): Block {
    let b : Block = {
        color: c,
        coord: coord,
        road: r
    };
    return b;
}
/*makes a Coord2D struct out of (x,y)*/
function to2Dcoord(x : number,y : number) : Coord2D {
    let coord : Coord2D = {
	x : x,
	y : y
    }
    return coord;
}
/*Initializes a Tile from a list of blocks*/
function CreateTile(blockList : Block[]) : Tile{
    let t : Tile ={
	blockList : blockList,
	coord : getBlockCoord(blockList[0])
    }
    return t;
}

/*Flips a tile (maybe returns new one)*/
function flipTile(t : Tile) : Tile{
    let swapBlocks = ([b1,b2,b3,b4] : Block[]) => [b3,b4,b1,b2];
    let newt : Tile = {
	blockList: swapBlocks(getBlockList(t)),
	coord:t.coord
    }
    return newt;
}

/*Displays a block for debug and test*/
function DisplayBlock(b : Block, prefix : string){
    console.log(`${prefix}${colorToString(getBlockColor(b))}:(${getBlockCoord(b).x},${getBlockCoord(b).y}):${getRoad(b)}`);
}
/*Displays a Tile for same purpose*/
function DisplayTile(t : Tile,prefix : string){
    console.log(`${prefix}`);
    console.log("==========");
    for(let i = 0;i < 4;i++)
	DisplayBlock(extractBlock(t,i),`Block(${i}) = `);
    console.log("==========");
}
//function generateTile()

export {
    getBlockCoord,
    getBlockColor,
    getTileCoord,
    getBlockList,
    getRoad,
    CreateBlock,
    to2Dcoord,
    CreateTile,
    flipTile,
    DisplayBlock,
    DisplayTile,
    BlockColor,
    Block,
    Direction,
    Coord2D,
    Road,
    Tile,
    colorToString,
} ;
/*Displays a Tile for debug and test*/
//function DisplayTile(t : Tile)









