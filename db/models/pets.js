const Sequelize = require('sequelize');
const db = require('../db');

const petModel = db.define('pets', {
    name: { type: Sequelize.STRING, required: true },
    breed: { type: Sequelize.STRING, required: true },
    image_link: { type:Sequelize.STRING },
    petOwnerName: { type: Sequelize.STRING ,required: true},
    petOwnerEmail: { type: Sequelize.STRING,required: true},
    userPhone: { type: Sequelize.STRING,required: true },
    description: { type: Sequelize.STRING },
    petType: { type: Sequelize.ENUM('cat','dog'),
     required: true, defaultValue: 'cat'},

     gender: { type: Sequelize.ENUM('male','female'),
     required: true, defaultValue: 'female'},

     photoUrl: {
      type: Sequelize.STRING
    },
  
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
       required: true
  }
    // username:{type: DataTypes.STRING, required: true }
    
  });
  
  module.exports = petModel;
  