
export default class WordList {
    constructor(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          return data
        });
    }
  }
  