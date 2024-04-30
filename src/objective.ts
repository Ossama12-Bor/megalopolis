/* Objective module */
import * as B from "./board.js"
import * as G from "./graph.js"

type Objective = {
    score : number,
    scoreFunction : (board : B.Board) => number;
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

/* Calculates the objoctives total score (required to win)*/
function ObjTotalScore(objList : Objective[]) : number {
    let totalScore : number = 0;
    objList.forEach((obj) => {totalScore += getObjScore(obj);});
    return totalScore;
}

/* Creates an objective ,given the score and score function */
function CreateObj(aScore : number, aScoreFunction : (board : B.Board) => number){
    let obj : Objective = {
	score : aScore,
	scoreFunction : aScoreFunction
    };
    return obj;
}

function initializeObjectives() : Objective[]
{
    const nObj : number = objList.length;
    const objListGame = [];
    // let chosen = {};
    let r : number;
    for(let i = 0;i<5;i++){
	r = (Math.random() * 1000) % nObj;
	objListGame.push(objList[r]);
	// ! r can be repeated -> to be fixed after
    }
    return objListGame;
}

//************LIST OF OUR OBJECTIVES************//
//**********************************************//

/* Representation of "reduire la circulation" objective */
// Score Function 
/*const ReduceCirculation_scoreFunction : (board : B.Board) => number = (board) =>
    {
	const CCs = G.getConnectedComponents<number>(B.constructRoadGraph(board));
	return -CCs.length;
    };*/

//const ReduceCirculation_obj : Objective = CreateObj(0,ReduceCirculation_scoreFunction);

/* Representation of "arrondissements" objective */
// Score Function
// const Groupings_scoreFunction : (board : B.Board) => number = (board) =>
//     {
// 	const
//     }

// just a simple function
const aDummy_scoreFunction : (board : B.Board) => number = (board) =>
    {
	return 15;
    };

const aDummy_obj : Objective = CreateObj(15, aDummy_scoreFunction);


/* Constructing our list of objectives */

objList.push(aDummy_obj);
//objList.push(ReduceCirculation_obj);
//objList.push(ReduceCirculation_obj);



export{
    Objective,
    CreateObj,
    objList,
    boardObjScore,
    getObjScore,
    ObjTotalScore,
    initializeObjectives,
}




