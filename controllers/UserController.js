const resource = require('../models/Resource');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class UserController {

  //get User
  static getUser(req, res, next) {
    User.find({
        _id: req.params.id
      })
      .populate('resource')
      .then((users) => {
        res.status(200).json({
          succes: true,
           data: {
            _id: user._id,
            username: user.username,
            townhallNames: user.townhallNames,
          }
        });
      })
      .catch(next);
  }


static patch(req, res, next){
  const {resourceID} = req.body
  User.findByIdAndUpdate(req.params.usersID, {
    $push:{
      resources:resourceID,
    }
  })
  .then((result) =>{
    res.status(201).json({success: true, data: result});
  })
  .catch(next)
}

  //create user
  static register(req, res, next) {
    const {
      username,
      email,
      password,
      townhallNames,
    } = req.body;
    const user = new User({
      username,
      email,
      password,
      townhallNames,
      date: Date.now()
    });
    user.save()
      .then((user) => {
        res.status(201).json({
          success: true,
          data: {
            _id: user._id,
            username: user.username,
            email: user.email,
          }
        });
      })
      .catch(next);
  }

  //login users
  static login(req, res, next) {
    const {
      email,
      password
    } = req.body;
    User.findOne({
        email
      })
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const access_token = jwt.sign({
            id: user._id
          }, 'SALT_ACADEMY');
          res.status(200).json({
            success: true,
            access_token
          });
        } else throw {
          name: 'LOGIN_FAIL'
        };
      })
      .catch(next);
  }

  //!Edit users Townhall
  static put(req, res, next) {
      ({
        townhallNames
      } = req.body);

      User.findOne({
          _id: req.params.id
        })
        .then(users => {
          users.townhallNames = townhallNames;
          return users.save();
        })
        .then((users) => {
          res.status(200).json({
            success: true,
            data: users
          })
        })
        .catch(next);
  }

  static deleteUser(req, res, next) {
    User.findOne({
        _id: req.params.id
      })
      .then((user) => {
        return user.remove();
      })
      .then((user) => {
        res.status(200).json({
          success: true,
          data: {
            deleted: user
          }
        });
      })
      .catch(next);
  }

}

module.exports = UserController;