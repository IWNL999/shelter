const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const cron = require('node-cron');
const { Op } = require('sequelize');



const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Player = sequelize.define('player', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id: {type: DataTypes.INTEGER, unique: true, allowNull: false},
    player_stats_id: {type: DataTypes.INTEGER, unique: true},
    room_id: {type: DataTypes.INTEGER, unique: true},
})

const Player_stats = sequelize.define('player_stats', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    health: {type: DataTypes.STRING},
    severity: {type: DataTypes.STRING},
    age: {type: DataTypes.INTEGER},
    fertile: {type: DataTypes.BOOLEAN},
    gender: {type: DataTypes.STRING},
    profession: {type: DataTypes.STRING},
    hobby: {type: DataTypes.STRING},
    character: {type: DataTypes.STRING},
    fact1: {type: DataTypes.STRING},
    fact2: {type: DataTypes.STRING},
    fobia: {type: DataTypes.STRING},
    baggage: {type: DataTypes.STRING},
    activeCards: {type: DataTypes.STRING},
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
})

const Fobia_card = sequelize.define('fobia_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: false}
})

const Fact1_card = sequelize.define('fact1_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
})

const Fact2_card = sequelize.define('fact2_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
})

const Character_card = sequelize.define('character_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
})

const Baggage_card = sequelize.define('baggage_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false}
})

const Hobby_card = sequelize.define('hobby_card', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Profession_card = sequelize.define('profession_card', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Health_card = sequelize.define('health_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

const Active_card = sequelize.define('active_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    text: {type: DataTypes.STRING},
    usage: {type: DataTypes.STRING, allowNull: false, defaultValue: "Только на себя"}
})




const PlayerActiveCards = sequelize.define('player_active_cards', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    playerId: { type: DataTypes.INTEGER, allowNull: false },
    activeCardId: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: false });

const Player_room = sequelize.define('player_room', {
    player_id: { type: DataTypes.INTEGER, primaryKey: true },
    room_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    is_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const Game_session = sequelize.define('game_session', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    start_time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    end_time: { type: DataTypes.DATE },
});




const Room = sequelize.define('room', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Shelter_card = sequelize.define('shelter_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    danger: {type: DataTypes.STRING},
    places: {type: DataTypes.INTEGER, defaultValue: 5},
    shelter_type: {type: DataTypes.STRING},
    circumstances: {type: DataTypes.STRING},
    benefits: {type: DataTypes.STRING},
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
})

const Danger_card = sequelize.define('danger_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    text: {type: DataTypes.STRING}
})

const Shelter_type_card = sequelize.define('shelter_type_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    text: {type: DataTypes.STRING}
})

const Circumstances_card = sequelize.define('circumstances_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    text: {type: DataTypes.STRING}
})

const Benefits_card = sequelize.define('benefits_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    text: {type: DataTypes.STRING}
})







User.hasOne(Player)
Player.belongsTo(User)

Player.hasOne(Player_stats)
Player_stats.belongsTo(Player)

Player_stats.hasMany(Health_card)
Health_card.belongsTo(Player_stats)

Player_stats.hasMany(Hobby_card)
Hobby_card.belongsTo(Player_stats)

Player_stats.hasMany(Profession_card)
Profession_card.belongsTo(Player_stats)

Player_stats.hasOne(Fact1_card)
Fact1_card.belongsTo(Player_stats)

Player_stats.hasOne(Fact2_card)
Fact2_card.belongsTo(Player_stats)

Player_stats.hasMany(Baggage_card)
Baggage_card.belongsTo(Player_stats)

Player_stats.hasMany(Fobia_card)
Fobia_card.belongsTo(Player_stats)

Player_stats.hasOne(Character_card)
Character_card.belongsTo(Player_stats)

Player_stats.hasMany(PlayerActiveCards, { foreignKey: 'playerId', as: 'associatedCards' });
PlayerActiveCards.belongsTo(Active_card, { foreignKey: 'activeCardId', as: 'cardDetails' });



Room.belongsToMany(Player, { through: Player_room });
Player.belongsToMany(Room, { through: Player_room });



Room.hasOne(Shelter_card)
Shelter_card.belongsTo(Room)

Shelter_card.hasMany(Danger_card)
Danger_card.belongsTo(Shelter_card)

Shelter_card.hasMany(Shelter_type_card)
Shelter_type_card.belongsTo(Shelter_card)

Shelter_card.hasMany(Circumstances_card)
Circumstances_card.belongsTo(Shelter_card)

Shelter_card.hasMany(Benefits_card)
Benefits_card.belongsTo(Shelter_card)


module.exports = {
    User,
    Player,
    Player_stats,
    Player_room,
    Room,
    Health_card,
    Hobby_card,
    Profession_card,
    Fact1_card,
    Fact2_card,
    Fobia_card,
    Baggage_card,
    Shelter_card,
    Danger_card,
    Shelter_type_card,
    Circumstances_card,
    Benefits_card,
    Game_session,
    Character_card,
    Active_card,
}

// Добавляем очистку данных старше месяца
cron.schedule('0 0 * * *', async () => {
    try {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        // Удаляем старые временные карточки игроков
        await Player_temp_card.destroy({
            where: { createdAt: { [Op.lt]: oneMonthAgo } }
        });

        // Удаляем старые временные карточки бункера
        await Bunker_temp_card.destroy({
            where: { createdAt: { [Op.lt]: oneMonthAgo } }
        });

        console.log("Старые временные данные успешно удалены");
    } catch (error) {
        console.error("Ошибка при удалении старых данных:", error);
    }
});

(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('База данных синхронизирована!');
    } catch (error) {
        console.error('Ошибка при синхронизации базы данных:', error);
    }
})();
