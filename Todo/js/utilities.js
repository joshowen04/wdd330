import toDoList from "./ls.js";
// let tasklist = new toDoList();
export default class ToDo {
  constructor(elementId) {
    this.parentElement = document.getElementById(elementId);
    this.submitButton = this.buildsubmitButton();
    this.formElement = document.forms[0];
    this.tasklist = new toDoList();
    this.filter = "all"
    this.buildFilterButtons();
    this.populateList();
  }
  buildsubmitButton() {
    const addTaskButton = document.querySelector("#addTaskButton");
    addTaskButton.addEventListener("click", (e) => {
      e.preventDefault();
      let task = this.formElement.addTaskInput.value;
      console.log(task.length);
      if (task.length != 0){
        this.tasklist.add(task);
        //   tasklist.add(task);
        this.populateList();
        this.formElement.reset();
      }
    });
  }
  buildFilterButtons() {
    let filterCompleted = document.querySelector("#filterCompleted");
    let filterPending = document.querySelector("#filterPending");
    let filterALL = document.querySelector("#filterALL");
    filterCompleted.addEventListener("click", this.populateFiltered.bind(this));
    filterPending.addEventListener("click", this.populateFiltered.bind(this));
    filterALL.addEventListener("click", this.populateFiltered.bind(this))
  }
  populateFiltered(e) {
    if (e.target.id.includes("Completed")) {
      this.filter = true;
    } else if (e.target.id.includes("Pending")) {
      this.filter = false;
    }
    else {
      this.filter = "all"
    }
    this.populateList(this.filter);
  }
  populateList(filter) {
    this.parentElement.innerText = "";
    let list = this.tasklist.view();
    // let list = tasklist.view();
    if (filter == true) {
      list = list.filter((item) => {
        //console.log(item);
        return item.state == true;
      });
    } else if (filter == false) {
      list = list.filter((item) => {
        //console.log(item);
        return item.state == false;
      });
    } else if (filter == "all"){
      list = this.tasklist.view();
    }
    list.map((item) => {
      let listItem = document.createElement("li");
      //<img class='pending' id='${item.id}_state_pending' src="images/greencircle-62.png" alt="pending">
      // <img class='completed' id='${item.id}_state_completed' src="images/greencheck-62.png" alt="done"></img>

      listItem.innerHTML = `<span><img id='${item.id}_state_${item.state}' src="" alt="done">
                            </span>
                            <span class='content' id='${item.id}_content'>${item.content}</span><span><img  id='${item.id}_delete' src="images/redx-62.png" alt="X"></span>`;

      this.parentElement.appendChild(listItem);
      if (!item.state) {
        let image = document.getElementById(`${item.id}_state_${item.state}`);
        image.src = "images/greencircle-62.png";
        image.alt = "pending";
      } else if (item.state) {
        let image = document.getElementById(`${item.id}_state_${item.state}`);
        image.src = "images/greencheck-62.png";
        image.alt = "done";
      }
      listItem.addEventListener("click", this.manageTasks.bind(this), true);
    });
  }
  manageTasks(e) {
    //console.log(e);
    let clickedID = e.target.id;
    let clicked = document.getElementById(clickedID);
    let taskInfo = clickedID.split("_");
    let taskId = taskInfo[0];
    if (clickedID.includes("delete")) {
      //let todoItem = this.tasklist.view(content[0]);
      this.tasklist.delete(taskId);
    } else if (clickedID.includes("state") || clickedID.includes("content")) {
      //clicked.classList.add("hidden");
      this.tasklist.mark(taskId);
    }
    this.populateList(this.filter);
  }
}
