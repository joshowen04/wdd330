import Activity from "./activity.js";

let questions = [
  "Who are people that you appreciate?",
  "What are personal strengths of yours?",
  "Who are people that you have helped this week?",
  "When have you felt the Holy Ghost this month?",
  "Who are some of your personal heroes?"
]

export default class Listing extends Activity {
  constructor() {
    super();
    this.description = "Listing Class"
    this.listingDiv = document.querySelector("#listing");
    this.listingDiv.addEventListener("click",this.runActivity.bind(this))
  }

  runActivity(){
    console.log("listing")
  }
}