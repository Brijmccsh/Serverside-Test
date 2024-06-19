const { DataTypes} =require('sequilize');
const sequilize = require('../config/database');

const User = sequilize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
        timestamp: false,

    
});

module.exports = User;