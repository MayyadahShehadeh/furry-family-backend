const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const petModel = require("./pets");
const Collection = require('./data-collection');
const favPetModel = require("./favpet");
const contactusModel = require("./contactus");

// associations

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });

Message.belongsTo(Conversation);
Conversation.hasMany(Message);

User.hasMany(petModel,{foreignKey:'userId',sourceKey:'id'});
petModel.belongsTo(User,{foreignKey:'userId',targetKey:'id'});

User.hasMany(favPetModel,{foreignKey:'userId',sourceKey:'id'});
favPetModel.belongsTo(User,{foreignKey:'userId',targetKey:'id'});

User.hasMany(contactusModel,{foreignKey:'userId',sourceKey:'id'});
contactusModel.belongsTo(User,{foreignKey:'userId',targetKey:'id'});

module.exports = {
  User,
  Conversation,
  Message,
  pets : new Collection(petModel),
  favpets:new Collection(favPetModel),
  contactus: new Collection(contactusModel)
};
