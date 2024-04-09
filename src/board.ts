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
	board:{[key:T.Coord2D]:neighbors_ids},
	size:number,
	deck:D.deck //it represents the reverse of game deck
}

function who_is_in_coord(board:Board,coord:T.Coord2D):neighbors_ids{
	return board.board[coord];
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

function 

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