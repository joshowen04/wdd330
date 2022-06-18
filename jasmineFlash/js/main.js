const wordsURL = "https://joshowen04.github.io/wdd330/jasmineFlash/data/data.json";

import WordList from "./wordlist.js"
let wordlist = new WordList(wordsURL);

import Word from "./word.js";
let def = new Word("cat");

console.log(def)
