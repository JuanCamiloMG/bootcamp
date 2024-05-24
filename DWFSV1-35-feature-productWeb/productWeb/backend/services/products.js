var db = require('../config/db');

var Product = db.Product;

/**
 * @type {{error: string}}
 */
var error = { error: "error" };

/**
 * @method
 * @description This method use for get all list of products
 * @returns {Promise<*>}
 */
var getAllProducts = async function () {
  return await Product.find({ status: true }).select('name product_type quantity price latitude longitude status id').exec();
};

/**
 * @method
 * @param productParam
 * @description This method use for create product, and receive productParam object
 * @returns {Promise}
 */
var createProduct = async function (productParam) {
  if (productParam === undefined || await Product.findOne({ name: productParam.name })) {
    throw { code: 409, message: 'Product ' + productParam.name + ' is already taken' };
  }
  var product = new Product(productParam);
  product.status = true;
  await product.save();

  return getProductByname(productParam.name);
};

/**
 * @method
 * @description This method use for get product by productname, and receive productname object
 * @param name
 * @returns {Promise<*>}
 */
var getProductByname = async function (name) {
  var product = await Product.findOne({ name: name, status: true })
    .select('name product_type quantity price latitude longitude status id').exec();

  if (!product) {
    throw { code: 404, message: 'Product ' + name + ' does not exist' };
  }

  return product;
};

/**
 * @method
 * @description This method use for update product by productname, and receive productname object
 * @param name
 * @param productParam
 * @returns {Promise<*>}
 */
var updateProductByname = async function (name, productParam) {
  var productForUpdate = await Product.findOne({ name: name, status: true });

  if (!productForUpdate) {
    throw { code: 404, message: 'Product ' + name + ' does not exist' };
  }

  var productUpdatedResult = await Product.findByIdAndUpdate(productForUpdate.id,
    { name: productParam.name, product_type: productParam.product_type, quantity: productParam.quantity, price: productParam.price, latitude: productParam.latitude, longitude: productParam.longitude });

  if (productUpdatedResult && productUpdatedResult.errors) {
    throw { code: 400, message: productUpdatedResult.errors };
  }

  return getProductByname(productForUpdate.name);

};

/**
 * @method
 * @description This method use for delete product by productname
 * @param name
 * @returns {Promise<*>}
 */
var deleteProductByname = async function (name) {
  var productForSoftDelete = await Product.findOne({ name: name, status: true });

  if (!productForSoftDelete) {
    throw { code: 404, message: 'Product ' + name + ' does not exist' };
  }

  var productSoftDeleteResult = await Product.findByIdAndUpdate(productForSoftDelete.id,
    { status: false });

  if (productSoftDeleteResult && productSoftDeleteResult.errors) {
    throw { code: 400, message: productSoftDeleteResult.errors };
  }
};

/**
 * @description Export services for use in the controller or routes * @type {{getProductByname: (function(*): Promise),
 * getAllProducts: (function(): Promise),
 * createProduct: (function(): Promise),
 * deleteProductByname: (function(*): Promise),
 * updateProductByname: (function(*): Promise)}}
 */
module.exports = {
  getAllProducts,
  createProduct,
  getProductByname,
  updateProductByname,
  deleteProductByname,
};