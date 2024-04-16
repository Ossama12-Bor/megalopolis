import * as T from "./tile";
import * as D from "./deck";

const NUM_NEIGHBORS:number=4; 
type Board={
	board:{[key:string]:number},
	size:number,
	deck:D.deck //it represents the reverse of game deck
}

function coordToString(coord: T.Coord2D): string {
    return `${coord.x},${coord.y}`;
}

function StringToCoord(chaine:string):T.Coord2D{
	const i:number=chaine.indexOf(",");
	const coord:T.Coord2D ={x:+chaine.substring(0,i),y:+chaine.substring(i+1)};
	return coord;
}



function who_is_in_coord(board:Board,coord:T.Coord2D):number{
	return board.board[coordToString(coord)];
}

function is_available_coord(board:Board,coord:T.Coord2D):boolean{
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


function add_tile(board:Board,tile_id:number,coord:T.Coord2D){
	const new_coord1:T.Coord2D={x:coord.x,y:coord.y};
	const new_coord2:T.Coord2D={x:coord.x+1,y:coord.y};
	const new_coord3:T.Coord2D={x:coord.x,y:coord.y+1};
	const new_coord4:T.Coord2D={x:coord.x+1,y:coord.y+1};
	board.board[coordToString(new_coord1)]=tile_id*NUM_NEIGHBORS;
	board.board[coordToString(new_coord2)]=tile_id*NUM_NEIGHBORS+1;
	board.board[coordToString(new_coord3)]=tile_id*NUM_NEIGHBORS+2;
	board.board[coordToString(new_coord4)]=tile_id*NUM_NEIGHBORS+3;
	board.size+=1;
}

function print_board(board:Board){
	console.log(board.board);
	console.log(board.size);
	console.log(D.print_deck(board.deck,"***"));
}

export {
	NUM_NEIGHBORS,
	add_tile,
	Board,
	coordToString,
	StringToCoord,
	who_is_in_coord,
	print_board,
	is_available_coord
};

