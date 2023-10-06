import Activity from "./activity.js";

let prompts = [
  "Think of a time when you stood up for someone else.",
  "Think of a time when you did something really difficult.",
  "Think of a time when you helped someone in need.",
  "Think of a time when you did something truly selfless."
]

let questions = [
  "Why was this experience meaningful to you?",
  "Have you ever done anything like this before?",
  "How did you get started?",
  "How did you feel when it was complete?",
  "What made this time different than other times when you were not as successful?",
  "What is your favorite thing about this experience?",
  "What could you learn from this experience that applies to other situations?",
  "What did you learn about yourself through this experience?",
  "How can you keep this experience in mind in the future?"
]
export default class Reflection extends Activity {
  constructor() {
    super();
    this.description = "Reflection Class"
    this.reflectingDiv = document.querySelector("#reflecting");
    this.reflectingDiv.addEventListener("click",this.runActivity.bind(this))
  }

  runActivity(){
    console.log("reflecting")
  }
}