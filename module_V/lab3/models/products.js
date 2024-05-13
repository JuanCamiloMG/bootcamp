var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  productname: { type: String, unique: true, required: true },
  producttype: { type: String, required: true },
  quantity: { type: String, required: true },
  price: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  status: { type: Boolean, required: false },
});

schema.set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  }
});

module.exports = mongoose.model('Product', schema);