const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = mongoose.Schema({
  email: {
    type: String, required: true, unique: true, validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
      isAsync: false
    }
  },
  hash: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true },
  roles: [{ type: String }],
  passport: { type: String },
}, { timestamps: true });

UserSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);