import People from './people.js';
//on load grab the array and insert it into the page
const people = new People();
const peopleUrl = 'https://swapi.dev/api/people/'



people.getall(peopleUrl);


// async function renderList() {

//     try {
//         const peopleList = await people.getall();
//         return peopleList;
//         // load the game using the returned info
//     }

//     catch (error){
//         throw error;
//     }
// }

//renderList();
