const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    issuedUtc: { type: Date, required: true },
    expiresUtc: { type: Date, required: true },
    token: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ApplicationUser', required : true,
    },
    jwt: {
        token: String,
        exp: Date,
    }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('RefreshToken', schema);