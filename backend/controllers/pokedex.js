const axios = require('axios');

exports.getPokedex = async (req, res) => {
    try {
        const pokedexResponse = await axios.get('https://pokeapi.co/api/v2/pokedex/1');
        const pokedexData = pokedexResponse.data.pokemon_entries;
        let pokemonArray = [];

        // Limit iteracji do 30
        const limit = 30;
        const iterations = Math.min(pokedexData.length, limit);

        for (let i = 0; i < iterations; i++) {
            let entry = pokedexData[i];
            try {
                let responsePokemonApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${entry.entry_number}`);
                let responsePokemon = responsePokemonApi.data;

                let pokemonData = {
                    id: responsePokemon.id,
                    name: responsePokemon.name,
                    types: responsePokemon.types.map(typeInfo => typeInfo.type.name),
                    image: `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${pad(entry.entry_number, 3)}.png` // Zmieniona końcówka URL
                };

                pokemonArray.push(pokemonData);
            } catch (error) {
                console.error(`Error fetching data for Pokemon entry number ${entry.entry_number}: ${error.message}`);
            }
        }

        console.log(pokemonArray);
        res.status(200).json(pokemonArray);
    } catch (error) {
        console.error('Error fetching Pokedex data:', error.message);
        res.status(500).json({ message: 'Error fetching Pokedex data from PokeAPI', error: error.message });
    }
};

// Funkcja do dopełniania liczby zerami z przodu
function pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}
