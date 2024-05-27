const jwt = require('jsonwebtoken');
const User = require('../app/models/User');
const { mongooseToObject } = require('../util/mongoose');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/auth/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/auth/login');
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        const objectUser = user.toObject();
        res.locals.user = objectUser;
        if(objectUser.admin){
          res.locals.admin = objectUser.admin;
        }else{
          res.locals.admin = null;
        }
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };