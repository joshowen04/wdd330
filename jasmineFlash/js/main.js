const lastmod = document.querySelector(".lastmod");
const copywriteyear = document.querySelector(".copywriteyear");
const d = new Date();
const year = d.getFullYear();

copywriteyear.textContent += `${year} | WDD330 Final | Joshua Owen | Santiago Chile | Designed for Jasmine`;


const wordsURL = "https://joshowen04.github.io/wdd330/jasmineFlash/data/data.json";


import Word from "./word.js";
// import SignIn from "./signin.js";
// let signin = new SignIn(document.querySelector("#signInDiv"));

let word = new Word();

//console.log(word);
word.chooseWord();
await word.getWordData(word.word);
word.view();