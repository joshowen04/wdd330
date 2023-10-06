export default class Activity {
    constructor() {
      this.name = "Activity";
      this.description = "Base activity class";
      this.duration = 10; //in minutes
      this.pauseTime = 5; // in seconds
      this.endingMessage = "Good Bye"
    }
    displayGreeting(){
        console.log(this.description);
      }
      requestDuration(){
        this.duration = prompt("Please confirm duration in minutes, 2");
        console.log(this.duration);
      }
      requestPauseTime(){
        this.pauseTime = prompt("Please confirm pause duration in seconds, 5");
      }
      displayTimer(){
        console.log("timer");
      }
      displayAnimation(){
        console.log("animation")
      }
      displayEngingMessage(){
        console.log(this.endingMessage);
      }
}