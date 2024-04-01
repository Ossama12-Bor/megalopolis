import * as T from "./Tile.ts"
type Node = {
    street : T.Block
    
}

type Edge = {
    source : Node
    color_source : T.BlockColor
    road : boolean
    destination : Node
    color_destination : T.BlockColor

};

type Board = {
    Board : Node[]
    Edge : Edge[][]
}

