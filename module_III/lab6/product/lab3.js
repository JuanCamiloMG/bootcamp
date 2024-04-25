/**
 * @author Juan Camilo MG <juancamilomgdeveloper@gmail.com>
 * @fileOverview This script uses variable declaration, functions and control structure.Product registration.
 * @licence BSD 3-Clause License
 */

//Declaration of variables
let productname = null;
let producttype = null;
let quantity = null;
let price = null;
let latitude = null;
let longitude = null;
let product = {};

//1. first step load data from html
/**
 * @method
 * @returns {Object}
 * @description this method use promise for get data from the HTML inputs
 */
const getPromiseProductDataFormMyForm = () => {
  console.log("Retrieve the form data");
  return new Promise((resolve, reject) => {
    const productname = document.getElementById("productname").value;
    const producttype = document.getElementById("producttype").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
    resolve({
      productname: productname,
      producttype: producttype,
      quantity: quantity,
      price: price,
      latitude: latitude,
      longitude: longitude
    });debugger
  });
};

//2. sanitize data
/**
 * @method
 * @param data
 * @returns {Promise<unknown>}
 * @description this method use promise for sanitize data method
 */
const promiseForSanitizeData = (data) => {
  console.log("Clear the form data");
  return new Promise((resolve, reject) => {productname = data.productname;
    producttype = data.producttype;
    quantity = data.quantity;
    price = data.price;
    latitude = data.latitude;
    longitude = data.longitude;
    resolve();
    debugger
  });
};
/**
 * @method
 * @param data
 * @returns {Object|null}
 * @description this method use for build data for send to server.
 */
const buildProductDataForRequest = data => {
  let buildData = null;
  if (data !== null && data !== undefined) {
    buildData = {
      product_name: data.productname,
      product_type: data.producttype,
      quantity: data.quantity,
      price: data.price,
      latitude: data.latitude,
      longitude: data.longitude
    }
  }
  debugger
  return buildData;
};

// 3. prepare to send
/**
 * @method
 * @returns {Promise<unknown>}
 * @description this method use promise for build JSON data method
 */
const promiseBuildData = () => {
  console.log("Send the form data");
  return new Promise((resolve, reject) => {
    product = buildProductDataForRequest({productname: productname, producttype: producttype, quantity: quantity, price: price, latitude: latitude, longitude : longitude});
    resolve(product);
    debugger
  });
};  
/**
 * @method
 * @returns {Object}
 * @description this method use promises for get data from the HTML inputs,
 * also through convert to JSON object for next time send to any server
 */
const getProductDataFormMyForm = () => {
  getPromiseProductDataFormMyForm()
  .then(result => {
   return promiseForSanitizeData(result);
  })
  .then(result => {
    return promiseBuildData(result);
  })
  .then(result => {
    console.log(result);
  });
};debugger

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
  .forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
})()

//Abrir"Consola"(inspector).
//Completar algunos campos del formulario en la página HTML(producto).
//En la consola, llamar a la función getProductDataFormMyForm() para obtener los datos del formulario.
//En la consola, imprimir el valor de productname o console.log(productname);(se pueden ver otras variables) para verificar que los valores se hayan asignado correctamente a las variables.
//En la consola, llamar a la función buildProductDataForRequest() para construir el objeto product.
//En la consola, verificar que el objeto product o console.log(product); se haya construido correctamente.