import * as B from "../src/board";
import * as D from "../src/deck";
import * as T from "../src/tile";

describe('General board test suite',() =>{
    test('empty board',() => {
		const board:B.Board={board:{},tiles_played_num:0,deck:D.generate_deck(D.deck_empty(),5),empty:{}};
		expect(board.tiles_played_num).toBe(0);
		const coord1:T.Coord2D={x:0,y:0};
        const coord2:T.Coord2D={x:1,y:0};
		B.add_tile(board,1,coord1);
		expect(board.tiles_played_num).toBe(1);
		expect((Object.keys(board.empty)).length).toBe(21);
		//console.log(board.empty);
		B.add_tile(board,2,coord2);
		expect(board.tiles_played_num).toBe(2);
		expect((Object.keys(board.empty)).length).toBe(26);
		//console.log(B.blockInPosition(board,coord1));
		//console.log(board.deck.deck[1].blockList[0])
		//B.print_board(board);
		const new_board:B.Board=B.board_copy(board);
		board.tiles_played_num=0;
		board.board['0,0']=0;
		//B.print_board(board);
		//B.print_board(new_board);

	})
});