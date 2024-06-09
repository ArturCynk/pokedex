const axios = require('axios');

exports.getPokedex = async (req, res) => {
    try {
        // Dynamiczny import Pokedex z ESM
        const Pokedex = await import('pokedex-promise-v2');
        const P = new Pokedex.default();

        function pad(number, length) {
            return number.toString().padStart(length, '0');
        }

        // Parse page and limit query parameters
        const page = parseInt(req.query.page) || 2;
        const limit = parseInt(req.query.limit) || 30;
        const offset = (page - 1) * limit;

        // Fetch Pokémon forms with pagination
        const results = await P.getPokemonFormsList({ offset, limit });
        const promises = results.results.map(pokemon => P.getPokemonByName(pokemon.name));
        const pokemonDetailsArray = await Promise.all(promises);

        // Prepare the Pokémon data
        const pokemonArray = pokemonDetailsArray.map(pokemonDetails => ({
            id: pokemonDetails.id,
            name: pokemonDetails.name,
            types: pokemonDetails.types.map(typeInfo => typeInfo.type.name),
            image: `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${pad(pokemonDetails.id, 3)}.png`
        }));

        // Return the paginated response with additional pagination info
        res.status(200).json({
            totalEntries: results.count,
            totalPages: Math.ceil(results.count / limit),
            currentPage: page,
            pokemon: pokemonArray
        });
    } catch (error) {
        console.error('Error fetching Pokedex data:', error.message);
        res.status(500).json({ message: 'Error fetching Pokedex data from PokeAPI', error: error.message });
    }
};
