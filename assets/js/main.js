
const pokemonList = document.getElementById('pokemonList');

function convertPokemonToLi (pokemon) {
    function formatIdPokedex () {
        let pokeId;
    
        if (pokemon.pokedexId < 10) {
            pokeId = `00${pokemon.pokedexId}`
        } else if (pokemon.pokedexId >= 10 && pokemon.pokedexId < 100) {
            pokeId = `0${pokemon.pokedexId}`
        } else {
            pokeId = pokemon.pokedexId
        }

        return pokeId
    };

    function formatWeight () {   
        const weight = `${(pokemon.weight / 10).toFixed(1)} kg`;
        return weight;
    };

    function formatHeight () {
        let height = pokemon.height;
            if (height < 10) {
                height = `0.${height} m`
            } else {
                height = `${(height / 10).toFixed(1)} m`
            }
        return height
    };

    return `
            <li class="pokemon">
                <div class="pokemon-base-info ${pokemon.type}">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedexId}.png" alt="${pokemon.name}"> 
                    <div class="pokemon-detail">
                        <span class="pokemon-name">${pokemon.name}</span>
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                    </div>
                    <div class="pokemon-id">
                        <img src="./assets/img/Poke Ball Mini.svg" alt="PokeBall mini">
                        <span>${formatIdPokedex()}</span>
                    </div>
                </div>
                <div class="card-pokemon">
                    <div class="card-pokemon-description">
                        <p>${pokemon.description}<p>
                    </div>
                    <div class="card-pokemon-info">
                        <p>Ability: <span>${pokemon.ability}</span></p>
                        <p>Habitat: <span>${pokemon.habitat}</span></p>
                        <p>Weight: <span>${formatWeight()}</span></p>
                        <p>Height: <span>${formatHeight()}</span></p>
                    </div>
                    <div class="card-pokemon-stats">
                        <p>HP: <span id="hp">${pokemon.stats[0]}/${pokemon.stats[0]}</span></p>
                        <p>Attack: <span>${pokemon.stats[1]}</span></p>
                        <p>Defense: <span>${pokemon.stats[2]}</span></p>
                        <p>Special Attack: <span>${pokemon.stats[3]}</span></p>
                        <p>Special Defense: <span>${pokemon.stats[4]}</span></p>
                        <p>Speed: <span>${pokemon.stats[5]}</span></p>
                    </div>
                </div>
            </li>
        `;
};

function gettingPokemons () {
    pokeApi.getPokemons()
    .then((pokemons) => {pokemonList.innerHTML += pokemons.map((pokemons) => convertPokemonToLi(pokemons)).join('');})
    .catch((error) => console.error(error));
};

gettingPokemons();