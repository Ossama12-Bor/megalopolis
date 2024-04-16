import * as T from "./tile.js";
import * as D from "./deck.js";
import * as G from "./graph.js";

import { isReturnStatement, textChangeRangeIsUnchanged } from "typescript";

const NUM_NEIGHBORS:number=4;

type Board={
	board: {[key:string]:number},
	size: number,
	deck: D.deck //it represents the reverse of game deck
}

function coordToString(coord: T.Coord2D): string {
    return `${coord.x},${coord.y}`;
}

function StringToCoord(chaine:string):T.Coord2D{
	const i:number=chaine.indexOf(",");
	const coord:T.Coord2D ={x:+chaine.substring(0,i),y:+chaine.substring(i+1)};
	return coord;
}

function initializeBoard(d : D.deck){
    let b : Board = {
	board : {},
	size : 0,
	deck : D.deck_empty()
    }
}

function getBoard(board : Board) : {[key:string]:number} {
    return board.board;
}

function who_is_in_coord(board:Board,coord:T.Coord2D):number{
	return board.board[coordToString(coord)];
}

/*function is_coord_avail(board:Board,coord:T.Coord2D):boolean{

}*/

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
/*const board:Board={board:{},size:0,deck:D.generate_deck(D.deck_empty(),5)};

console.log(D.print_deck(board.deck,"**"));
const coord1:T.Coord2D={x:0,y:0};
const coord2:T.Coord2D={x:1,y:0};
add_tile(board,1,coord1);
console.log(board);
add_tile(board,2,coord2);
console.log(board);*/

/* construction of road graph , returns a graph*/
function constructRoadGraph(board : Board) : G.graph<number>{
    const b  = getBoard(board);
    let g : G.graph<number> = G.cons_empty_graph();
    let c : T.Coord2D;
    // for((_coord,id) in b)
    // 	g = G.add_node(g,id);
    // for((coord,_id) in b){

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
    // }
    Object.entries(b).forEach(([coord,id]) => {
	g = G.add_node(g,id);
    });
    Object.entries(b).forEach(([coord,id])=> {
	const x = StringToCoord(coord).x;
	const y = StringToCoord(coord).y;
	const neighbors = [[x+1,y], [x-1,y], [x,y+1], [x,y-1]];
	neighbors.forEach((n)=>{
	    const cStr =  coordToString(T.to2Dcoord(n[0],n[1]));
	    if(b[cStr] !== undefined)
		g = G.add_edge(g,b[cStr],id);
	});
    });
    return g;
}

// function constructGroupGraph(board : Board) : G.graph<number>{}

export {
	NUM_NEIGHBORS,
	add_tile,
	Board,
	coordToString,
	StringToCoord,
	who_is_in_coord,
    print_board,
    constructRoadGraph,
    getBoard,
    initializeBoard
};

