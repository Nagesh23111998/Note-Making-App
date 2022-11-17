
showNotes(); // nots will show after page reload
// if user add a notes add it to a local storage
let addBtn = document.getElementById("addBtn")

addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes) //parses a JSON string, constructing the JavaScript value or object described by the string.
  }
  notesObj.push(addTxt.value)
  localStorage.setItem('notes', JSON.stringify(notesObj))
  addTxt.value = ""
  showNotes();
})

// funtion to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes)
  }
  let date = new Date()
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
     <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
        <div style="display:flex; justify-content:space-between" >
           <h5 class="card-title">Note ${index + 1}</h5>
            <h5 class="card-title" style="font-size:12px">${date.toDateString()}</h5>
        </div>
          <p class="card-text">${element}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div> `
  })
  let notesElm = document.getElementById('notes');
  if (notesObj.length != 0) {
    notesElm.innerHTML = html
  }
  else {
    notesElm.innerHTML = ` Please add Notes. Your Notes will appear here`
  }
}

//function to delete a note
function deleteNote(index) {
if(confirm("Are you sure !")==true){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    }
    else {
      notesObj = JSON.parse(notes)
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj)) // localstorage will update
    showNotes()
}
}

//for searching 
let search = document.getElementById('searchTxt');
search.addEventListener("input", function() { // add event the name of input
  let inputVal = search.value.toLowerCase() //make toLowerCase because even user search capital then he can get same of small word
  let noteCard = document.getElementsByClassName('noteCard')
  Array.from(noteCard).forEach(function(element) {
    let cardTxt = element.getElementsByTagName('p')[0].innerText // all notecard p will save in the cardTxt
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block"
    }
    else {
      element.style.display = "none"
    }
  })
})
