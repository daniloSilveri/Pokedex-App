
const pokemonList = document.getElementById('pokemonList');

function convertPokemonToLi (pokemon) {
    let pokeId;
    
    if (pokemon.pokedexId < 10) {
        pokeId = `00${pokemon.pokedexId}`
    } else if (pokemon.pokedexId >= 10 && pokemon.pokedexId < 100) {
        pokeId = `0${pokemon.pokedexId}`
    } else {
        pokeId = pokemon.pokedexId
    }

    return `
            <li class="pokemon ${pokemon.type}">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedexId}.png" alt="${pokemon.name}"> 
                <div class="pokemon-detail">
                    <span class="pokemon-name">${pokemon.name}</span>
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
                <div class="pokemon-id">
                    <img src="./assets/img/Poke Ball Mini.svg" alt="PokeBall mini">
                    <span>${pokeId}</span>
                </div>
            </li>
        `;
};

pokeApi.getPokemons()
    .then((pokemons) => {pokemonList.innerHTML += pokemons.map((pokemons) => convertPokemonToLi(pokemons)).join('');})
    .catch((error) => console.error(error))
    .finally(() => console.log("Requisição finalizada!"))
