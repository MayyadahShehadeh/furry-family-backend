const router = require("express").Router();
const { User } = require("../../db/models");
const jwt = require("jsonwebtoken");
const onlineUsers = require('../../onlineUsers');
const sockets = require('../../socketConnection');
const bearer = require('../../middleware/bearer')
const permissions = require('../../middleware/acl')

// localhost:3001/auth/register
router.post("/register", async (req, res, next) => {
  try {
    // expects {username, email, password} in req.body
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: "Username, password, and email required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const user = await User.create(req.body);

    const token = jwt.sign(
      { id: user.dataValues.id },
      process.env.SESSION_SECRET,
      { expiresIn: 86400 }
    );
    res.json({
      ...user.dataValues,
      token,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(401).json({ error: "User already exists" });
    } else if (error.name === "SequelizeValidationError") {
      return res.status(401).json({ error: "Validation error" });
    } else next(error);
  }
});
// localhost:3001/auth/login
router.post("/login", async (req, res, next) => {
  try {
    // expects username and password in req.body
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Username and password required" });

    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      console.log({ error: `No user found for username: ${username}` });
      res.status(401).json({ error: "Wrong username and/or password" });
    } else if (!user.correctPassword(password)) {
      console.log({ error: "Wrong username and/or password" });
      res.status(401).json({ error: "Wrong username and/or password" });
    } else {
      const token = jwt.sign(
        { id: user.dataValues.id },
        process.env.SESSION_SECRET,
        { expiresIn: 86400 }
      );
      res.json({
        ...user.dataValues,
        token,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/logout", (req, res, next) => {
  const { id } = req.user;
  delete onlineUsers[id];
  sockets[0].broadcast.emit('remove-offline-user', id);
  
  res.sendStatus(204);
});

router.get("/user", (req, res, next) => {
  if (req.user) {
    return res.json(req.user);
  } else {
    return res.json({});
  }
});
router.get('/users' , async (req, res, next) => {
  const userRecords = await User.findAll({});
  // const list = userRecords.map(user => user.username);
  res.status(200).json(userRecords);
});

router.delete('/users/:id', async (req, res, next) => {
  let id = req.params.id;
  const userRecords = await User.findOne({where:{id}});
  const deleteUser = await userRecords.destroy();
  // const list = userRecords.map(user => user.username);
  res.status(200).json(deleteUser);
});

router.put('/users/:id', async (req, res, next) => {
  let id = req.params.id;
  const obj = req.body;
  const userRecords = await User.findOne({where:{id}})
  .then(record => record.update(obj));
  console.log("user record",userRecords);
  // let updatedRecord = await req.model.update(id, obj)
  res.status(200).json(userRecords);
  // const list = userRecords.map(user => user.username);
});
router.get('/secret', bearer, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area');
});
module.exports = router;
