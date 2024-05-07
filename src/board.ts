
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
	empty:{}
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
// function constructRoadGraph(board : Board) : G.graph<number>{
//     const b : {[key:string]:number} = getBoard(board);
//     let g : G.graph<number> = G.cons_empty_graph();
//     let c : T.Coord2D;
//     /*
//     Object.values(b).forEach(id => {
// 	g = G.add_node(g, id);
//     });
//     Object.keys(b).forEach(coord => {

// 	c = StringToCoord(coord);
// 	let id : number = b[c];
// 	let x = c.x;
// 	let y = c.y;
// 	// (x+1,y)(x-1,y)(x,y+1)(x,y-1)
// 	const neighbors = [[x+1,y], [x-1,y], [x,y+1], [x,y-1]];
// 	neighbors.forEach((n)=>{
// 	    let cStr =  coordToString(T.to2Dcoord(n[0],n[1]));
// 	    if(b[cStr] !== undefined)
// 		g = G.add_edge(g,b[cStr],id);
// 	});//to2Dcoord
	
//     });
//     */
//     Object.entries(b).forEach(([coord,id]) => {
// 	g = G.add_node(g,id);
//     });
    
//     Object.entries(b).forEach(([coord,id])=> {
// 	const x = StringToCoord(coord).x;
// 	const y = StringToCoord(coord).y;
// 	const neighbors = [[x+1,y], [x-1,y], [x,y+1], [x,y-1]];
// 	neighbors.forEach((n)=>{
// 	    const cStr =  coordToString(T.to2Dcoord(n[0],n[1]));
// 	    if(b[cStr] !== undefined)
// 		g = G.add_edge(g,b[cStr],id);
// 	});
//     });
    
//     return g;
// }

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
	blockInPosition
};

