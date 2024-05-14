var jwt = require('jsonwebtoken');
var config = require('../middlewares/config.json');

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
  return await Product.find().select('productname producttype quantity price latitude longitude status id').exec();
};

/**
 * @method
 * @param productParam
 * @description This method use for create product, and receive productParam object
 * @returns {Promise}
 */
var createProduct = async function (productParam) {
  if (productParam === undefined || await Product.findOne({ productname: productParam.productname })) {
    throw { code: 409, message: 'Product ' + productParam.productname + ' is already taken' };
  }
  var product = new User(productParam);
  product.status = true;
  await product.save();

  return getProductByproductname(productParam.productname);
};

/**
 * @method
 * @description This method use for get product by productname, and receive productname object
 * @param productname
 * @returns {Promise<*>}
 */
var getProductByproductname = async function (productname) {
  var product = await Product.findOne({productname: productname, status: true })
    .select('productname producttype quantity price latitude longitude status id').exec();

  if (!product) {
    throw { code: 404, message: 'Product ' + productname + ' does not exist' };
  }

  return product;
};

/**
 * @method
 * @description This method use for update product by productname, and receive productname object
 * @param productname
 * @param productParam
 * @returns {Promise<*>}
 */
var updateProductByproductname = async function (productname, productParam) {
  var productForUpdate = await Product.findOne({ productname: productname, status: true });

  if (!productForUpdate) {
    throw { code: 404, message: 'Product ' + productname + ' does not exist' };
  }

  var productUpdatedResult = await Product.findByIdAndUpdate(productForUpdate.id,
    { productname: productParam.productname, producttype: productParam.producttype, quantity: productParam.quantity, price: productParam.price, latitude: productParam.latitude, longitude: productParam.longitude });

  if (productUpdatedResult && productUpdatedResult.errors) {
    throw { code: 400, message: productUpdatedResult.errors };
  }

  return getProductByproductname(productForUpdate.productname);

};

/**
 * @method
 * @description This method use for delete product by productname
 * @param productname
 * @returns {Promise<*>}
 */
var deleteProductByproductname = async function (productname) {
  var productForSoftDelete = await Product.findOne({ productname: productname, status: true });

  if (!productForSoftDelete) {
    throw { code: 404, message: 'Product ' + productname + ' does not exist' };
  }

  var productSoftDeleteResult = await Product.findByIdAndUpdate(productForSoftDelete.id,
    { status: false });

  if (productSoftDeleteResult && productSoftDeleteResult.errors) {
    throw { code: 400, message: productSoftDeleteResult.errors };
  }
};

/**
 * @method
 * @description This method use for sign product by productname
 * @param productname
 * @returns {Promise}
 */
var authenticate = async ({productname}) => {
  var productForAuth = await Product.findOne({productname: productname, status: true});

  if (!productForAuth) {
    throw {code: 400, message: 'Please check the credentials'};
  }

  var productAuth = {
    productname: productname,
    producttype: productForAuth.producttype,
    quantity: productForAuth.quantity,
    price: productForAuth.price,
    latitude: productForAuth.latitude,
    longitude: productForAuth.longitude,
    status: productForAuth.status,
    id: productForAuth.id
  };
    
  
  
  productAuth.token = jwt.sign(
      {
        sub:
        {
          productname: productname,
          producttype: productAuth.producttype,
          quantity: productAuth.quantity,
          price: productAuth.price,
          latitude: productAuth.latitude,
          longitude: productAuth.longitude,
          locale: 'CO',
          roles: {
            is_admin: true,
            is_user: true
          }
        }
      },
      config.secret,
      { expiresIn: '120m' }
    );

  return productAuth;

};

/**
 * @description Export services for use in the controller or routes * @type {{getProductByproductname: (function(*): Promise),
 * getAllProducts: (function(): Promise),
 * authenticate: (function({productname: *}): Promise),
 * createProduct: (function(*): Promise),
 * deleteProductByproductname: (function(*): Promise),
 * updateProductByproductname: (function(*, *): Promise)}}
 */
module.exports = {
  getAllProducts,
  createProduct,
  getProductByproductname,
  updateProductByproductname,
  deleteProductByproductname,
  authenticate
};