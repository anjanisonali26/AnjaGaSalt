const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 4 },
  email: { type: String, required: true, default: 'example@me.com' },
  password: { type: String, required: true, minlength: 8 },
  tawnhall: {type: String},
  resources: {
      golds : Number,
      foods: Number,
      health: Number, 
      energy: Number,
      
  }
  
},{ 
  timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
}
)

userSchema.pre('save', function (next) {
  User.findOne({ email: this.email })
    .then((user) => {
      if (user) next({ name: "ALREADY_EXISTS" });
      else {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
        next();
      }
    })
    .catch((err) => next({ name: "MONGOOSE_ERROR" }));
});
const User = mongoose.model('User', userSchema);

module.exports = User;
