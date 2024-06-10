const axios = require('axios');

exports.getPokedex = async (req, res) => {
    try {
        const Pokedex = await import('pokedex-promise-v2');
        const P = new Pokedex.default();

        function pad(number, length) {
            return number.toString().padStart(length, '0');
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 30;
        const offset = (page - 1) * limit;
        const sort = req.query.sort || 'id-asc';
        const search = req.query.search || '';

        let pokemonArray = [];
        let totalEntries = 0;

        const allPokemon = await P.getPokemonFormsList();

        // Slice the allPokemon.results to contain only 1025 Pokemon forms
        let slicedPokemonForms = allPokemon.results.slice(0, 1025);


        if (search) {
            slicedPokemonForms = slicedPokemonForms.filter(pokemon => 
                pokemon.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Sorting, if required
        if (sort === 'id-asc') {
            slicedPokemonForms.sort((a, b) => {
                return a.url.split('/').slice(-2, -1)[0] - b.url.split('/').slice(-2, -1)[0];
            }); // Sort by ID (ascending)
        } else if (sort === 'id-desc') {
            slicedPokemonForms.sort((a, b) => {
                return b.url.split('/').slice(-2, -1)[0] - a.url.split('/').slice(-2, -1)[0];
            }); // Sort by ID (descending)
        } else if (sort === 'name-asc') {
            slicedPokemonForms.sort((a, b) => {
                return a.name.localeCompare(b.name); // Sort by name (ascending)
            });
        } else if (sort === 'name-desc') {
            slicedPokemonForms.sort((a, b) => {
                return b.name.localeCompare(a.name); // Sort by name (descending)
            });
        }

        const selectedPokemon = slicedPokemonForms.slice(offset, offset + limit);

        for (let i = 0; i < selectedPokemon.length; i++) {
            try {
                const pokemonDetails = await P.getPokemonByName(selectedPokemon[i].name);
                pokemonArray.push({
                    id: pokemonDetails.id,
                    name: pokemonDetails.name,
                    types: pokemonDetails.types.map(typeInfo => typeInfo.type.name),
                    image: pokemonDetails.sprites.front_default,
                });
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.log(`Pokemon not found: ${selectedPokemon[i].name}`);
                    continue;
                } else {
                    throw error;
                }
            }
        }

        totalEntries = slicedPokemonForms.length;

        res.status(200).json({
            totalEntries: totalEntries,
            totalPages: Math.ceil(totalEntries / limit),
            currentPage: page,
            pokemon: pokemonArray
        });
    } catch (error) {
        console.error('Error fetching Pokedex data:', error.message);
        return res.status(500).json({ message: 'Error fetching Pokedex data from PokeAPI', error: error.message });
    }
};

