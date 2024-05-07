//representing different Block colors
enum BlockColor {GREEN=0,GRAY=1,BLUE=2,ORANGE=3,NUM_COLORS=4}

//representing the 4 directions
enum Direction {N=0,E=1,S=2,W=3,Direction_count=4}

//representation of 2D coordinates
type Coord2D = {
    x : number,
    y : number
};

//representation of a road
enum Road {
	NORTH_SOUTH=0,
	WEST_EST=3,
	NORTH_EST=1,
	NORTH_WEST=2,
	SOUTH_EST=-2,
	SOUTH_WEST=-1,
	NO_ROAD=4,
	ROAD_COUNT=6
}

//Rep. of a Block : quartier
type Block = {
    color : BlockColor,
    road : Road/*can be undefined of not a road*/
};

//Rep. of a Tile : tuile
type Tile = {
    blockList : Block[]
};

/*Function to return the string of a color*/
function colorToString(color : BlockColor) : string{
    const Cstrings = ["GREEN","GRAY","BLUE","ORANGE"];
    return Cstrings[color];
}

/*Returning coords of a block*/
/*function getBlockCoord(b : Block) : Coord2D{
    return b.coord;
}
*/
/*Returning a block s color*/
function getBlockColor(b : Block) : BlockColor{
    return b.color;
}

/*Returning coords of a tile*/
/*function getTileCoord(t : Tile) : Coord2D{
    return t.coord;
}
*/
function getBlockList(t : Tile) : Block[]{
    return t.blockList;
}

function extractBlock(t : Tile,index : number) : Block{
    return getBlockList(t)[index];
}

function getRoad(b : Block) : Road{
    return b.road;
}

function CreateBlock(c: BlockColor, r: Road): Block {
    const b : Block = {
        color: c,
        road: r
    };
    return b;
}
/*makes a Coord2D struct out of (x,y)*/
function to2Dcoord(x : number,y : number) : Coord2D {
    const coord : Coord2D = {
	x : x,
	y : y
    };
    return coord;
}
/*Initializes a Tile from a list of blocks*/
function CreateTile(blockList : Block[]) : Tile{
    const t : Tile ={
	blockList : blockList
    };
    return t;
}

/*Flips a tile (maybe returns new one)*/
/*function flipTile(t : Tile) : Tile{
    let swapBlocks = ([b1,b2,b3,b4] : Block[]) => [b3,b4,b1,b2];
    let newt : Tile = {
	blockList: swapBlocks(getBlockList(t)),
	coord:t.coord
    }
    return newt;
}
*/
/*Displays a block for debug and test*/
function DisplayBlock(b : Block, prefix : string){
    console.log(`${prefix}${colorToString(getBlockColor(b))}:${getRoad(b)}`);
}
/*Displays a Tile for same purpose*/
function DisplayTile(t : Tile,prefix : string){
    console.log(`${prefix}`);
    console.log("==========");
    for(let i = 0;i < BlockColor.NUM_COLORS;i++)
	DisplayBlock(extractBlock(t,i),`Block(${i}) = `);
    console.log("==========");
}
function generateTile():Tile
{
    const table = [ BlockColor.ORANGE, BlockColor.GRAY, BlockColor.GREEN, BlockColor.BLUE];
	const building:Block=CreateBlock(BlockColor.ORANGE,Math.floor(Math.random()*1000)%Road.ROAD_COUNT-2);
	const indusrty:Block=CreateBlock(BlockColor.GRAY,Math.floor(Math.random()*1000)%Road.ROAD_COUNT-2);
	const parc:Block=CreateBlock(BlockColor.GREEN,Road.NO_ROAD);
	const commercial_center:Block=CreateBlock(BlockColor.BLUE,Math.floor(Math.random()*1000)%Road.ROAD_COUNT-2);
    let tile:Block[]=[building,indusrty,parc,commercial_center];
    for (let i = tile.length - 1; i > 0; i--) {
	const j = Math.floor(Math.random() * (i + 1));
	const temp = tile[i];
	tile[i] = tile[j];
	tile[j] = temp;
    }
    
    return CreateTile(tile);
}

export {
    getBlockColor,
    getBlockList,
    getRoad,
    CreateBlock,
    to2Dcoord,
    CreateTile,
    //flipTile,
    DisplayBlock,
    DisplayTile,
    BlockColor,
    Block,
    Direction,
    Coord2D,
    Road,
    Tile,
    colorToString,
	generateTile
};
/*Displays a Tile for debug and test*/
//function DisplayTile(t : Tile)









