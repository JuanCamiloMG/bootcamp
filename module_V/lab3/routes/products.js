var express = require('express');
var router = express.Router();
var productService = require('../services/products');
var verifyToken = require("../middlewares/authMiddleware");

/**
 * @method
 * @description This method use with receive request HTTP GET through middleware from Node.JS and expressJS and response
 * object Request. Use method or verb GET
 * @param req
 * @param res
 * @param next
 */
var getAllProducts = function (req, res, next) {
  productService.getAllProducts()
    .then(products => res.json(products))
    .catch(err => next(err));
};

/**
 * @method
 * @description This method use with receive request HTTP POST through middleware from Node.JS and expressJS and
 * response object Request. Use method or verb POST
 * @param req
 * @param res
 * @param next
 */
var createProduct = function (req, res, next) {
  productService.createProduct(req.body)
    .then((product) => res.status(201).send(product))
    .catch(err => res.status(400).json(err));
};

/**
 * @method
 * @description This method use with receive a productname request HTTP GET through middleware from Node.JS and expressJS
 * and response object Request. Use method or verb GET
 * @param req
 * @param res
 * @param next
 */
var getProductByproductname = function (req, res, next) {
  productService.getProductByproductname(req.params.productname)
    .then((product) => res.status(200).send(product))
    .catch(err => res.status(400).json(err));
}

/**
 * @method
 * @description This method use with receive a productname and body request HTTP PUT through middleware
 * from Node.JS and expressJS and response object Request. Use method or verb PUT
 * @param req
 * @param res
 * @param next
 */
var updateProductByproductname = function (req, res, next) {
  productService.updateProductByproductname(req.params.productname, req.body)
    .then((product) => res.json(product))
    .catch(err => res.status(400).json(err));
};

/**
 * @method
 * @description This method use with receive a productname by request HTTP DELETE through middleware
 * from Node.JS and expressJS and response No Content Request. Use method or verb DELETE
 * @param req
 * @param res
 * @param next
 */
var deleteProductByproductname = (req, res, next) => {
  productService.deleteProductByproductname(req.params.productname)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).json(err));
};

/**
 * @method
 * @description This method use with receive body by request HTTP POST through middleware
 * from Node.JS and expressJS and response the product data with authentication token. Use method or verb POST
 * @param req
 * @param res
 * @param next
 */
var authenticate = (req, res, next) => {
  productService.authenticate(req.body)
    .then(product => res.json(product))
    .catch(err => res.status(400).json(err));
};

/**
 * @description This definition section is responsible for indicating the methods or verbs that HTTP uses to receive
 * the Request and its respective Response.
 */
router.get('/', verifyToken, getAllProducts);
router.post('/create', createProduct);
router.delete('/:productname/delete', verifyToken, deleteProductByproductname);
router.put('/:productname/update', verifyToken, updateProductByproductname);
router.get('/:productname/detail', verifyToken, getProductByproductname);
router.post('/authenticate', authenticate);

module.exports = router;