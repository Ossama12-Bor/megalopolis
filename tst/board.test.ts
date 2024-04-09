import * as B from "../src/board.js";
import * as D from "../src/deck.js";


const our_deck:D.deck =D.generate_deck(D.deck_empty(),10);

const our_board:B.Board=B.initialize_board(B.empty_Board(our_deck),our_deck,our_deck.size*B.NUM_NEIGHBORS);


console.log(our_deck);
console.log(our_board);