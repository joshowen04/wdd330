import LSUtilities from "./records.js";
let lsutil = new LSUtilities();
// localStorage.removeItem("jasmine");
const learnerskey = "a16b71df-b80e-4b6e-a0b7-4d9c0861a382";
const intermediatekey = "088c99d2-0feb-489c-9de3-b63d2736f465";
const spanishKey = "3aa0d400-2503-447c-abb7-87e6c27ab503"

const mainurl = "https://www.dictionaryapi.com/api/v3/references/spanish/json/"

//const mainurl = "https://www.dictionaryapi.com/api/v3/references/learners/json/"
let wordList = [
  // "manzana",
  // "cabalgata",
  "bigotudo",
  "album",
  "bipedo",
  "bocado"
  // "boleta",
  // "alba",
  // "baston",
  // "bajada",
  // "doblar",
  // "boton",
  // "dictado",
  // "robar",
  // "banco",
  // "mueble"
];





export default class Word {
  constructor() {
    this.title = document.querySelector("h1");
    this.title.focus();
    this.wordList = wordList;
    this.wordElement = document.querySelector("#word");
    this.audioButton = document.querySelector("#audioButton");
    this.audioSrc = document.querySelector("#audioSrc");
    this.fail = document.querySelector("#fail");
    this.win = document.querySelector("#win");


  }
  chooseWord(){
    this.index = randomIndex(0, this.wordList.length);
    this.word = this.wordList[this.index];
    this.images = document.querySelector("#images");
  }
  async getWordData(word){
    const data = await makeRequest(mainurl,word);
    let audio = "";
    let directory = word.charAt(0);
    let audioURL = "";

    if (word == "album"){
      console.log(word)
      audio = `${word}.mp3`;
      console.log(audio)
      audioURL = `./audio/${audio}`;
      console.log(audio)
    }
    else {
    try{ 
    audio = await data[0]["hwi"]["prs"][0]["sound"]["audio"];
    directory = word.charAt(0);
    audioURL = `https://media.merriam-webster.com/audio/prons/es/me/mp3/${directory}/${audio}.mp3`;
    console.log(audioURL)
    }
    catch(err){

    audio = `${word}.mp3`;
    console.log(audio)
    audioURL = `./audio/${audio}`;
    console.log(audio)
    }
  }
    const image = `${word}.jpg`;
  
    this.wordData = [
      word,
      image,
      audioURL,
    ];
    return this.wordData
  }
    view(){
      let images = document.querySelectorAll(".placeholder")
        let index = 0;
        //get the word
        let indexes = [this.index];
        //add random words to the "indexes"
        for (let i = 0; indexes.length < 4; i++) {
          index = randomIndex(0, this.wordList.length);
          
          //make sure we're not repeating any pictures.
          if (!indexes.includes(index)) {
            indexes.push(index);
          }
        }
        //console.log(indexes);
        indexes = shuffle(indexes);
        //console.log(indexes);
        let imagesCount = 0;
        indexes.forEach((index) => {
          
          let currentImage = images[imagesCount];
          currentImage.innerHTML = ""
          currentImage.classList.remove("correct");
          currentImage.classList.remove("incorrect");
          currentImage.removeAttribute("id");

          let imagesrc = `${this.wordList[index]}.jpg`;
          imagesrc = `./images/200_${imagesrc}`;
          let imageword = this.wordList[index];
          //currentImage.src = imagesrc

          currentImage.src = imagesrc;

          currentImage.setAttribute("id", `${imageword}`);
          currentImage.setAttribute("alt",`${imageword}`);
          //since i'm not recreating the element completely, duplicate event listeners were being created because i'm binding "this".
          if (!currentImage.getAttribute("listenerAttached")){
            currentImage.addEventListener("click", this.confirmAnswer.bind(this));
            currentImage.setAttribute("listenerAttached", true)
          }
          //this.images.appendChild(div);
          imagesCount ++;
        });
        //console.log(imagesCount);
        this.audioSrc.setAttribute("src", `${this.wordData[2]}`);
        if (!this.audioButton.getAttribute("listenerAttached")){
          this.audioButton.addEventListener("click", () => this.playAudio(this.audioSrc));
          this.audioButton.setAttribute("listenerAttached", true)
        }

        
        this.wordElement.textContent = this.wordData[0].toUpperCase();
        this.wordElement.style.display = "none";
      };
  confirmAnswer(e) {
    let clickedImage = e.target.id;
    if (clickedImage === this.word) {
      //console.log("correct",clickedImage,this.word);
      this.wordElement.style.display = "block";
      this.correct(e);

    } else {
      this.incorrect(e);
      //console.log("incorrect",clickedImage,this.word)

    }
  }
  playAudio(source){
    //console.log(source);
    source.currentTime=0;
    source.play();
  }
  async correct(e) {
    e.target.classList.add("correct");
    lsutil.add("jasmine",e.target.id)
    this.playAudio(this.win);
    await this.restart()
  }
  incorrect(e) {
    e.target.classList.add("incorrect");
    this.playAudio(this.fail);
    //this.displayRetry()
  }
  async restart(){
    this.chooseWord();
    await this.getWordData(this.word);
    this.view();
    this.title.focus();
  }
  displayRetry(){
    let retryWindow = document.createElement("div");
    let cards = document.querySelector("#cards");

    retryWindow.setAttribute("id","retryWindow");
    let retry = document.createElement("img");
    retry.id = "retry"
    retry.src = "./images/200_rotationicon.png";

    let skip = document.createElement("img");
    skip.id = "skip"
    skip.src = "./images/200_no.png";
    retryWindow.appendChild(retry);
    retryWindow.appendChild(skip);
    retry.addEventListener("click",() => {cards.removeChild(retryWindow)})
    skip.addEventListener("click",() => {cards.removeChild(retryWindow); this.restart()})
    cards.appendChild(retryWindow)
  }

}

