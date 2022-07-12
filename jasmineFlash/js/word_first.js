const learnerskey = "a16b71df-b80e-4b6e-a0b7-4d9c0861a382";
const intermediatekey = "088c99d2-0feb-489c-9de3-b63d2736f465";

//   ,
//   {
//     word: "heart",
//     image: "https://www.merriam-webster.com/assets/mw/static/art/dict/heart.gif"

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
    this.index = randomIndex(0, this.wordList.length);
    this.word = this.wordList[this.index];
    this.image = `${this.word}.jpg`;
    this.directory = this.word.charAt(0);
    this.images = document.querySelector("#images");

    fetch(
      `https://www.dictionaryapi.com/api/v3/references/learners/json/${this.word}?key=${learnerskey}`
    )
      //fetch(`https://www.dictionaryapi.com/api/v3/references/sd3/json/cat?key=${intermediatekey}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //console.log(this.audio);
        // let art = data[0]["artl"][0]["artid"];
        // art = art.split(".")[0]
        // let artURL = `http://www.learnersdictionary.com/art/ld/${art}.jpg`
        // console.log(art, artURL)

        try {
          this.def = data[0]["def"][0]["sseq"][0][0][1]["dt"][0][1]
            .replace(/{(..)}/gi, "")
            .replace(/{(...)}/gi, "");
        } catch {
          this.def = "";
          console.log(`${this.word} doesn't have def`);
        }
        try {
          this.vis = data[0]["def"][0]["sseq"][0][0][1]["dt"][1][1][0]["t"]
            .replace(/{(..)}/gi, "")
            .replace(/{(...)}/gi, "");
        } catch {
          this.vis = "";
          console.log(`${this.word} doesn't have vis`);
        }
        try {
          this.audio = data[0]["hwi"]["prs"][0]["sound"]["audio"];
          this.audioURL = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${this.directory}/${this.audio}.mp3`;
          //console.log(this.audioURL);
        } catch {
          console.log(`${this.word} doesn't have audio`);
        }
        let wordData = [
          this.word,
          this.image,
          this.def,
          this.vis,
          this.audioURL,
        ];
        return wordData;
      })
      .then((wordData) => {
        //console.log(wordData);
        let word = document.querySelector("#word");
        let audioButton = document.querySelector("#audioButton");
        let audioSrc = document.querySelector("#audioSrc");
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
              wordText.addEventListener("click", this.confirmAnswer.bind(this));

              div.replaceChild(wordText, image);
              // console.error('Image does not exists.')
            }
          });
          this.images.appendChild(div);
        });

        audioSrc.setAttribute("src", `${wordData[4]}`);
        audioButton.addEventListener("click", () => audioSrc.play());
        word.textContent = wordData[0];
      });
  }
  confirmAnswer(e) {
    let clickedImage = e.target.id;
    if (clickedImage === this.word) {
      console.log("correct");
      e.target.classList.add("correct");
      this.correct();
    } else {
      this.incorrect(e);
      console.log("Try again");
    }
  }
  correct() {
    let word = new Word();
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
