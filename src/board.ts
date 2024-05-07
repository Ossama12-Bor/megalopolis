
import * as T from "./tile.js";
import * as D from "./deck.js";
import * as G from "./graph.js";



const NUM_NEIGHBORS:number=4;

type Board={
	board:{[key:string]:number},
	tiles_played_num:number,
	deck:D.deck //it represents the reverse of game deck
	empty:{[key:string]:number}
}

function coordToString(coord: T.Coord2D): string {
    return `${coord.x},${coord.y}`;
}

function StringToCoord(chaine:string):T.Coord2D{
	const i:number=chaine.indexOf(",");
	const coord:T.Coord2D ={x:+chaine.substring(0,i),y:+chaine.substring(i+1)};
	return coord;
}

function initializeBoard(){
    const b : Board = {
	board : {},
	tiles_played_num: 0,
	deck : D.deck_empty(),
	empty:{'0,0':1}
    }
    return b;
}

function getBoard(board : Board) : {[key:string]:number} {
    return board.board;
}


function who_is_in_coord(board:Board,coord:T.Coord2D):number{
	const coordstring:string=coordToString(coord);
	if(board.empty.hasOwnProperty(coordstring))
		return board.board[coordToString(coord)];
	else
		return -1;
}
function blockInPosition(board:Board,coord:T.Coord2D):T.Block{
	let coordinate:number=who_is_in_coord(board,coord);
	return board.deck.deck[coordinate/NUM_NEIGHBORS].blockList[coordinate%NUM_NEIGHBORS];
}
/*function connected_by_road(block1:T.Block,BLOCK2:T.Block):Boolean{
	return true;
}*/
/*function is_available_coord(board:Board,coord:T.Coord2D):boolean{
	const x_0=coord.x;
	const y_0=coord.y;
	for(let i=-2;i<3;i++){
		for(let j=-2;j<3;j++){
		let x=x_0-i;
		let y=y_0-j;
		console.log(x,y,i,j);
		if(Math.abs(i)+Math.abs(j)<=3){
			const new_coord:T.Coord2D={x:x,y:y};
			const new_string_coord=coordToString(new_coord);
			if( new_string_coord in board.board){
				return true;
			}
		}
		}
	}
	return false;
}
*/

function is_road_connected(board: Board, coord_id: string, coord_id_neighbour: string): boolean {
    const x_id = StringToCoord(coord_id).x;
    const y_id = StringToCoord(coord_id).y;
    const x_id_neighbour = StringToCoord(coord_id_neighbour).x;
    const y_id_neighbour = StringToCoord(coord_id_neighbour).y;
    let direction = 0;
    if (x_id_neighbour === x_id + 1) direction = 1;
    else if (x_id_neighbour === x_id - 1) direction = 3;
    else if (y_id_neighbour === y_id - 1) direction = 2;        
    const id = board.board[coord_id];
    const id_neighbour = board.board[coord_id_neighbour];
    const tileIndex_id = Math.floor(id / 4);
    const blockIndexInTile_id = id % 4;
    const tileIndex_id_neighbour = Math.floor(id_neighbour / 4);
    const blockIndexInTile_id_neighbour = id_neighbour % 4;
    const block_id = board.deck.deck[tileIndex_id * 4].blockList[blockIndexInTile_id];
    const block_id_neighbour = board.deck.deck[tileIndex_id_neighbour * 4].blockList[blockIndexInTile_id_neighbour];
    const road_id = block_id.road;
    const road_id_neighbour = block_id_neighbour.road;
    return (
        ((road_id === T.Road.WEST_EST || road_id === T.Road.NORTH_EST || road_id === T.Road.SOUTH_EST) &&
            (road_id_neighbour === T.Road.WEST_EST || road_id_neighbour === T.Road.NORTH_WEST || road_id_neighbour === T.Road.SOUTH_WEST) &&
            direction === 1) ||
        ((road_id === T.Road.WEST_EST || road_id === T.Road.NORTH_WEST || road_id === T.Road.SOUTH_WEST) &&
            (road_id_neighbour === T.Road.WEST_EST || road_id_neighbour === T.Road.NORTH_EST || road_id_neighbour === T.Road.SOUTH_EST) &&
            direction === 3) ||
        ((road_id === T.Road.NORTH_SOUTH || road_id === T.Road.NORTH_WEST || road_id === T.Road.NORTH_EST) &&
            (road_id_neighbour === T.Road.SOUTH_WEST || road_id_neighbour === T.Road.SOUTH_EST || road_id_neighbour === T.Road.NORTH_SOUTH) &&
            direction === 0) ||
        ((road_id === T.Road.NORTH_SOUTH || road_id === T.Road.SOUTH_WEST || road_id === T.Road.SOUTH_EST) &&
            (road_id_neighbour === T.Road.NORTH_WEST || road_id_neighbour === T.Road.NORTH_EST || road_id_neighbour === T.Road.NORTH_SOUTH) &&
            direction === 2)
    );
}

