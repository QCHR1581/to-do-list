registerSW();

// get elements and ids
var ul = document.querySelector("ul");
var input = document.querySelector("#input-field");
var button = document.querySelector("#input-button");
var list = document.querySelector("#list");

var createListElement = (txt) => {
    // create list items
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    li.innerHTML = txt;
    // make text-field blank
    input.value="";
    // create delete-button with class for trashcan
    var deleteButton = document.createElement("button");
    deleteButton.className = "fa fa-trash deletebtn";
    // create done-button with class for checkmark
    var doneButton = document.createElement("button");
    doneButton.className = "fa fa-check-square donebtn";
    // attach delete-button and done-button to list elements
    li.appendChild(deleteButton);
    li.appendChild(doneButton);
    // click done-button --> delete item 
    deleteButton.addEventListener("click", (e) => {
        li.parentNode.removeChild(li);
        // remove the in-memory element
        savedTasks = savedTasks.filter((e) => e !== txt); 
        // store the new list in localStorage
        localStorage.setItem("tasks", JSON.stringify(savedTasks)); 
    })
    // click done-button --> task colour = green
    doneButton.onclick = function() {
        li.classList.toggle("done");
        
    }
}

// read previous tasks. If no tasks were found, start with an empty list
let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
// add UI elements for any saved task
savedTasks.forEach(createListElement);

// get length of text
var inputLength = () => {
	return input.value.length;
}

// click "Add"-button --> add list element
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

// press enter key --> add list element
var addListAfterKeypress = (event) => {
	if (inputLength() > 0 && event.keyCode === 13) {
        let txt = input.value;
        savedTasks.push(txt);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
		createListElement(txt);
	} else if (inputLength() === 0 && event.keyCode === 13)
    alert("Please write something to do!")
}

// event listener for "Add"-button
button.addEventListener("click", addListAfterClick);

// event listener for pressing enter
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



