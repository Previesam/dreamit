const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    issued: { type: Date, required: true },
    expiresIn: { type: Date, required: true },
    token: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ApplicationUser', required : true,
    },
    access_token: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('RefreshToken', schema);