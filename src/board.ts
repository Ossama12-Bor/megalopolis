import * as T from "./tile.js";
import * as D from "./deck.js";

const NUM_NEIGHBORS:number=4; 
type neighbors_ids={
	North : number|undefined,
	Est : number|undefined,
	South : number|undefined,
	West : number|undefined
};
type Board={
	board:neighbors_ids[],
	size:number,
	deck:D.deck, //it represents the reverse of game deck
	are_in_game:boolean[],
	block_coordinate:T.Coord2D[]
}
function initialize_are_in_game(board:Board):Board{
	for(let i=0;i<board.deck.size*NUM_NEIGHBORS;i++){
		board.are_in_game[i]=false;
	}
	return board;
}
function initialize_coord(board:Board):Board{
	for(let i=0;i<board.deck.size*NUM_NEIGHBORS;i++){
		board.block_coordinate[i]={x:undefined,y:undefined};
	}
	return board;
}

function initialize_neighbor(board:Board,id:number):Board{
	if(id%NUM_NEIGHBORS===0)
		board.board[id]={North:undefined,Est:id+1,South:id+2,West:undefined};
	else if(id%NUM_NEIGHBORS===1)
		board.board[id]={North:undefined,Est:undefined,South:id+2,West:id-1};
	else if(id%NUM_NEIGHBORS===2)
		board.board[id]={North:id-2,Est:id+1,South:undefined,West:undefined};
	else
		board.board[id]={North:id-2,Est:undefined,South:undefined,West:id-1};
	return board;
}
function empty_Board(deck:D.deck):Board{
	const board:Board={board:[],size:0,deck:deck,are_in_game:[],block_coordinate:[]};
	return board;
}
function initialize_board(board:Board,deck :D.deck,size:number):Board{
	
	if(size===0)
		return board;
	else{
		const new_board:Board =initialize_board(initialize_neighbor(board,size-1),deck,size-1);
		return initialize_are_in_game(initialize_coord(new_board));
	}
}
function give_coordinate(board:Board,coord:T.Coord2D,id:number){
	const new_board:Board=board;
	if(coord.x!==undefined &&coord.y!==undefined ){
	new_board.block_coordinate[id]=coord;
	new_board.block_coordinate[id+1]={x:coord.x+1,y:coord.y};
	new_board.block_coordinate[id+2]={x:coord.x,y:coord.y+1};
	new_board.block_coordinate[id]={x:coord.x+1,y:coord.y+1};
	}
	return new_board;
}

function who_is_in_coord(board:Board,coord:T.Coord2D){
	for(let i=0;i<board.size;i++){
		if(board.block_coordinate[i]===coord)
			return i;
	}
	return -1;
}

function become_in_game(board:Board,block_id:number):Board{
	const new_board:Board=board;
	for(let i=0;i<NUM_NEIGHBORS;i++){
		new_board.are_in_game[block_id+i]=true;
		const index=who_is_in_coord(board,board.block_coordinate[block_id+i]);
		if(index!==-1 && new_board.are_in_game[index]===true)
			new_board.are_in_game[index]=false;
	}
	return new_board;
}


function add_tile(board:Board, id : number, coord : T.Coord2D) : Board{
    const new_board:Board = give_coordinate(become_in_game(board,id),coord,id);
    new_board.size += 4;
    return new_board;
}

export{
	initialize_are_in_game,
	initialize_board,
	initialize_neighbor,
	initialize_coord,
	who_is_in_coord,
	add_tile,
	become_in_game,
	give_coordinate,
	empty_Board,
	Board,
	NUM_NEIGHBORS,
	neighbors_ids
};