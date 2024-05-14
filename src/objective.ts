/* Objective module */
import * as B from "./board.js"
import * as G from "./graph.js"
import * as T from "./tile.js"

type Objective = {
    score : number,
    scoreFunction : (board : B.Board) => number,
    name : string,
};


/* global variable to store possible objectives to choose from */
let objList : Objective[] = [];

/* Initializes an objective list for the game*/
// function initialize_objectives(n : number){
//     let gameObjectives : objective[] = [];
//     /* adding the two mandatory objectibes */
// }

/* Function to calculate a score associated to a state
   of the board for a given objective */
function boardObjScore(board : B.Board, obj : Objective) : number{
    return obj.scoreFunction(board);
}

/* gets the score of an objective */
function getObjScore(obj : Objective) : number{
    return obj.score;
}

/* gets objective name */
function getObjName(obj : Objective) : string{
    return obj.name;
}

/* Calculates the objoctives total score (required to win)*/
function ObjTotalScore(objList : Objective[]) : number {
    let totalScore : number = 0;
    objList.forEach((obj) => {totalScore += getObjScore(obj);});
    return totalScore;
}

/* Creates an objective ,given the score and score function */
function CreateObj(aScore : number, aScoreFunction : (board : B.Board) => number, name : string){
    let obj : Objective = {
	score : aScore,
	scoreFunction : aScoreFunction,
	name : name,
    };
    return obj;
}

function initializeObjectives() : Objective[]
{
    const nObj : number = objList.length;
    let objListGame : Objective[] = [];
    let chosen = new Set();
    let r : number;
    const n_choice : number = 10;
    for(let i = 0;i < n_choice;i++){
	
	r = (Math.floor(Math.random() * 1000)) % nObj;
	if(!chosen.has(r)){
	    chosen.add(r);
	    objListGame.push(objList[r]);
	}
	// ! r can be repeated -> to be fixed after
    }
    return objListGame;
}
/* display of a list of objectives */
function displayObjectives(objList : Objective[], pref : string, suff : string){
    console.log(pref);
    objList.forEach(obj => {console.log(getObjName(obj));});
    console.log(suff);
}

//************LIST OF OUR OBJECTIVES************//
//**********************************************//

/* Representation of "reduire la circulation" objective */
//Score Function 
const ReduceCirculation_scoreFunction : (board : B.Board) => number = (board) =>
    {
	const CCs = G.getConnectedComponents<number>(B.constructRoadGraph(board));
	return -CCs.length;
    };

const ReduceCirculation_obj : Objective = CreateObj(0, ReduceCirculation_scoreFunction, "Reduce circulation");

/* green !*/
//Score Function
const GreenLife_scoreFunction : (board : B.Board) => number = (board) =>
    {
	let score : number = 0;
	const b : {[key:string]:number} = B.getBoard(board);
	Object.entries(b).forEach(([coordStr, id]) => {
	    const coord : T.Coord2D = B.StringToCoord(coordStr);
	    if(T.getBlockColor(B.blockInPosition(board, coord)) == T.BlockColor.GREEN)
		score += 1;
	    else if(T.getBlockColor(B.blockInPosition(board, coord)) == T.BlockColor.GRAY)
		score -= 3;
	});
	return score;
    };

const GreenLife_obj : Objective = CreateObj(3, GreenLife_scoreFunction, "Green Life");


/* Max groupings */
const MaxGrp_scoreFunction : (board : B.Board) => number = (board) =>
    {
	let score = 0;
	let CCsGREEN : number[][] = G.getConnectedComponents<number>(B.constructColorGraph(board, T.BlockColor.GREEN));
	
	let scoreGREEN = CCsGREEN.map((comp : number[]) => comp.length).reduce((acc, curr) => Math.max(acc, curr), 0);
	console.log("green score = ", scoreGREEN);
	let CCsGRAY : number[][] = G.getConnectedComponents<number>(B.constructColorGraph(board, T.BlockColor.GRAY));
	
	let scoreGRAY = CCsGRAY.map((comp : number[]) => comp.length).reduce((acc, curr) => Math.max(acc, curr), 0);
	console.log("gray score = ", scoreGRAY);
	
	let CCsBLUE : number[][] = G.getConnectedComponents<number>(B.constructColorGraph(board, T.BlockColor.BLUE));
	
	let scoreBLUE = CCsBLUE.map((comp : number[]) => comp.length).reduce((acc, curr) => Math.max(acc, curr), 0);
	console.log("blue score = ", scoreBLUE);
	
	let CCsORANGE : number[][] = G.getConnectedComponents<number>(B.constructColorGraph(board, T.BlockColor.ORANGE));
	
	let scoreORANGE = CCsORANGE.map((comp : number[]) => comp.length).reduce((acc, curr) => Math.max(acc, curr), 0);
	console.log("orange score = ", scoreORANGE);
	
	score = scoreGREEN + scoreORANGE + scoreBLUE + scoreGRAY;
	return score;
    };

const MaxGrp_obj : Objective = CreateObj(0, MaxGrp_scoreFunction, "max grouping");

/* Push and STACK */


const PushStack_scoreFunction : (board : B.Board) => number = (board) =>
    {
	let score : number = 0;
	const b : {[key:string]:number} = B.getBoard(board);
	Object.entries(b).forEach(([coord, id]) => {
	    if(T.getBlockColor(B.blockInPosition(board, B.StringToCoord(coord))) == T.BlockColor.GRAY){
		let verifier = 1;
		const x = B.StringToCoord(coord).x;
		const y = B.StringToCoord(coord).y;
		const neighbors = [[x+1,y], [x-1,y], [x,y+1], [x,y-1]];
		neighbors.forEach((n)=>{
		    const coord_neighbour : string =  B.coordToString(T.to2Dcoord(n[0],n[1]));
		if(b[coord_neighbour] !== undefined){		    
		    if(T.getBlockColor(B.blockInPosition(board, B.StringToCoord(coord_neighbour))) != T.BlockColor.GRAY && T.getBlockColor(B.blockInPosition(board, B.StringToCoord(coord_neighbour))) != T.BlockColor.BLUE){
			verifier = 0;
		    }
		}
		});
		if (verifier ==1) score += 2;
	    };
	});
	console.log("PushStack score = ", score);	
	return score;
    }

const PushStack_obj : Objective = CreateObj(0, PushStack_scoreFunction, "PushStack");

/* Constructing our list of objectives */

//objList.push(aDummy_obj);
objList.push(ReduceCirculation_obj);
objList.push(GreenLife_obj);
objList.push(MaxGrp_obj);
objList.push(PushStack_obj);





export{
    Objective,
    CreateObj,
    objList,
    boardObjScore,
    getObjScore,
    ObjTotalScore,
    initializeObjectives,
    displayObjectives,
    getObjName,
}




