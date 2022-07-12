const wordsURL = "https://joshowen04.github.io/wdd330/jasmineFlash/data/data.json";


import Word from "./word.js";
// import SignIn from "./signin.js";
// let signin = new SignIn(document.querySelector("#signInDiv"));

let word = new Word();

//console.log(word);
word.chooseWord();
await word.getWordData(word.word);
word.view();