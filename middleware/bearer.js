'use strict';
const { promisify } = require('util');
const { User } = require('../db/models');
const jwt = require('jsonwebtoken');
// const SECRET = process.env.SECRET
module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { _authError() }

    const token = req.headers.authorization.split(' ').pop();

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.SESSION_SECRET
    )
    const user = await User.findOne({
      where: { id: decoded.id },
    })
    console.log('user', user);

    if (!user) return next(new Error('Not authorized!'));
    req.user = user.dataValues;
    req.token = token;
    console.log('req.user', req.user);
    console.log('req..token', req.token);

    next();
    // const user = this.findOne({where: { username: parsedToken.username } });
    // const validUser = await user.authenticateToken(token);
    // req.user = validUser;
    // req.token = validUser.token;
    // next();

  } catch (e) {
    _authError();
  }

  function _authError() {
    next('Invalid Login');
  }
}
