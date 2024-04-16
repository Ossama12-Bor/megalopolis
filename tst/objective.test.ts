import * as B from "../src/board";
import * as D from "../src/deck";
import * as T from "../src/tile";
import * as G from "../src/graph";
import * as OBJ from "../src/objective";

describe("Objectives' test suite ",() =>{
    test("test main functions",() =>{
	// just an example
	let obj : OBJ.Objective = OBJ.CreateObj(3,(board : B.Board) => {return 10;});
	let board : B.Board = 
	expect(OBJ.getObjScore(obj)).toBe(3);
	 expect(OBJ.boardObjScore(board,obj)).tobe(10);
    });
});
