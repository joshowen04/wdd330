const learnerskey = "a16b71df-b80e-4b6e-a0b7-4d9c0861a382";
const intermediatekey = "088c99d2-0feb-489c-9de3-b63d2736f465";

const mainurl = "https://www.dictionaryapi.com/api/v3/references/learners/json/"
let wordList = [
  "apple",
  "boy",
  "girl",
  "man",
  "woman",
  "baby",
  "hello",
  "bye",
  "happy",
  "mad",
  "walk",
  "old",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "rain",
  "eat",
  "up",
  "down",
  "sleep",
  "yes",
  "no",
  //colors
  "green",
  "red",
  "blue",
  "orange",
  "yellow",
  "purple",
  "black",
  "pink",
  "brown",
  //animals
  "cat",
  "dog",
  "lion",
  "tiger",
  "cow",
  "rabbit",
  "pig",
  "goat",
  "rooster",
  "hen",
  "horse",
  "giraffe",
  "monkey"


  // ,
  // "the",
  // "of",
  // "and",
  // "to",
  // "in",
  // "you",
  // "that",
  // "it",
  // "he",
  // "for",
  // "on",
  // "as",
  // "with",
  // "his",
  // "they",
  // "at",
  // "be",
  // "this",
  // "from",
  // "have",
  // "or",
  // "by",
  // "not",
  // "but",
  // "what",
  // "all",
  // "when",
  // "we",
  // "there",
  // "can",
  // "an",
  // "your",
  // "which",
  // "their",
  // "if",
  // "do",
  // "will",
  // "each",
  // "about",
  // "how",
  // "out",
  // "them",
  // "then",
  // "she",
  // "many",
  // "some",
  // "so",
  // "would",
  // "other",
  // "into",
  // "more",
  // "her",
  // "like",
  // "him",
  // "see",
  // "time",
  // "could",
  // "make",
  // "than",
  // "first",
  // "its",
  // "who",
  // "now",
  // "people",
  // "my",
  // "over",
  // "down",
  // "only",
  // "way",
  // "find",
  // "use",
  // "may",
  // "water",
  // "long",
  // "little",
  // "very",
  // "after",
  // "just",
  // "where",
  // "most",
  // "know"
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
      
    const audio = await data[0]["hwi"]["prs"][0]["sound"]["audio"];
    const directory = word.charAt(0);
    const audioURL = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${directory}/${audio}.mp3`;
    const image = `${word}.jpg`;
  
    this.wordData = [
      word,
      image,
      audioURL,
    ];
    return this.wordData
  }
    view(){
        this.images.innerHTML = "";

        let index = 0;
        let indexes = [this.index];
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

        indexes.forEach((index) => {
          let div = document.createElement("div");

          let imagesrc = `${this.wordList[index]}.jpg`;
          imagesrc = `./images/200_${imagesrc}`;
          let imageword = this.wordList[index];

          let image = document.createElement("img");
          div.appendChild(image);

          checkIfImageExists(imagesrc, (exists) => {
            if (exists) {
              image.src = imagesrc;
              image.classList.add("placeholder");
              /*image.classList.add("wrong");*/

              image.setAttribute("id", `${imageword}`);
              image.addEventListener("click", this.confirmAnswer.bind(this));
            } else {
              let wordText = document.createElement("h2");
              wordText.textContent = imageword;
              wordText.classList.add("placeholder");
              /*wordText.classList.add("wrong");*/

              wordText.setAttribute("id", `${imageword}`);
              wordText.addEventListener("touch", this.confirmAnswer.bind(this));

              wordText.style.backgroundColor = `${imageword}`
              wordText.style.color = `${imageword}`
              wordText.style.height = "150px"
              div.replaceChild(wordText, image);
              // console.error('Image does not exists.')
            }
          });
          this.images.appendChild(div);
        });

        this.audioSrc.setAttribute("src", `${this.wordData[2]}`);
        this.audioButton.addEventListener("touch", () => this.playAudio(this.audioSrc));
        this.wordElement.textContent = this.wordData[0];
      };
  confirmAnswer(e) {
    let clickedImage = e.target.id;
    if (clickedImage === this.word) {
      console.log("correct");
      e.target.classList.add("correct");
      this.correct();
      this.playAudio(this.win)
    } else {
      this.incorrect(e);
      this.playAudio(this.fail)
      console.log("Try again");
    }
  }
  playAudio(source){
    source.currentTime=0;
    source.play()
  }
  async correct() {
    this.chooseWord()
    this.view()
    await this.getWordData(this.word)
    this.view();
  }
  incorrect(e) {
    e.target.classList.add("incorrect");
  }
}

function checkIfImageExists(url, callback) {
  const img = new Image();
  img.src = url;

  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };

    img.onerror = () => {
      callback(false);
    };
  }
}


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
  const response = await fetch(`${url}${word}?key=${learnerskey}`
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

/*
done:
	calling the word, audio, description or sentence, and edited pictures
	first trials of showing pictures and word in page
	added event listeners so audio working and pictures are clickable

	confirmAnswer to check if correct answer
	it's looping when answer is correct


to do:
	add definition/sentence on screen
	animate buttons and pictures with transform css
	fix sizing issues
	create try again popup/page
	maybe try and remove duplicates from images.


*/
