registerSW();

var createListElement = (txt) => {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    li.innerHTML = txt;

    input.value="";
    var deleteButton = document.createElement("button");
    deleteButton.className = "fa fa-trash deletebtn";
    var doneButton = document.createElement("button");
    doneButton.className = "fa fa-check-square donebtn";
    li.appendChild(deleteButton);
    li.appendChild(doneButton);
  

    deleteButton.addEventListener("click", (e) => {
        li.parentNode.removeChild(li);
        // this.parentElement.style.display = "none";
        savedTasks = savedTasks.filter((e) => e !== txt); // remove the in-memory element
        localStorage.setItem("tasks", JSON.stringify(savedTasks)); // store the new list in localStorage
    })

    doneButton.onclick = function() {
        li.classList.toggle("done");
        this.classList.toggle("done");
    }
}

var ul = document.querySelector("ul");
var input = document.querySelector("#input-field");
var button = document.querySelector("#input-button");
var list = document.querySelector("#list");

// read previous tasks. If no tasks were found, start with an empty list
let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
// add UI elements for any saved task
savedTasks.forEach(createListElement);

var inputLength = () => {
	return input.value.length;
}

var addListAfterClick = () => {
	if (inputLength() > 0) {
        let txt = input.value;
        savedTasks.push(txt);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        createListElement(txt);
	} else {
        alert("Please write something to do!");
    }
}

var createDeleteButton = () => {
    deleteButton.appendChild(document.createButton("Delete"));
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
        let txt = input.value;
        savedTasks.push(txt);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
		createListElement(txt);
	} else if (inputLength() === 0 && event.keyCode === 13)
    alert("Please write something to do!")
}

button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

async function registerSW() {
    if ("serviceWorker" in navigator) {
        try {
            await navigator.serviceWorker.register("./sw.js");
        } catch (e) {
            console.log("SW registration failed");
        }
    }
}



