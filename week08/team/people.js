export default class People {
  constructor(url) {
    this.originalURL = url;
    this.peopleList = [];
  }
  getall(url) {
    this.peopleList = fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let people = data.results;

        let next = data.next;
        if (!next) {
            next = "https://swapi.dev/api/people/";
        }
        //console.log(data);

        let prevUrl = data.previous;
        if(!prevUrl) {
          prevUrl = "https://swapi.dev/api/people/";
        }

        let buttonPrev= document.createElement("button");
        let buttonNext = document.createElement("button");

        let peopleDiv = document.querySelector("#people");
        let peopleUL = document.createElement("ul");

        //let peopleListUl = document.createElement("ul");
        people.forEach((person) => {
          let nameli = document.createElement("li");
          nameli.textContent = person.name;
          nameli.setAttribute('id', `${person.name}`);
          nameli.classList.add("name");

          peopleUL.appendChild(nameli);
          // let keys = Object.keys(person);
          
          // // length = keys.length;
          // // console.log(length);
          // keys.forEach((key) => {
          //   let peopledl = document.createElement("dl");
          //   // let peopleLi = document.createElement("li");
          //   let peopledt = document.createElement("dt");
          //   peopledt.textContent = key
          //   let peopledd = document.createElement("dd");
          //   peopledd.textContent = person[key];
          //   peopledl.appendChild(peopledt);
          //   peopledl.appendChild(peopledd);
          //   peopleDiv.appendChild(peopledl);
          //});

          nameli.addEventListener('click',this.showInfo)
        });
        peopleDiv.appendChild(peopleUL);
        buttonNext.innerHTML = "Next";
        buttonPrev.innerHTML = "Previous";
        peopleDiv.appendChild(buttonPrev);
        peopleDiv.appendChild(buttonNext);
        buttonNext.addEventListener("click", () => {
          peopleDiv.innerHTML = "";
          this.getall(next);
        });
        buttonPrev.addEventListener("click", () => {
          peopleDiv.innerHTML = "";
          this.getall(prevUrl);
        })
      });
  }
  showInfo(e){
    //console.log(e.target.id)
    let name = e.target.id
    fetch(`https://swapi.dev/api/people/?search=${name}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.results[0].birth_year)
        let results = data.results[0];
        let detailsDiv = document.querySelector("#details");
        detailsDiv.style.display = "block";
        detailsDiv.classList.add("detailsDiv"); 
        detailsDiv.innerHTML = `<h3>${name}'s Details</h3>`;
        let detailsUl = document.createElement("ul");
        detailsUl.innerHTML = `<li>Eye Color: ${results.eye_color}</li>
                               <li>Birth Year: ${results.birth_year}</li>
                               <li>Mass: ${results.mass}</li>`;
        detailsDiv.appendChild(detailsUl);
        detailsDiv.addEventListener('click',() => {detailsDiv.style.display = "none";})
        //document.querySelector("#people").appendChild(detailsDiv);
      });
    

    
    
  }
}


// birth_year: "19BBY"
// created: "2014-12-09T13:50:51.644000Z"
// edited: "2014-12-20T21:17:56.891000Z"
// eye_color: "blue"
// gender: "male"
// hair_color: "blond"
// height: "172"
// mass: "77"
// name: "Luke Skywalker"
// skin_color: "fair"


// <details>
//     <summary>Some Magazines of Note</summary>
//     <ul>
//     <li><cite>Bird Watcher's Digest</cite></li>
//     <li><cite>Rower's Weekly</cite></li>
//     <li><cite>Fishing Monthly</cite></li>
//     </ul>
// </details>


