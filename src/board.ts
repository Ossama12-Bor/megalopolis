import * as T from "./tile.js"
import * as D from "./deck.js"

const NUM_NEIGHBORS:number=4; 
type neighbors={
	North : number|undefined,
	Est : number|undefined,
	South : number|undefined,
	West : number|undefined
};
type Board={
	board:neighbors[],
	size:number,
	deck:D.deck, //it represents the reverse of game deck
	are_in_game:boolean[],
	coordinate:T.Coord2D[]
}
function initialize_are_in_game(board:Board):Board{
	for(let i=0;i<board.deck.size*NUM_NEIGHBORS;i++){
		board.are_in_game[i]=false;
	}
	return board;
}
function initialize_coord(board:Board):Board{
	for(let i=0;i<board.deck.size*NUM_NEIGHBORS;i++){
		board.coordinate[i]={x:undefined,y:undefined};
	}
	return board;
}
/*block_id=tile_id_in_deck_game+street_position*/
// this function initialize neighbors of each tile with neighbors inside the tile*/

function initialize_neighbor(board:Board,block_id:number):Board{
	if(block_id%NUM_NEIGHBORS===0)
		board.board[block_id]={North:undefined,Est:block_id+1,South:block_id+2,West:undefined};
	else if(block_id%NUM_NEIGHBORS===1)
		board.board[block_id]={North:undefined,Est:undefined,South:block_id+2,West:block_id-1};
	else if(block_id%NUM_NEIGHBORS===2)
		board.board[block_id]={North:block_id-2,Est:block_id+1,South:undefined,West:undefined};
	else (block_id%NUM_NEIGHBORS===3)
		board.board[block_id]={North:block_id-2,Est:undefined,South:undefined,West:block_id-1};
	return board;
}

//returns a board structure that contains deck

function empty_Board(deck:D.deck):Board{
	let board:Board={board:[],size:0,deck:deck,are_in_game:[],coordinate:[]};
	return board;
}
// this function initialize neighbors of each street in the game,intialize coordinate and makes all streets out of the game"
function initialize_board(board:Board,deck :D.deck,size:number):Board{
	
	if(size===0)
		return board;
	else{
		let new_board:Board =initialize_board(initialize_neighbor(board,size-1),deck,size-1);
		return initialize_are_in_game(initialize_coord(new_board));
	}
}

function who_is_in_coord(board:Board,coord:T.Coord2D){
	board.coordinate.filter((x)=> x==coord);
}
//it gives coordinates to each street when we want to put it on the board

function give_coordinate(board:Board,coord:T.Coord2D,block_id:number){
	let new_board:Board=board;
	if(coord.x!=undefined &&coord.y!=undefined ){
	new_board.coordinate[block_id]=coord;
	new_board.coordinate[block_id+1]={x:coord.x+1,y:coord.y};
	new_board.coordinate[block_id+2]={x:coord.x,y:coord.y+1};
	new_board.coordinate[block_id+3]={x:coord.x+1,y:coord.y+1};
	}
	return new_board;
}
function become_in_game(board:Board,block_id:number):Board{
	let new_board:Board=board;
	for(let i=0;i<NUM_NEIGHBORS;i++){
		new_board.are_in_game[block_id+i]=true;
		if(new_board.)
	}
	
	
	return new_board;
}
function first_tile(board:Board):Board{
	let new_board:Board=board;



}

