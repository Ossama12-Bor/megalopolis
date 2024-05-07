import * as T from "./tile.js";

type deck = {
	deck : T.Tile[];
	size : number;
};
/*create an empty deck*/
function deck_empty():deck
{
	const Deck:deck={deck:[],size:0};
	return Deck;
}
/*create deck using Tiles array and size given as parameters*/
function create_deck(tile :T.Tile[],size :number):deck
{
	const Deck:deck={deck:tile,size:size};
	return Deck;
}
/*add a tile to deck */
function add_deck(Deck:deck,tile:T.Tile):deck
{
	const new_tiles :T.Tile[] = Deck.deck.concat(tile);
	return create_deck(new_tiles,Deck.size+1);
}
/*this function takes deck(always an empty deck (added to avoid edge effects)) and a number that represents the size*/
function generate_deck(Deck :deck ,n : number):deck
{
	if(n===0){
		return Deck;
	}
	else{
		return generate_deck(add_deck(Deck,T.generateTile()),n-1);
	}
}
/*pick a tile from deck*/

/*print deck(used to debug )*/
function print_deck(Deck:deck,prefix:string){
	console.log(`${prefix}`);
    console.log("deck size is:\n",Deck.size);
	for(let i=0;i<Deck.size;i++){
		T.DisplayTile(Deck.deck[i]);
	}
}

export {generate_deck,deck_empty,deck,create_deck,add_deck,print_deck};
