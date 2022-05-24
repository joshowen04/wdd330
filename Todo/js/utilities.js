import toDoList from "./ls.js";
// let tasklist = new toDoList();
export default class ToDo {
  constructor(elementId) {
    this.parentElement = document.getElementById(elementId);
    this.submitButton = this.buildsubmitButton();
    this.formElement = document.forms[0];
    this.tasklist = new toDoList();
    this.populateList();
  }
  buildsubmitButton() {
    const addTaskButton = document.querySelector("#addTaskButton");
    addTaskButton.addEventListener("click", (e) => {
      e.preventDefault();
      let task = this.formElement.addTaskInput.value;
      this.tasklist.add(task);
    //   tasklist.add(task);
      this.populateList();
    });
  }
  populateList() {
    this.parentElement.innerText = "";
    let list = this.tasklist.view();
    // let list = tasklist.view();
    list.map((item) => {
      let listItem = document.createElement("li");
      //<img class='pending' id='${item.id}_state_pending' src="images/greencircle-62.png" alt="pending">
      // <img class='completed' id='${item.id}_state_completed' src="images/greencheck-62.png" alt="done"></img>

      listItem.innerHTML = `<span><img id='${item.id}_state_${item.state}' src="" alt="done">
                            </span>
                            <span class='content' id='${item.id}_content'>${item.content}</span><span><img  id='${item.id}_delete' src="images/redx-62.png" alt="X"></span>`;
      

      this.parentElement.appendChild(listItem);
      if (!item.state) {
        let image = document.getElementById(`${item.id}_state_${item.state}`)
        image.src = "images/greencircle-62.png"
        image.alt = "pending"
      }
      else if (item.state) {
        let image = document.getElementById(`${item.id}_state_${item.state}`)
        image.src = "images/greencheck-62.png"
        image.alt = "done"
      }
      listItem.addEventListener("click",this.manageTasks.bind(this),true);

    });
    
  }
  manageTasks(e) {
       //console.log(e);
        let clickedID = e.target.id;
        let clicked = document.getElementById(clickedID)
        let taskInfo = clickedID.split("_");
        let taskId = taskInfo[0]
        if (clickedID.includes("delete")){
            //let todoItem = this.tasklist.view(content[0]);
            this.tasklist.delete(taskId)

        }
        else if (clickedID.includes('false')){
          //clicked.classList.add("hidden");
          this.tasklist.mark(taskId)

       }
       else if (clickedID.includes('true')){
        this.tasklist.mark(taskId)

       }
       this.populateList();

    }

}
