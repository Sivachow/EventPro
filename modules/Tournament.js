const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  first_name:{ type: String, required: true },
  last_name:{ type: String, required: true },
  cfc_id:{ type: String},
  cfc_rating:{ type: String},
  prov:{type:String, required: true},
  memb_expiry:{type:Date, default:null}, 
  paid:{type:Boolean, default:false},
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

module.exports = mongoose.model('User', userSchema);
