const mongoose = require('mongoose');

const roleSchema =  mongoose.Schema({
    roleName: { type: String, unique: true, required: true },
    roleDescription: { type: String, required: true },
    canDelete: { type: Boolean, required: true }
});

roleSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Roles', roleSchema);