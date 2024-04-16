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
    return objList.reduce((accScore,currObjective) =>{
	return accScore + getObjScore(currObjective);
    });
}


//************LIST OF OUR OBJECTIVES************//
//**********************************************//

/* Representation of "reduire la circulation" objective */
// Score Function 
const ReduceCirculation_scoreFunction : (board : B.Board) => number = (board) =>
    {
	const CCs = G.getConnectedComponents<number>(B.constructRoadGraph(board));
	return -CCs.length;
    }

const ReduceCirculation_obj : Objective = {
    score : 0,
    scoreFunction : ReduceCirculation_scoreFunction
}

/* Representation of "arrondissements" objective */
// Score Function
// const Groupings_scoreFunction : (board : B.Board) => number = (board) =>
//     {
// 	const

//     }



/* Constructing our list of objectives */
objList.push(ReduceCirculation_obj);



export{
    Objective,
    objList,
    boardObjScore,
    getObjScore,
    ObjTotalScore
}




