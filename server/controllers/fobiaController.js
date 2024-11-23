const { Fobia_card } = require('../models/models')

class FobiaController {
    async create(req, res) {
        try {
            const { name } = req.body;

            if (Array.isArray(name)) {
                const fobiaItems = await Fobia_card.bulkCreate(
                    name.map(item => ({ name: item}))
                );
                return res.json(fobiaItems)               
            }

            const fobia = await Fobia_card.create({ name });
            return res.json(fobia);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка при добавлении фобии"});
        }
    }
}

module.exports = new FobiaController();