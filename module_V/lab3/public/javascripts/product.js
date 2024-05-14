/**
 *     @author Juan Camilo MG <juancamilomgdeveloper@gmail.com>
 *     @fileOverview This script use Function & Scopes in JS
 *     @licence BSD 3-Clause License
 */

// declaration vars
let productname = null;
let producttype = null;
let quantity = null;
let price = null;
let latitude = null;
let longitude = null;
let product = {};

/**
 * @method
 * @param data
 * @returns {Object|null}
 * @description this method use for build data for send to backend
 */
const buildDataProduct = data => {
  let buildData = null;

  if (data !== null && data !== undefined) {
    buildData = {
      productname: data.productname,
      producttype: data.producttype,
      quantity: data.quantity,
      price: data.price,
      latitude: data.latitude,
      longitude: data.longitude
    }
  }

  return buildData;
};

/**
 * @method
 * @returns {Object|null}
 * @description this method use for send data to backend
 */
const saveProduct = () => {
  const url = 'http://localhost:3000/api/v1/products/create';

  // Use fetch() to get the data
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
    .then(response => {
      // Check if the request was successful
      if (response) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(data => {
      // Use the JSON data
      console.log(data);
    })
    .catch(error => {
      // Handle the error
      console.error('There has been a problem with your fetch operation:', error);
    });
};

/**
 * @method
 * @returns {Object}
 * @description this method use for get data from the HTML inputs,
 * also through convert to JSON object for next time send to any server
 */
const getProductDataFormFormProduct = () => {

  //1. first step load data from html
  const floatingInputproductname = document.getElementById("floatingInputproductname").value;
  const floatingInputproducttype = document.getElementById("floatingInputproducttype").value;
  const floatingInputquantity = document.getElementById("floatingInputquantity").value;
  const floatingInputprice = document.getElementById("floatingInputprice").value;
  const floatingInputlatitude = document.getElementById("floatingInputlatitude").value;
  const floatingInputlongitude = document.getElementById("floatingInputlongitude").value;
  debugger

  //2. sanitize data
  productname = floatingInputproductname;
  producttype = floatingInputproducttype;
  quantity = floatingInputquantity;
  price = floatingInputprice;
  latitude = floatingInputlatitude;
  longitude = floatingInputlongitude;
  debugger

  // 3. prepare to send
  product = buildDataProduct({ productname: productname, producttype: producttype, quantity: quantity, price: price, latitude: latitude, longitude: longitude });
  localStorage.setItem('product', JSON.stringify(product));
  debugger

  // 4. send data
  saveProduct();
  debugger
};

/**
 * @method
 * @description this method use for clear data in localStorage
 */
const clearLocalStorage = () => {
  localStorage.removeItem('product');
};

/**
 * @method
 * @description This function displays the form data
 */
function showForm() {
  var productname = $('#productname').val();
  var producttype = $('#producttype').val();
  var quantity = $('#quantity').val();
  var price = $('#price').val();
  var latitude = $('#latitude').val();
  var longitude = $('#longitude').val();

  $('#productnameInfo').text(productname);
  $('#producttypeInfo').text(producttype);
  $('#quantityInfo').text(quantity);
  $('#priceInfo').text(price);
  $('#latitudeInfo').text(latitude);
  $('#longitudeInfo').text(longitude);
  $('#InfoProduct').show();
}

/**
 * @method
 * @description This function displays the form validations
 */
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