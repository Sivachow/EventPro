const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name:{ type: String, required: true },
  cfc_id:{ type: String, default:""},
  cfc_rating:{ type: String},
  province:{type:String, required: true},
  memb_expiry:{type:Date, default:null}, 
  paid:{type:Boolean, default:false},
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

module.exports = mongoose.model('User', userSchema);
