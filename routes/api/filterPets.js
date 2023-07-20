'use strict';

const express = require('express');
const dataModules = require('../../db/models');
const bearer = require('../../middleware/bearer');
const router = express.Router();
// const router2 = express.Router();
// const bearer = require('../src/middlewares/bearer');
// const permissions = require('../src/middlewares/acl');
// const {pets} = require('../models/index')
router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});


// localhost:3001/api/v2/pets
// router.get('/:model', handleGetAll);
// router.get('/:model/:id', handleGetOne);
// router2.get('/choosenpet', handleGet222);

// router.post('/:model', handleCreate);
// router.put('/:model/:id', handleUpdate);
// router.delete('/:model/:id', handleDelete);

// async function handleGetAll(req, res) {
//   let allRecords = await req.model.get();
//   res.status(200).json(allRecords);
// }
// api/v22/choosenpet=dogs
// async function handleGet222(req, res) {
//   const choosenPet = req.query.choosenPet;
//   console.log('choosenPet',choosenPet);
//   let theRecord = await pets.get2(choosenPet)
//   console.log('dataModules.pets', dataModules.pets);
//   res.status(200).json(theRecord);
// }
// async function handleGetOne(req, res) {
//   const id = req.params.id;
//   let theRecord = await req.model.get(id)
//   res.status(200).json(theRecord);
// }

// async function handleCreate(req, res) {
//   let obj = req.body;
//   let newRecord = await req.model.create(obj);
//   res.status(201).json(newRecord);
// }

// async function handleUpdate(req, res) {
//   const id = req.params.id;
//   const obj = req.body;
//   let updatedRecord = await req.model.update(id, obj)
//   res.status(200).json(updatedRecord);
// }

// async function handleDelete(req, res) {
//   let id = req.params.id;
//   let deletedRecord = await req.model.delete(id);
//   res.status(200).json(deletedRecord);
// }


module.exports = {router,router2};