// function checkIfImageExists(url, callback) {
//   const img = new Image();
//   img.src = url;

//   if (img.complete) {
//     callback(true);
//   } else {
//     img.onload = () => {
//       callback(true);
//     };

//     img.onerror = () => {
//       callback(false);
//     };
//   }
// }


function randomIndex(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let index = Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  return index;
}

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


async function makeRequest(
  url,
  word
) {
  const response = await fetch(`${url}${word}?key=${spanishKey}`
  );
  // in this case we are processing the response as JSON before we check the status. The API will send back more meaningful error messages than the default messages in the response, but we have to convert it before we can get to them.
  const data = await response.json();

  if (!response.ok) {
    // server will send a 500 server error if the token expires...or a 401 if we are not authorized, ie bad username/password combination, and a 404 if the URL we requested does not exist. All of these would cause response.ok to be false

    console.log(response);
    throw new Error(`${data.status}: ${data.message}`);
  } else {
    return data;
  }
  // not catching the error here...so we will need to catch it later on and handle it.
}



// view(){
//   let images = document.querySelectorAll(".placeholder")
//   console.log(images)
//   //this.images.innerHTML = "";
//     let index = 0;
//     //get the word
//     let indexes = [this.index];
//     //add random words to the "indexes"
//     for (let i = 0; indexes.length < 4; i++) {
//       index = randomIndex(0, this.wordList.length);
      
//       //make sure we're not repeating any pictures.
//       if (!indexes.includes(index)) {
//         indexes.push(index);
//       }
//     }
//     //console.log(indexes);
//     indexes = shuffle(indexes);
//     //console.log(indexes);
//     let imagesCount = 0
//     indexes.forEach((index) => {
//       let div = document.createElement("div");
        
//       let imagesrc = `${this.wordList[index]}.jpg`;
//       imagesrc = `./images/200_${imagesrc}`;
//       let imageword = this.wordList[index];

//       let image = document.createElement("img");
//       div.appendChild(image);

//       checkIfImageExists(imagesrc, (exists) => {
//         if (exists) {
//           image.src = imagesrc;
//           image.classList.add("placeholder");
//           /*image.classList.add("wrong");*/

//           image.setAttribute("id", `${imageword}`);
//           image.addEventListener("click", this.confirmAnswer.bind(this));
//         } else {
//           let wordText = document.createElement("h2");
//           wordText.textContent = imageword;
//           wordText.classList.add("placeholder");
//           /*wordText.classList.add("wrong");*/

//           wordText.setAttribute("id", `${imageword}`);
//           wordText.addEventListener("click", this.confirmAnswer.bind(this));

//           wordText.style.backgroundColor = `${imageword}`
//           wordText.style.color = `${imageword}`
//           wordText.style.height = "150px"
//           div.replaceChild(wordText, image);
//           // console.error('Image does not exists.')
//         }
//       });
//       this.images.appendChild(div);
//       imagesCount ++
//     });
//     console.log(imagesCount)
//     this.audioSrc.setAttribute("src", `${this.wordData[2]}`);
//     this.audioButton.addEventListener("click", () => this.playAudio(this.audioSrc));
//     this.wordElement.textContent = this.wordData[0];
//   };