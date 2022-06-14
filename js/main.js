
const links = [
    {
        name: "week1",
        label: "Week 1 Notes",
        url: "week01/index.html"
    }
    ,
    {
        name: "week2",
        label: "Week 2 Notes",
        url: "week02/index.html"
    }
    ,
    {
        name: "week3",
        label: "Week 3 Notes",
        url: "week03/index.html"
    }
    ,
    {
        name: "week4",
        label: "Week 4 Notes",
        url: "week04/index.html"
    }
    ,
    {
        name: "week5",
        label: "Week 5 Notes",
        url: "week05/index.html"
    }
    ,
    {
        name: "week6",
        label: "Week 6 Notes",
        url: "week06/index.html"
    },
    {
        name: "todo",
        label: "ToDo Project",
        url: "Todo/todo.html"
    }
    ,
    {
        name: "week7",
        label: "Week 7 Notes",
        url: "week07/index.html"
    }
    ,
    {
        name: "week8",
        label: "Week 8 Notes",
        url: "week08/index.html"
    }
    ,
    {
        name: "week9",
        label: "Week 9 Notes",
        url: "week09/index.html"
    }
    //,
    // {
    //     name: "week10",
    //     label: "Week 10 Notes",
    //     url: "week10/index.html"
    // }
    //,
    // {
    //     name: "week11",
    //     label: "Week 11 Notes",
    //     url: "week11/index.html"
    // }
    //,
    // {
    //     name: "week12",
    //     label: "Week 12 Notes",
    //     url: "week12/index.html"
    // }
    //,
    // {
    //     name: "week13",
    //     label: "Week 13 Notes",
    //     url: "week13/index.html"
    // }
    //,
    // {
    //     name: "week14",
    //     label: "Week 14 Notes",
    //     url: "week14/index.html"
    // }
]

function listlinks() {
    const block1Notes = document.querySelector("#block1Notes");

    links.forEach((week) => {
        //console.log(week.name);
        let label = week.label;
        let url = week.url;
        let newItem = document.createElement("li");
        let link = document.createElement("a");
        link.href = url;
        link.innerHTML = label;
        newItem.appendChild(link);
        block1Notes.appendChild(newItem);
    });
    
}
listlinks();