import * as T from "./tile.js";
import * as D from "./deck.js";
import * as B from "./board.js";

const Reset = "\x1b[0m";
const boxSize = 9;
const Gray = "\x1b[48;5;236m";
const Orange = "\x1b[48;5;202m";
const Green = "\x1b[42m";
const Blue = "\x1b[44m";
const White = "\x1b[47m";
const grayBox = Gray + repeatChar(' ', boxSize) + Reset;
const orangeBox = Orange + repeatChar(' ', boxSize) + Reset;
const greenBox = Green + repeatChar(' ', boxSize) + Reset;
const blueBox = Blue + repeatChar(' ', boxSize) + Reset;
const whiteBox_horiz = White + repeatChar(' ', 5) + Reset;
const whiteBox_vert = White  + repeatChar(' ', 1) + Reset;
const greenBoxhalf = Green + repeatChar(' ', 4) + Reset;
const grayBoxhalf = Gray + repeatChar(' ', 4) + Reset;
const blueBoxhalf = Blue + repeatChar(' ', 4) + Reset;
const orangeBoxhalf = Orange + repeatChar(' ', 4) + Reset;
const tab_colors: Array<string> = [greenBox, grayBox, blueBox, orangeBox];
const tab_colors_half = [greenBoxhalf, grayBoxhalf, blueBoxhalf, orangeBoxhalf];
function repeatChar(char: string, times: number): string {
    let result = '';
    for (let i = 0; i < times; i++) {
        result += char;
    }
    return result;
}
function display_line(block: T.Block, i : number) {
    const color = block.color;
    const road = block.road;
    let blockContent = "";
    if (i === 0){
	if (road === T.Road.NORTH_SOUTH || road === T.Road.NORTH_EST || road === T.Road.NORTH_WEST){
    blockContent = tab_colors_half[color];
    blockContent += whiteBox_vert;
    blockContent += tab_colors_half[color];
	}
    else
	blockContent = tab_colors[color];
    }
    if (i === 1){
	if (road === T.Road.NORTH_SOUTH ){
    blockContent = tab_colors_half[color];
    blockContent += whiteBox_vert;
    blockContent += tab_colors_half[color];
	}
	else if (road === T.Road.NORTH_EST || road === T.Road.SOUTH_EST){
    blockContent = tab_colors_half[color];
    blockContent += whiteBox_horiz;
	}
	else if (road === T.Road.NORTH_WEST || road === T.Road.SOUTH_WEST){
    blockContent = whiteBox_horiz;	    
    blockContent += tab_colors_half[color];
	}
	else if (road === T.Road.WEST_EST)
    blockContent = White + repeatChar(' ', 9) + Reset;	    	    
	else {
    blockContent = tab_colors[color];
	}
    }
    if (i === 2){
	if (road === T.Road.NORTH_SOUTH || road === T.Road.SOUTH_EST || road === T.Road.SOUTH_WEST){
            blockContent = tab_colors_half[color];
            blockContent += whiteBox_vert;
            blockContent += tab_colors_half[color];
	}
    else
	blockContent = tab_colors[color];
    }
    return blockContent;
}
function display_board(board: B.Board) {
    let x1 = Infinity, y1 = Infinity;
    let x2 = -Infinity, y2 = -Infinity;
    // Find the boundaries of the board
    for (const key in board.board) {
        const [xStr, yStr] = key.split(',');
        const x = parseInt(xStr);
        const y = parseInt(yStr);
        y1 = Math.min(x, x1);
        x1 = Math.min(y, y1);
        y2 = Math.max(x, x2);
        x2 = Math.max(y, x2);
    }
    // Display each tile
    for (let y = y1; y <= y2; y += 1) {
        let line1 = '';
        let line2 = '';
        let line3 = '';
        for (let x = x1; x <= x2; x += 1) {
            const topLeftCoord = `${x},${y}`;
    if (Object.prototype.hasOwnProperty.call(board.board, topLeftCoord)) {
    const blockIndex = board.board[topLeftCoord];
    const tileIndex = Math.floor(blockIndex / 4);
    const blockIndexInTile = blockIndex % 4;
    const tile = board.deck.deck[tileIndex];
    const block = tile.blockList[blockIndexInTile];
    line1 += display_line(block, 0);
    line2 += display_line(block, 1);
    line3 += display_line(block, 2);
} else {
    line1 += repeatChar(' ', boxSize);
    line2 += repeatChar(' ', boxSize);
    line3 += repeatChar(' ', boxSize);
}

        }
        console.log(line1);
        console.log(line2);
        console.log(line3);
    }
}
const sampleDeck: D.deck = D.generate_deck(D.deck_empty(), 5);
const sampleBoard: B.Board = {
    board: {},
    size: 0,
    deck: sampleDeck
};

B.add_tile(sampleBoard, 0, { x: 0, y: 0 });
B.add_tile(sampleBoard, 1, { x: 1, y: 2 });
B.add_tile(sampleBoard, 2, { x: 0, y: 4 });
B.add_tile(sampleBoard, 3, { x: 2, y: 3 });
	
// Display the sample board
display_board(sampleBoard);
export {
    display_board
};
