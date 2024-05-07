import * as B from "./board.js"
import * as O from "./objective.js"
import * as D from "./deck.js"
import * as E from "./display.js"


/* Here include what should be included */

/* pseudo code :

   board      = initializeBoard()
   objectives = initializeObjectives()
   objScore   = objectives.reduce((aTempScore, anObjective) => {
   return aTempScore + objectiveScore(anObjective);
      })
      deck       = initializeDeck()
      finalBoard = deck.reduce((aBoard, aCard) => {
      aPlace = findPosition(aBoard, aCard, objectives);
      aNewBoard = placeCard(aBoard, aCard, aPlace);
      return aNewBoard;
      })
      finalScore = objectives.reduce((aTempScore, anObjective) => {
      return aTempScore + computeObjectiveBoardScore(anObjective, finalBoard);
      })
      hasWon     = (finalScore >= objScore)

*/
function main() {
    let board : B.Board = B.initializeBoard();
    let objectives : O.Objective[] = O.initializeObjectives();
    let objectiveScore : number = O.ObjTotalScore(objectives);
    board.deck = D.generate_deck(board.deck ,15);
    for (let i = 0; i < 15; ++i){
	B.add_tile(board, i, B.StringToCoord(Object.keys(board.empty)[i]));
    }
    let final_score : number = objectives.reduce((acc, objective) => {
	return acc + O.boardObjScore(board, objective);
    },0);
    E.display_board(board);
    return (final_score >= objectiveScore);
}
main();
