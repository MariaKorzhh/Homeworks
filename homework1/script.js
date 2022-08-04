var mainUL = document.getElementById("idUL");

function selectFirst() {
    var oneItem = mainUL.firstElementChild;
    oneItem.setAttribute("style", "color:#0000FF");
}

function selectLast() {
    var oneItem = mainUL.lastElementChild;
    oneItem.setAttribute("style", "color:#0000FF");
}

var selectedElem = mainUL.lastElementChild;

function selectNext() {
    mainUL.lastElementChild.removeAttribute("style");
    if (selectedElem.nextElementSibling == null) {
        selectedElem.removeAttribute("style");
        selectedElem = mainUL.firstElementChild;
    }
    else {
        selectedElem.removeAttribute("style");
        selectedElem = selectedElem.nextElementSibling;
    }
    selectedElem.setAttribute("style", "color:#FF00FF");
}

function selectPrev() {
    mainUL.firstElementChild.removeAttribute("style");
    if (selectedElem.previousElementSibling == null) {
        selectedElem.removeAttribute("style");
        selectedElem = mainUL.lastElementChild;
    }
    else {
        selectedElem.removeAttribute("style");
        selectedElem = selectedElem.previousElementSibling;
    }
    selectedElem.setAttribute("style", "color:#FF00FF");  
}

function append() {
    var newItem = document.createElement("li");
    newItem.innerHTML = 'NEW item';
    document.getElementById("idUL").appendChild(newItem);
}

function remove() {
    var oneItem = mainUL.lastElementChild;
    mainUL.removeChild(oneItem);
}

function appendToTheTop() {
    var firsItem = mainUL.firstElementChild;
    var newItem = document.createElement("li");
    newItem.innerHTML = 'NEW item';
    mainUL.insertBefore(newItem, firsItem);
}