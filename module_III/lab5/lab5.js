/**
 * @author Juan Camilo MG <juancamilomgdeveloper@gmail.com>
 * @fileOverview This script uses variable declaration, functions and control structure.User login.
 * @licence BSD 3-Clause License
 */

//Declaration of variables
let email = null;
let password = null;
let login = {};

//1. first step load data from html
/**
 * @method
 * @returns {Object}
 * @description this method use promise for get data from the HTML inputs
 */
const getPromiseLoginDataFormMyForm = () => {
  console.log("Retrieve the form data");
  return new Promise((resolve, reject) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    resolve({
      email: email,
      password: password
    }); debugger
  });
};
/**
 * @method
 * @param word
 * @returns {string|undefined}
 * @description this method use for encoded a word in base64.
 */
const encodeBase64 = word => {
  let encodedStringBtoA = undefined;
  if (word !== null && word !== undefined && word.length > 0) {
    encodedStringBtoA = btoa(word);
  }
  debugger
  return encodedStringBtoA;
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
  return new Promise((resolve, reject) => {
    email = data.email;
    password = encodeBase64(data.password);
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
const buildLoginDataForRequest = data => {
  let buildData = null;
  if (data !== null && data !== undefined) {
    buildData = {
      email: data.email,
      password: data.password
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
    login = buildLoginDataForRequest({ email: email, password: password });
    resolve(login);
    debugger
  });
};
/**
 * @method
 * @returns {Object}
 * @description this method use promises for get data from the HTML inputs,
 * also through convert to JSON object for next time send to any server
 */
const getLoginDataFormMyForm = () => {
  getPromiseLoginDataFormMyForm()
    .then(result => {
      return promiseForSanitizeData(result);
    })
    .then(result => {
      return promiseBuildData(result);
    })
    .then(result => {
      console.log(result);
    });
}; debugger

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

//Interaction for the password icon.
function togglePasswordVisibility() {
  var passwordInput = document.getElementById("password");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}

//Abrir"Consola"(inspector).
//Completar algunos campos del formulario en la página HTML(Ingreso).
//En la consola, llamar a la función getLoginDataFormMyForm() para obtener los datos del formulario.
//En la consola, imprimir el valor de email o console.log(email);(se pueden ver otras variables) para verificar que los valores se hayan asignado correctamente a las variables.
//En la consola, llamar a la función buildLoginDataForRequest() para construir el objeto login.
//En la consola, verificar que el objeto login o console.log(login); se haya construido correctamente.