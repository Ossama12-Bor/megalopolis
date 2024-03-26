import * as T from "./Tile.ts"
type deck{
	deck : T.tile[];
	size : number;
};
function deck_empty():deck
{
	let Deck:deck;
	Deck.deck={};
	Deck.size=0;
	return Deck;
}
function create_deck(tile :Tile[],size :number):deck
{
	let Deck={tile,size};
	return Deck;
}
function add_deck(Deck:deck,tile:T.tile):deck
{
	let new_tiles=  Deck.deck.concat(tile);
	return create_deck(new_tiles,Deck.size+1);
}

function generate_deck(Deck :deck ,n : number) : deck
{
	if(n===0){
		return Deck;
	}
	else{
		generate_deck(add_deck(Deck,generate_tile()),n-1);
	}
}
function pick_tile(Deck : deck): deck 
{
	Deck.size-=1;
	return Deck.deck[Deck.size];
}


