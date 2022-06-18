const key = "a16b71df-b80e-4b6e-a0b7-4d9c0861a382";

export default class Word {
  constructor(word) {
    this.word = word;
    this.directory = this.word.charAt(0);
    this.url = `https://www.dictionaryapi.com/api/v3/references/learners/json/${this.word}?key=${key}`;
    fetch(this.url)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        this.audio = data[0]["hwi"]["prs"][0]["sound"]["audio"];
        //console.log(this.audio);
        // let art = data[0]["artl"][0]["artid"];
        // art = art.split(".")[0]
        // let artURL = `http://www.learnersdictionary.com/art/ld/${art}.jpg`
        // console.log(art, artURL)
        this.def = data[0]["def"][0]["sseq"][0][0][1]["dt"][1][1][0]["t"]
          .replace("{it}", "<span id='defWord'>")
          .replace("{/it}", "</span>");
        //console.log(this.def);
        this.audioURL = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${this.directory}/${this.audio}.mp3`;
        //console.log(this.audioURL);

        return(this.def)
      });
  }
}
