/**
 * @author Juan Camilo MG <juancamilomgdeveloper@gmail.com>
 * @fileOverview This script uses variable declaration, functions and show API.
 * @licence BSD 3-Clause License
 */

//Declaration of variables
//Arrow Function called getAvatarUrl
const getAvatarUrl = () => {
  // URL of the JSON data
  const url = 'https://api.github.com/users/mojombo/followers';
  // Use fetch() to get the data
  fetch(url)
    .then(response => {
      // Check if the request was successful
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(data => {
      // Use the JSON data
      data.forEach(data => {
        console.log(data);
      });
    })
    .catch(error => {
      // Handle the error
      console.error('There has been a problem with your fetch operation:', error);
    });
}

//Calling the function in the console
getAvatarUrl();