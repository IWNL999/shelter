const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
})

const Player = sequelize.define('player', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id: {type: DataTypes.INTEGER, unique: true},
    player_stats_id: {type: DataTypes.INTEGER, unique: true},
    room_id: {type: DataTypes.INTEGER, unique: true},
})

const Player_stats = sequelize.define('player_stats', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    health: {type: DataTypes.STRING},
    age: {type: DataTypes.INTEGER},
    fertile: {type: DataTypes.BOOLEAN},
    gender: {type: DataTypes.STRING},
    profession: {type: DataTypes.STRING},
    hobby: {type: DataTypes.STRING},
    fact1: {type: DataTypes.STRING},
    fact2: {type: DataTypes.STRING},
    fobia: {type: DataTypes.STRING},
    baggage: {type: DataTypes.STRING},
})

const Gender_card = sequelize.define('gender_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
})

const Age_card = sequelize.define('age_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.INTEGER, defaultValue: 0}
})

const Fertile_card = sequelize.define('fertile_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.BOOLEAN, defaultValue: true}
})

const Fobia_card = sequelize.define('fobia_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
})

const Fact1_card = sequelize.define('fact1_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
})

const Fact2_card = sequelize.define('fact2_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
})

const Baggage_card = sequelize.define('baggage_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
})

const Hobby_card = sequelize.define('hobby_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    experience: {type: DataTypes.STRING, defaultValue: "0 лет"}
})

const Profession_card = sequelize.define('profession_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    experience: {type: DataTypes.STRING, defaultValue: "0 лет"}
})

const Health_card = sequelize.define('health_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    value: {type: DataTypes.STRING, defaultValue: "Идеально здоров"}
})



const Player_room = sequelize.define('player_room', {
    player_id: { type: DataTypes.INTEGER, primaryKey: true },
    room_id: { type: DataTypes.INTEGER, primaryKey: true },
    is_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
});



const Room = sequelize.define('room', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.STRING, unique: true },
});

const Shelter_card = sequelize.define('shelter_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    danger: {type: DataTypes.STRING},
    places: {type: DataTypes.INTEGER, defaultValue: 5},
    shelter_type: {type: DataTypes.STRING},
    circumstances: {type: DataTypes.STRING},
    benefits: {type: DataTypes.STRING},
})

const Danger_card = sequelize.define('danger_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    text: {type: DataTypes.STRING}
})

const Shelter_type_card = sequelize.define('shelter_type_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    text: {type: DataTypes.STRING}
})

const Circumstances_card = sequelize.define('circumstances_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    text: {type: DataTypes.STRING}
})

const Benefits_card = sequelize.define('benefits_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    text: {type: DataTypes.STRING}
})



User.hasOne(Player)
Player.belongsTo(User)

Player.hasOne(Player_stats)
Player_stats.belongsTo(Player)

Player_stats.hasMany(Gender_card)
Gender_card.belongsTo(Player_stats)

Player_stats.hasOne(Age_card)
Age_card.belongsTo(Player_stats)

Player_stats.hasMany(Health_card)
Health_card.belongsTo(Player_stats)

Player_stats.hasOne(Fertile_card)
Fertile_card.belongsTo(Player_stats)

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
    Gender_card,
    Age_card,
    Health_card,
    Fertile_card,
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
    Benefits_card
}