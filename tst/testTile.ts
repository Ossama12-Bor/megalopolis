import * as T from "../src/tile.js";
import * as D from "../src/deck.js";

const aBlock1 : T.Block = T.CreateBlock(T.BlockColor.GREEN,T,T.Road.NO_ROAD);
const aBlock2 : T.Block = T.CreateBlock(T.BlockColor.GRAY,T.to2Dcoord(0,0),T.Road.NORTH_EST);
const aBlock3 : T.Block = T.CreateBlock(T.BlockColor.BLUE,T.to2Dcoord(0,0),T.Road.NORTH_EST);
const aBlock4 : T.Block = T.CreateBlock(T.BlockColor.ORANGE,T.to2Dcoord(0,0),T.Road.NORTH_EST);
const aBlockList : T.Block[] = [aBlock1,aBlock2,aBlock3,aBlock4];

const aTile : T.Tile = T.CreateTile(aBlockList);
T.DisplayTile(aTile,"BEFORE FLIP :");
//let aTileFlipped : T.Tile = T.flipTile(aTile);
//T.DisplayTile(aTileFlipped,"AFTER FLIP :");
const aDeck: D.deck = D.add_deck(D.add_deck(D.generate_deck(D.deck_empty(),1),aTile),aTile);
D.print_deck(aDeck,"****");