'use strict';
const Sequelize = require('sequelize');
const db = require('../db');

const contactusModel = db.define('contactus', {
  name: { type: Sequelize.STRING, required: true },
  email: { type: Sequelize.STRING, required: true },
  message: { type: Sequelize.STRING },
userPhotourl: { type: Sequelize.STRING },


  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
     required: true
}
  // username:{type: DataTypes.STRING, required: true }
  
});

module.exports = contactusModel;
