const { Baggage_card } = require('../models');

exports.createBaggage = async (req, res) => {
    try {
        const { name } = req.body;
        const newBaggage = await Baggage_card.create({ name });
        res.status(201).json(newBaggage);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при добавлении багажа' });
    }
};
