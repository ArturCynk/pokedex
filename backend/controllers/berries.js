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


exports.getBerry = async (req,res) => {
    try {
        const Pokedex = await import('pokedex-promise-v2');
        const P = new Pokedex.default();

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}