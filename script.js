var ul = document.querySelector("ul");
var input = document.querySelector("#input-field");
var button = document.querySelector("#input-button");
var output = document.querySelector("#lsOutput");
var storedInput = localStorage.getItem("textInput");

var createListElement = () => {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    input.value ="";
    var deleteButton = document.createElement("button");
    deleteButton.className = "fa fa-trash deletebtn";
    var doneButton = document.createElement("button");
    doneButton.className = "fa fa-check-square donebtn";
    localStorage.setItem("textInput", input.value);

    li.appendChild(deleteButton);
    li.appendChild(doneButton);
    deleteButton.onclick = function() {
        this.parentElement.style.display = "none"
    }
    doneButton.onclick = function() {
        li.classList.toggle("done");
        this.classList.toggle("done");
    }
}

var inputLength = () => {
	return input.value.length;
}

var addListAfterClick = () => {
	if (inputLength() > 0) {
		createListElement();
	}
}

var addListAfterKeypress = (event) => {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}

var createDeleteButton = () => {
    deleteButton.appendChild(document.createButton("Delete"));
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}


button.addEventListener("click", addListAfterClick)

input.addEventListener("keypress", addListAfterKeypress);



