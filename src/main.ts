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
