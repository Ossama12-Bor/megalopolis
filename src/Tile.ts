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

function getRoad(b : Block) : Road{
    return b.road;
}

function CreateBlock(c: BlockColor, coord: Coord2D, r: Road): Block {
    // Initialize b as a new Block object
    let b: Block = {
        color: c,
        coord: coord,
        road: r
    };
    return b;
}
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
    let swapBlocks = ([a,b,c,d] : Block[]) => [c,d,a,b];
    return swapBlocks(getBlockList(t));
}

/*Displays a block for debug and test*/
function DisplayBlock(b : Block){
    console.log(`${getBlockColor(b)}:${getBlockCoord(b)}:${getRoad(b)}`);
}

export{
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
    Coord2D,
    Road,
    Block,
    Tile

}
/*Displays a Tile for debug and test*/
//function DisplayTile(t : Tile)









