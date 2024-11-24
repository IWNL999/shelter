const { Profession_card } = require('../models/models');

class ProfessionController {
    async create(req, res) {
        try {
            const { name } = req.body;
            
            if (Array.isArray(name)) {
                const professionItems = await Profession_card.bulkCreate(
                    name.map(item => ({ name: item }))
                );
                return res.json(professionItems);
            }

            // Если name — не массив, добавляем один предмет
            const profession = await Profession_card.create({ name });
            return res.json(profession);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка при добавлении факта" });
        }
        
    }
}

module.exports = new ProfessionController();