function add_positions_to_empty(empty:{[key:string]:number},coord:T.Coord2D){
	const x = coord.x;
	const y= coord.y;
	for(let i=-2;i<=2;i++){
		for(let j=-2;j<=2;j++){
			if(Math.abs(i)+Math.abs(j)<4){
				const new_coord={x:x+i,y:y+j};
				empty[coordToString(new_coord)]=0;
			}
		}
	}
}

function add_tile(board:Board,tile_id:number,coord:T.Coord2D){
	const new_coord1:T.Coord2D={x:coord.x,y:coord.y};
	const new_coord2:T.Coord2D={x:coord.x+1,y:coord.y};
	const new_coord3:T.Coord2D={x:coord.x,y:coord.y+1};
	const new_coord4:T.Coord2D={x:coord.x+1,y:coord.y+1};
	board.board[coordToString(new_coord1)]=tile_id*NUM_NEIGHBORS;
	board.board[coordToString(new_coord2)]=tile_id*NUM_NEIGHBORS+1;
	board.board[coordToString(new_coord3)]=tile_id*NUM_NEIGHBORS+2;
	board.board[coordToString(new_coord4)]=tile_id*NUM_NEIGHBORS+3;
	board.tiles_played_num+=1;
	add_positions_to_empty(board.empty,coord);
}


function print_board(board:Board){
	console.log(board.board);
	console.log(board.tiles_played_num);
	console.log(D.print_deck(board.deck,"***"));
}

/* construction of road graph , returns a graph*/
function constructRoadGraph(board : Board) : G.graph<number>{
    const b : {[key:string]:number} = getBoard(board);
    let g : G.graph<number> = G.cons_empty_graph();
    let c : T.Coord2D;
    /*
    Object.values(b).forEach(id => {
	g = G.add_node(g, id);
    });
    Object.keys(b).forEach(coord => {

	c = StringToCoord(coord);
	let id : number = b[c];
	let x = c.x;
	let y = c.y;
	// (x+1,y)(x-1,y)(x,y+1)(x,y-1)
	const neighbors = [[x+1,y], [x-1,y], [x,y+1], [x,y-1]];
	neighbors.forEach((n)=>{
	    let cStr =  coordToString(T.to2Dcoord(n[0],n[1]));
	    if(b[cStr] !== undefined)
		g = G.add_edge(g,b[cStr],id);
	});//to2Dcoord
	
    });
    */
    Object.entries(b).forEach(([_,id]) => {
	g = G.add_node(g,id);
    });
    
    Object.entries(b).forEach(([coord,id])=> {
	const x = StringToCoord(coord).x;
	const y = StringToCoord(coord).y;
	const neighbors = [[x+1,y], [x-1,y], [x,y+1], [x,y-1]];
	neighbors.forEach((n)=>{
	    const coord_neighbor : string =  coordToString(T.to2Dcoord(n[0],n[1]));
	    //console.log(cStr);
	    if(b[coord_neighbor] !== undefined){
		if(is_road_connected(board, coord, coord_neighbor))
		    g = G.add_edge(g,b[coord],id);
		//console.log(b[cStr]);
	    }
	});
    });
    
    return g;
}

function board_copy(board:Board):Board{
	const new_board:Board={board:{...board.board},tiles_played_num:board.tiles_played_num,deck:board.deck,empty:{...board.empty}};
	return new_board;
}


// function constructGroupGraph(board : Board) : G.graph<number>{}

export {
	NUM_NEIGHBORS,
	initializeBoard,
	add_tile,
	Board,
	coordToString,
	StringToCoord,
	who_is_in_coord,
	print_board,
	add_positions_to_empty,
    blockInPosition,
    constructRoadGraph,
	board_copy
};

