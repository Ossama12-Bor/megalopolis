import * as T from "../src/tile.js"

let aBlock1 : T.Block = T.CreateBlock(T.BlockColor.GREEN,T.to2Dcoord(0,0),[T.Direction.N,T.Direction.S]);
let aBlock2 : T.Block = T.CreateBlock(T.BlockColor.GRAY,T.to2Dcoord(1,0),[T.Direction.N,T.Direction.S]);
let aBlock3 : T.Block = T.CreateBlock(T.BlockColor.BLUE,T.to2Dcoord(0,1),[T.Direction.N,T.Direction.S]);
let aBlock4 : T.Block = T.CreateBlock(T.BlockColor.ORANGE,T.to2Dcoord(1,1),[T.Direction.N,T.Direction.S]);

let aBlockList : T.Block[] = [aBlock1,aBlock2,aBlock3,aBlock4];

let aTile : T.Tile = T.CreateTile(aBlockList);
T.DisplayTile(aTile,"BEFORE FLIP :");
let aTileFlipped : T.Tile = T.flipTile(aTile);
T.DisplayTile(aTileFlipped,"AFTER FLIP :");
