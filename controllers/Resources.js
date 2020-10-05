const mongoose = require('mongoose');
const Resource = require('../models/Resource');

class ResourceController {

  static createResource(req, res, next) {
    const resource = new Resource({
      health:100,
      food:100,
      soliders:0,
    });
    resource
      .save()
      .then((resource) => {
        res.status(201).json({
          success: true,
          data: resource
        });
      })
      .catch(next);
  }

  // static get(req, res, next) {
  //   _userId: req._userId
  // }


  static put(req, _res, next) {
    const {
      townhallNames
    } = req.body;
    User.findOne({
        _id: req.params.id,
      })
      .populate('users')
      .then((user) => {
        user.townhallNames = townhallNames;
        return user.save();
      })
      .catch(next);
  }
}

module.exports = ResourceController;