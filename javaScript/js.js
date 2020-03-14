// Selecting
const ElementDate = document.getElementById("date");
const listId = document.getElementById("list");
const input = document.getElementById("input");
const clear = document.querySelector(".clear");


// Class name
const lineT = "lineThrough";
const checkIt = "fa-check-circle";
const uncheckIt = "fa-circle-thin";


// Variables
let ToDoList, id;


let data = localStorage.getItem("toDoItem");

// cheing if data is not empty
if (data) {
    ToDoList = JSON.parse(data);
    id = ToDoList.length;
    loadList(ToDoList);
} else {

    ToDoList = [];
    id = 0;
}

// loading items to interface
function loadList(array) {
    array.forEach(function (item) {
        addTask(item.name, item.id, item.done, item.bin);
    });
}

// clearing  local storage
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Todays date
const option = {
    weekday: "long",
    month: "short",
    day: "numeric"
};
const today = new Date();

ElementDate.innerHTML = today.toLocaleDateString("en-US", option);


//  adding Task
function addTask(task, id, done, bin) {

    if (bin) {
        return;
    }

    const aDone = done ? checkIt : uncheckIt;
    const aLine = done ? lineT : "";

    const item = `<li class="item">
                    <i class="fa ${aDone} co" job="complete" id="${id}"></i>
                    <p class="text ${aLine}">${task}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;

    const position = "beforeend";

    listId.insertAdjacentHTML(position, item);
}

// Adding item by enter
document.addEventListener("keyup", function (even) {
    if (event.keyCode == 13) {
        const task = input.value;

        if (task) {
            addTask(task, id, false, false);

            ToDoList.push({
                name: task,
                id: id,
                done: false,
                bin: false
            });
            localStorage.setItem("toDoItem", JSON.stringify(ToDoList));
            id++;
        }
        input.value = "";
    }
});
// Done Tasks
function doneTasks(element) {
    element.classList.toggle(checkIt);
    element.classList.toggle(uncheckIt);
    element.parentNode.querySelector(".text").classList.toggle(lineT);

    ToDoList[element.id].done = ToDoList[element.id].done ? false : true;
}
// Removing Tasks
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    ToDoList[element.id].bin = true;
}

// / Choosing the Task

listId.addEventListener("click", function (event) {
    const element = event.target;
    const elementChoosen = element.attributes.job.value;
    if (elementChoosen == "complete") {
        doneTasks(element);
    } else if (elementChoosen == "delete") {
        removeToDo(element);
    }
    // adding to localstorage 
    localStorage.setItem("toDoItem", JSON.stringify(ToDoList));
});