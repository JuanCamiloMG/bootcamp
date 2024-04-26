/**
 * @author Juan Camilo MG <juancamilomgdeveloper@gmail.com>
 * @fileOverview This script uses variable declaration, functions and show users.
 * @licence BSD 3-Clause License
 */

//Declaration of variables
//Arrow Function called iterateUsers
const iterateUsers = () => {
  //content copied from users.json
  const users = [
    { "user_id": 1, "first_name": "Peadar", "last_name": "Popeley", "age": 24, "email": "ppopeley0@usnews.com", "country": "China", "favorite_color": "green", "gender": "Male", "shirt_size": "2XL" },
    { "user_id": 2, "first_name": "Mirilla", "last_name": "Knoble", "age": 62, "email": "mknoble1@reverbnation.com", "country": "Indonesia", "favorite_color": "blue", "gender": "Female", "shirt_size": "XL" },
    { "user_id": 3, "first_name": "Zebulon", "last_name": "Woliter", "age": 65, "email": "zwoliter2@devhub.com", "country": "Slovenia", "postal_code": "9240", "favorite_color": "red", "gender": "Male", "shirt_size": "S" },
    { "user_id": 4, "first_name": "Carrissa", "last_name": "Denisard", "age": 82, "email": "cdenisard3@apple.com", "country": "Poland", "postal_code": "32-546", "favorite_color": "red", "gender": "Female", "shirt_size": "XL" },
    { "user_id": 5, "first_name": "Lodovico", "last_name": "Howitt", "age": 20, "email": "lhowitt4@un.org", "country": "Azerbaijan", "favorite_color": "red", "gender": "Male", "shirt_size": "M" },
    { "user_id": 6, "first_name": "Patrice", "last_name": "Wardroper", "age": 66, "email": "pwardroper5@bizjournals.com", "country": "Philippines", "postal_code": "2436", "favorite_color": "blue", "gender": "Male", "shirt_size": "3XL" },
    { "user_id": 7, "first_name": "Daven", "last_name": "Breed", "age": 66, "email": "dbreed6@angelfire.com", "country": "Norway", "postal_code": "4638", "favorite_color": "red", "gender": "Male", "shirt_size": "3XL" },
    { "user_id": 8, "first_name": "Arlen", "last_name": "Boulding", "age": 43, "email": "aboulding7@hc360.com", "country": "China", "favorite_color": "blue", "gender": "Female", "shirt_size": "2XL" },
    { "user_id": 9, "first_name": "Zonda", "last_name": "Trengrouse", "age": 51, "email": "ztrengrouse8@epa.gov", "country": "China", "favorite_color": "red", "gender": "Female", "shirt_size": "M" },
    { "user_id": 10, "first_name": "Phedra", "last_name": "Whimpenny", "age": 76, "email": "pwhimpenny9@1688.com", "country": "Canada", "postal_code": "N3T", "favorite_color": "blue", "gender": "Female", "shirt_size": "L" },
    { "user_id": 11, "first_name": "Ulrike", "last_name": "Keene", "age": 59, "email": "ukeenea@admin.ch", "country": "Indonesia", "favorite_color": "green", "gender": "Female", "shirt_size": "XS" },
    { "user_id": 12, "first_name": "Miles", "last_name": "Martinets", "age": 36, "email": "mmartinetsb@hao123.com", "country": "Armenia", "favorite_color": "red", "gender": "Male", "shirt_size": "2XL" },
    { "user_id": 13, "first_name": "Merrill", "last_name": "Jorg", "age": 48, "email": "mjorgc@psu.edu", "country": "Indonesia", "favorite_color": "blue", "gender": "Female", "shirt_size": "M" },
    { "user_id": 14, "first_name": "Fritz", "last_name": "Fackrell", "age": 69, "email": "ffackrelld@elegantthemes.com", "country": "Namibia", "favorite_color": "red", "gender": "Non-binary", "shirt_size": "XL" },
    { "user_id": 15, "first_name": "Asa", "last_name": "MacKissack", "age": 25, "email": "amackissacke@wikimedia.org", "country": "Macedonia", "postal_code": "1047", "favorite_color": "blue", "gender": "Male", "shirt_size": "3XL" },
    { "user_id": 16, "first_name": "Garreth", "last_name": "Murrow", "age": 29, "email": "gmurrowf@army.mil", "country": "Nigeria", "favorite_color": "green", "gender": "Male", "shirt_size": "2XL" },
    { "user_id": 17, "first_name": "Zebadiah", "last_name": "Paragreen", "age": 68, "email": "zparagreeng@comcast.net", "country": "France", "postal_code": "26209 CEDEX", "favorite_color": "green", "gender": "Male", "shirt_size": "2XL" },
    { "user_id": 18, "first_name": "Hartley", "last_name": "Olyfat", "age": 49, "email": "holyfath@scientificamerican.com", "country": "Nigeria", "favorite_color": "green", "gender": "Male", "shirt_size": "S" },
    { "user_id": 19, "first_name": "Dall", "last_name": "Fass", "age": 21, "email": "dfassi@smugmug.com", "country": "Portugal", "postal_code": "2785-220", "favorite_color": "red", "gender": "Male", "shirt_size": "M" },
    { "user_id": 20, "first_name": "Amandi", "last_name": "Aizikovich", "age": 80, "email": "aaizikovichj@cnet.com", "country": "Russia", "postal_code": "386250", "favorite_color": "green", "gender": "Female", "shirt_size": "XS" }
  ];
  //view of all users
  users.forEach(user => {
    console.log(user);
  });
}

//Calling the function in the console
iterateUsers();