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
	deck:D.deck //it represents the reverse of game deck
}
function initialize_neighbor(board:Board,id:number){
	if(id%NUM_NEIGHBORS===0)
		board.board[id]={North:undefined,Est:id+1,South:id+2,West:undefined};
	else if(id%NUM_NEIGHBORS===1)
		board.board[id]={North:undefined,Est:undefined,South:id+2,West:id-1};
	else if(id%NUM_NEIGHBORS===2)
		board.board[id]={North:id-2,Est:id+1,South:undefined,West:undefined};
	else if(id%NUM_NEIGHBORS===3)
		board.board[id]={North:id-2,Est:undefined,South:undefined,West:id-1};
}
function empty_Board(deck:D.deck){
	let board:Board={board:[],size:0,deck:deck};
	return board;
}
function initialize_board(deck :D.deck):Board{
	
}
