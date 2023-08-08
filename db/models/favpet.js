'use strict';
const Sequelize = require('sequelize');
const db = require('../db');

const favPetModel = db.define('fav_pet', {
  name: { type: Sequelize.STRING, required: true },
  breed: { type: Sequelize.STRING, required: true },
  image_link: { type: Sequelize.STRING },
  petOwnerName: { type: Sequelize.STRING ,required: true},
  petOwnerEmail: { type: Sequelize.STRING,required: true},
  userPhone: { type: Sequelize.STRING,required: true },
  description: { type: Sequelize.STRING },
  petType: { type: Sequelize.ENUM('cat','dog'),
   required: true, Sequelize: 'cat'},
   petOwnerId: { type: Sequelize.STRING ,required: true},

   gender: { type: Sequelize.ENUM('male','female'),
   required: true, defaultValue: 'female'},

  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
     required: true
}
  // username:{type: DataTypes.STRING, required: true }
  
});

module.exports = favPetModel;
