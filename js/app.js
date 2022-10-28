console.log("Welcome to notes app");
showNotes();

//If a user add a note,add it to localstorage

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    // console.log(notesObj);
    showNotes();
})

//function to show notes from localstorage

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes);
    }
    html = "";
    notesObj.forEach((element, index) => {
        html += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">Note ${index + 1}</h5>
        <p class="card-text">${element}</p>
        <button class="btn btn-primary" onclick="deleteNote(this.id)" id="${index}">Delete Note</button>
        </div>
        </div>
        `
    });
    let notesContainer = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesContainer.innerHTML = html;
    }
    else {
        notesContainer.innerHTML = `Nothing to show.Use "Add Note" section above to add notes.`;
    }
}

//function to delete a note

function deleteNote(index) {
    //  console.log("Deletion",index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//Search functionality

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    // console.log("Searching in progress...",inputVal);
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})