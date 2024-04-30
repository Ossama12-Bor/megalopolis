import * as B from "../src/board";
import * as D from "../src/deck";
import * as T from "../src/tile";

describe('General board test suite',() =>{
    test('empty board',() => {
		const board:B.Board={board:{},size:0,deck:D.generate_deck(D.deck_empty(),5)};
		expect(board.size).toBe(0);
		const coord1:T.Coord2D={x:0,y:0};
        const coord2:T.Coord2D={x:1,y:0};
		B.add_tile(board,1,coord1);
		expect(board.size).toBe(1);
		/*B.add_tile(board,2,coord2);
		expect(board.size).toBe(2);*/
		const coord3:T.Coord2D={x:2,y:0};
		//expect(B.is_available_coord(board,coord3)).toBe(true);
		const coord4:T.Coord2D={x:1,y:-2};
		//expect(B.is_available_coord(board,coord4)).toBe(true);
		const coord5:T.Coord2D={x:3,y:0};
		expect(B.is_available_coord(board,coord5)).toBe(false);
		const coord6:T.Coord2D={x:2,y:2};
		//expect(B.is_available_coord(board,coord6)).toBe(false);
    });
});
