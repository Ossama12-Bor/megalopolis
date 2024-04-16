import * as B from "../src/board";
import * as D from "../src/deck";
import * as T from "../src/tile";

const board:B.Board={board:{},size:0,deck:D.generate_deck(D.deck_empty(),5)};

console.log(D.print_deck(board.deck,"**"));
const coord1:T.Coord2D={x:0,y:0};
const coord2:T.Coord2D={x:1,y:0};
B.add_tile(board,1,coord1);
console.log(board);
B.add_tile(board,2,coord2);
console.log(board);
