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

function initialize_neighbor(board:Board,id:number):Board{
	if(id%NUM_NEIGHBORS===0)
		board.board[id]={North:undefined,Est:id+1,South:id+2,West:undefined};
	else if(id%NUM_NEIGHBORS===1)
		board.board[id]={North:undefined,Est:undefined,South:id+2,West:id-1};
	else if(id%NUM_NEIGHBORS===2)
		board.board[id]={North:id-2,Est:id+1,South:undefined,West:undefined};
	else (id%NUM_NEIGHBORS===3)
		board.board[id]={North:id-2,Est:undefined,South:undefined,West:id-1};
	return board;
}
function empty_Board(deck:D.deck):Board{
	let board:Board={board:[],size:0,deck:deck,are_in_game:[],coordinate:[]};
	return board;
}
function initialize_board(board:Board,deck :D.deck,size:number):Board{
	
	if(size===0)
		return board;
	else{
		let new_board:Board =initialize_board(initialize_neighbor(board,size-1),deck,size-1);
		return initialize_are_in_game(initialize_coord(new_board));
	}
}
function give_coordinate(board:Board,coord:T.Coord2D,id:number){
	let new_board:Board=board;
	if(coord.x!=undefined &&coord.y!=undefined ){
	new_board.coordinate[id]=coord;
	new_board.coordinate[id+1]={x:coord.x+1,y:coord.y};
	new_board.coordinate[id+2]={x:coord.x,y:coord.y+1};
	new_board.coordinate[id]={x:coord.x+1,y:coord.y+1};
	}
	return new_board;
}
function become_in_game(board:Board,id:number):Board{
	let new_board:Board=board;
	new_board.are_in_game[id:id+4]=true;
	return new_board;
}
function first_tile(board:Board):Board{
	let new_board:Board=board;



}

