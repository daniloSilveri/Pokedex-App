
const pokeApi = {};

/* <-----GETTING POKEMON INFORMATION THROUGH OUR CLASS-----> */
async function convertPokeApiDetailToPokemon (pokeDetail) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${pokeDetail.id}/`
    const species = await fetch (url)
    .then((reponse) => reponse.json())
    .then((responseText) => responseText)
    .catch((error) => console.log(error));
    
    const pokemon = new Pokemon ();
        pokemon.pokedexId = pokeDetail.id;
        pokemon.name = pokeDetail.name;
        const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
        const [type] = types;
        pokemon.types = types;
        pokemon.type = type;
        pokemon.description = species.flavor_text_entries[10].flavor_text;
        pokemon.ability = pokeDetail.abilities[0].ability.name;
        pokemon.stats = pokeDetail.stats.map((stat) => stat.base_stat);
        pokemon.height = pokeDetail.height;
        pokemon.weight = pokeDetail.weight;
        pokemon.habitat = species.habitat.name;

    return pokemon
};

/* <-----PROPERTY OF THE pokeApi OBJECT THAT CONTAINS THE POKEMON DETAILS CALL-----> */
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon);
};

/* <-----PROPERTY OF THE pokeApi OBJECT THAT CONTAINS THE POKEMON CALL-----> */
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