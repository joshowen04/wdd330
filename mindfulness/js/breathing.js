import Activity from "./activity.js";
export default class Breathing extends Activity {
    constructor() {
        super();
        this.description = "Breathing Class"
        this.breathingDiv = document.querySelector("#breathing");
        this.breathingDiv.addEventListener("click",this.runActivity.bind(this));
      }

      runActivity(){
        this.displayGreeting();
        this.requestDuration();
      }
}


