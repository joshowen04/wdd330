
export default class toDoList {
    constructor() {
        //todo: { id : timestamp, content: string, completed: bool }
        //toDoList = [toDo];
        this.toDoList = localStorage.getItem('todo');

        // this.toDoList = [];
        // localStorage.setItem('toDo', this.toDoList)
        }

    add(task){
        //localStorage.setItem('myCat', 'Tom');
        let newTask = {
        id: new Date().getTime(),
        content:task,
        state :  false
    };
    let list = this.view("all");
    if (list.length === 0)
    { list = []};
    list.push(newTask);
    localStorage.setItem('toDo', JSON.stringify(list));
    //this.delete("abc")
    //this.mark("abcd")
    //console.log(this.view());
    //console.log(this.view())
    }
    delete(id){
        let list = this.view("all");
        list = list.filter(item => {
            //console.log(item);
            return item.id != id;
        });
        localStorage.setItem('toDo', JSON.stringify(list));

    }
    mark(id){
        let list = this.view("all");
        id = parseInt(id);
        list.forEach((item) => {
            if (item.id === id){
                switch (item.state){
                    case false:
                        item.state = true;
                        break;
                    case true:
                        item.state = false;
                        break;
                } 
            }
        });
        localStorage.setItem('toDo', JSON.stringify(list));
    }
    view(id = "all"){
        if (id === "all") {
            return JSON.parse(localStorage.getItem('toDo') || "[]");
        }
        else {
            return JSON.parse(localStorage.getItem('toDo') || "[]").filter(item => {
                //console.log(item);
                return item.id === id;
            });
        }
    }
}

