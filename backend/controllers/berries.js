const axios = require('axios');

exports.getBerrys = async (req, res) => {
    try {
        const Pokedex = await import('pokedex-promise-v2');
        const P = new Pokedex.default();

        let berrys = await P.getBerriesList();

        let berryPromises = berrys.results.map(async (result) => {
            let berry = await P.getBerryByName(result.name);
            berry.item = await P.getItemByName(berry.item.name);
            return berry.item;
        });

        let berries = await Promise.all(berryPromises);

        let formattedBerries = berries.map((berry) => {
            return {
                name: berry.name,
                image: berry.sprites.default,
                category: berry.category.name,
                effectBattle: berry.effect_entries[0].short_effect.slice(15)
            };
        });

        res.status(200).json({
            berries: formattedBerries
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getBerry = async (req, res) => {
    try {
        const Pokedex = await import('pokedex-promise-v2');
        const P = new Pokedex.default();

        let name = req.params.name;
        let berryItem = await P.getItemByName(name);

        const cherryName = name.split('-')[0];
        let berry = await P.getBerryByName(cherryName)
        
        //held_by_pokemon
        let helds = await Promise.all(berryItem.held_by_pokemon.map(async held => {
            const pokemon = await P.getPokemonByName(held.pokemon.name);
            return {
                pokemon: held.pokemon.name,
                image: pokemon.sprites.other['official-artwork'].front_default,
                types: pokemon.types.map(typeInfo => typeInfo.type.name)
            };
        }));

        res.status(200).json({
            category : berryItem.category.name,
            effect : berryItem.effect_entries[0].effect.slice(19),
            shortEffect : berryItem.effect_entries[0].short_effect.slice(15),
            name : berryItem.name,
            image : berryItem.sprites.default,
            flavor : berry.flavors.map((flavor) => flavor.flavor.name),
            held : helds,
            flavorText : berryItem.flavor_text_entries.filter(flavor => flavor.language.name == 'en')[0].text
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}