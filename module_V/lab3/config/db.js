var mongoose = require('mongoose');

mongoose.set('strictQuery', false);

var main = async function () {
  await mongoose.connect('mongodb://127.0.0.1:27017/Products', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

main()
  .then(function (connect) {
    console.log('MongoDB Connected');
  })
  .catch(function (err) {
    console.log(err);
  });

module.exports = {
  Product: require('../models/products'),
};