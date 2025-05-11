const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: String,
  email: String,
  totalSpend: Number,
  visits: Number,
  lastActiveDate: Date
});

module.exports = mongoose.model('Customer', CustomerSchema);
