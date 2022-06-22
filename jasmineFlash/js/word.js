const learnerskey = "a16b71df-b80e-4b6e-a0b7-4d9c0861a382";
const intermediatekey = "088c99d2-0feb-489c-9de3-b63d2736f465";

let wordList = [
  {
    word: "cat",
    image: "cat.jpg",
  },
  {
    word: "dog",
    image: "dog.jpg",
  },
  {
    word: "apple",
    image: "apple.jpg",
  },
  {
    word: "boy",
    image: "boy.jpg",
  },
  {
    word: "girl",
    image: "girl.jpg",
  },
  {
    word: "man",
    image: "man.jpg",
  },
  {
    word: "woman",
    image: "woman.jpg",
  },
  {
    word: "baby",
    image: "baby.jpg",
  },
  {
    word: "hello",
    image: "hello.jpg",
  },
  {
    word: "bye",
    image: "bye.jpg",
  },
  {
    word: "happy",
    image: "happy.jpg",
  },
  {
    word: "mad",
    image: "mad.jpg",
  },
  {
    word: "walk",
    image: "walk.jpg",
  },
  {
    word: "old",
    image: "old.jpg",
  },
  {
    word: "one",
    image: "one.jpg",
  },
  {
    word: "two",
    image: "two.jpg",
  },
  {
    word: "three",
    image: "three.jpg",
  },
  {
    word: "four",
    image: "four.jpg",
  },
  {
    word: "five",
    image: "five.jpg",
  },
  {
    word: "six",
    image: "six.jpg",
  },
  {
    word: "seven",
    image: "seven.jpg",
  },
  {
    word: "eight",
    image: "eight.jpg",
  },
  {
    word: "nine",
    image: "nine.jpg",
  },
  {
    word: "ten",
    image: "ten.jpg",
  },
  {
    word: "rain",
    image: "rain.jpg",
  },
  {
    word: "eat",
    image: "eat.jpg",
  },
  {
    word: "up",
    image: "up.jpg",
  },
  {
    word: "down",
    image: "down.jpg",
  },
  {
    word: "sleep",
    image: "sleep.jpg",
  },
  {
    word: "yes",
    image: "yes.jpg",
  },
  {
    word: "no",
    image: "no.jpg",
  },
];

export default class Word {
  constructor() {
    this.wordList = wordList;
    this.index = randomIndex(0, this.wordList.length);
    this.wordObj = this.wordList[this.index];
    this.word = this.wordObj["word"];
    this.image = this.wordObj["image"];
    this.directory = this.word.charAt(0);
    fetch(
      `https://www.dictionaryapi.com/api/v3/references/learners/json/${this.word}?key=${learnerskey}`
    )
      //fetch(`https://www.dictionaryapi.com/api/v3/references/sd3/json/cat?key=${intermediatekey}`)
      .then((response) => response.json())
      .then((data) => {
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
        console.log(wordData);
        let word = document.querySelector("#word");
        let audioButton = document.querySelector("#audioButton");
        let audioSrc = document.querySelector("#audioSrc");
        let images = document.querySelector("#images");
        images.innerHTML = "";

        let index = 0;
        let indexes = [this.index];
        for (let i = 0; i < 3; i++) {
          index = randomIndex(0, this.wordList.length);
          indexes.push(index);
        }
        console.log(indexes);
        indexes = shuffle(indexes);
        console.log(indexes);

        indexes.forEach((index) => {
          let div = document.createElement("div");
          let image = document.createElement("img");
          image.classList.add("placeholder");
          let imagesrc = this.wordList[index]["image"];
          let imageword = this.wordList[index]["word"];
          image.classList.add("wrong");
          image.setAttribute("src", `./images/200_${imagesrc}`);
          image.setAttribute("id", `${imageword}`);
          image.addEventListener("click",this.confirmAnswer.bind(this))
          div.appendChild(image);
          images.appendChild(div);
        });

        //   let image = document.createElement("img")
        //   image.classList.add("placeholder")
        //   image.setAttribute("src",`./images/200_${this.image}`);
        //   image.setAttribute("id",`${this.word}`)
        //   image.addEventListener("click",function() {
        //       console.log("checking correct answer")
        //   })
        //   images.appendChild(image);

        audioSrc.setAttribute("src", `${wordData[4]}`);
        audioButton.addEventListener("click", () => audioSrc.play());
        word.textContent = wordData[0];
      });
  }
  confirmAnswer(e){
    let clickedImage = e.target.id
    if(clickedImage === this.word){
        console.log("You're right")
    }
    else{
        console.log("Try again")
    }
    
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
// this.wordsURL =
// "https://joshowen04.github.io/wdd330/jasmineFlash/data/data.json";
// this.word = word;

// fetch(this.wordsURL)
// .then((response) => response.json())
// .then((data) => {(this.wordlist = data);
//   this.word = this.wordlist.words[0].word
//   this.directory = this.word.charAt(0);
//   // this.url = `https://www.dictionaryapi.com/api/v3/references/learners/json/${this.word}?key=${key}`;
//   return this.word
// }
// )
// .then()
