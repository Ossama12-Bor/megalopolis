import * as B from "../src/board";
import * as D from "../src/deck";
import * as T from "../src/tile";


describe('General graph test suite',() =>{
    test('empty board',() => {
		const board:B.Board={board:{},size:0,deck:D.generate_deck(D.deck_empty(),5)};
		expect(board.size).toBe(0);
		const coord1:T.Coord2D={x:0,y:0};
        const coord2:T.Coord2D={x:1,y:0};
		B.add_tile(board,1,coord1);
		expect(board.size).toBe(1);
		B.add_tile(board,2,coord2);
		expect(board.size).toBe(2);
    });
});
