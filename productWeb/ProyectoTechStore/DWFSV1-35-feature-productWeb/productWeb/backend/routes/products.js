var express = require('express');
var router = express.Router();
var productService = require('../services/products');

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
var getProductByname = function (req, res, next) {
  productService.getProductByname(req.params.name)
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
var updateProductByname = function (req, res, next) {
  productService.updateProductByname(req.params.name, req.body)
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
var deleteProductByname = (req, res, next) => {
  productService.deleteProductByname(req.params.name)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).json(err));
};

/**
 * @description This definition section is responsible for indicating the methods or verbs that HTTP uses to receive
 * the Request and its respective Response.
 */
router.get('/', getAllProducts);
router.post('/create', createProduct);
router.delete('/:name/delete', deleteProductByname);
router.put('/:name/update', updateProductByname);
router.get('/:name/detail', getProductByname);

module.exports = router;