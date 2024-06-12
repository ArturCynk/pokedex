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
                    image: pokemonDetails.sprites.other['official-artwork'].front_default,
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

exports.getPokemon = async (req, res) => {
    try {
        const Pokedex = await import('pokedex-promise-v2');
        const P = new Pokedex.default();
        
        const pokemonName = req.params.name;
        const pokemon = await P.getPokemonSpeciesByName(pokemonName);
        const pokemonDetails = await P.getPokemonByName(pokemonName);
        const cleanPart = pokemon.evolution_chain.url.split('/')[6];
        const evolution = await P.getEvolutionChainById(cleanPart);

        // Zainicjuj zmienną, aby przechować ewolucje
        let evolutions = [];

        // Pierwsza ewolucja
        const first = await P.getPokemonByName(evolution.chain.species.name);
        evolutions.push({
            name: first.name,
            img: first.sprites.other['official-artwork'].front_default,
            types: first.types.map(typeInfo => typeInfo.type.name),
        });

        // Jeśli istnieje druga ewolucja
        if (evolution.chain.evolves_to.length > 0) {
            const second = await P.getPokemonByName(evolution.chain.evolves_to[0].species.name);
            evolutions.push({
                name: second.name,
                img: second.sprites.other['official-artwork'].front_default,
                types: second.types.map(typeInfo => typeInfo.type.name),
            });

            // Jeśli istnieje trzecia ewolucja
            if (evolution.chain.evolves_to[0].evolves_to.length > 0) {
                const third = await P.getPokemonByName(evolution.chain.evolves_to[0].evolves_to[0].species.name);
                evolutions.push({
                    name: third.name,
                    img: third.sprites.other['official-artwork'].front_default,
                    types: third.types.map(typeInfo => typeInfo.type.name),
                });
            }
        }

        // Pozostała część kodu bez zmian
        let a = await P.getAbilityByName(pokemonDetails.abilities[0].ability.name);
        a.flavor_text_entries[0];
        const abilites = {
            name : pokemonDetails.abilities[0].ability.name,
            text : a.flavor_text_entries.filter(e => e.language.name == 'en' && e.version_group.name == 'scarlet-violet')[0].flavor_text
        }

        // Extracting stats
        const stats = pokemonDetails.stats.map(stat => ({
            name: stat.stat.name,
            base_stat: stat.base_stat
        }));

        
        res.status(200).json({
            variantes: pokemon.varieties,
            habitat: pokemon.habitat,
            generation: pokemon.generation,
            id: pokemon.id,
            name: pokemon.name,
            egg: pokemon.egg_groups,
            tekst: pokemon.flavor_text_entries[0],
            types: pokemonDetails.types.map(typeInfo => typeInfo.type.name),
            image: pokemonDetails.sprites.other['official-artwork'].front_default,
            imagesShiny: pokemonDetails.sprites.other['official-artwork'].front_shiny,
            evolutions: evolutions,
            stats: stats,
            weight: pokemonDetails.weight,
            height: pokemonDetails.height,
            abilities: abilites
        });
    
    } catch (error) {
        console.error('Error fetching Pokémon data:', error.message);
        return res.status(500).json({ message: 'Error fetching Pokémon data', error: error.message });
    }
};