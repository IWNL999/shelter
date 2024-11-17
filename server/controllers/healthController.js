const {Health_card} = require('../models/models');

class HealthController {
    async create(req, res){
        try{
            const {name} = req.body;
            if (Array.isArray(name)){
                const healthItems = await Health_card.bulkCreate(
                    name.map(item => ({ name: item }))
                );
                return res.json(healthItems);
            } 

            const health = await Health_card.create({ name });
            return res.json(health)     
        } catch(error){
            console.log(error)
            return res.status(500).json({ message: "Ошибка при добавлении здоровья" })
        }
    }
}

module.exports = new HealthController