
const pokeApi = {};

function convertPokeApiDetailToPokemon (pokeDetail) {
    const pokemon = new Pokemon ();
    pokemon.pokedexId = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    return pokemon
};

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 151) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then((response) => response.json())
    .then((reponseBody) => reponseBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((requestDetails) => Promise.all(requestDetails))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.log(error))
};