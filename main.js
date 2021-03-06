const url = "http://localhost:3000/notes";
const notes = document.getElementById("notes");
const noteForm = document.getElementById("noteForm");
const delNote = document.getElementById("delNote");
const editNote = document.getElementById("editNote");
const noteList = document.getElementById("noteList");
const saveNote = document.getElementById("saveNote");
const radioB = document.querySelectorAll("li");
let saveEdit = document.getElementById("saveEdit");
let deleted = "";
let saveContain = document.getElementById("saveContain");

function listNotes() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      function custom_sort(a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      data.sort(custom_sort);
      for (let noteObj of data) {
        renderNoteItem(noteObj);
      }
    });
}

noteForm.addEventListener("submit", function () {
  event.preventDefault();
  let logged = new Date().toLocaleString();
  const titleText = document.getElementById("titleText").value;
  const noteText = document.getElementById("noteText").value;
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: titleText,
      body: noteText,
      date: logged,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      renderNoteItem(data);
      noteForm.reset();
    });
});

noteList.addEventListener("click", function liListen(e) {
  radio = e.target.id;
  console.log(radio);
  noteList.removeEventListener("click", liListen);
});

delNote.addEventListener("click", function () {
  event.preventDefault();
  console.log(radio);
  let noteEl = document.getElementById(radio);
  fetch(url + "/" + radio, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  noteList.removeChild(noteEl);
  noteList.addEventListener("click", function liListen(e) {
    radio = e.target.id;
    console.log(radio);
    noteList.removeEventListener("click", liListen);
  });
});

editNote.addEventListener("click", function edited() {
  console.log("edit clicked");
  document.getElementById(
    radio
  ).childNodes[1].innerHTML = `<input class="editTitle" type="text" id="${radio}"value ="${
    document.getElementById(radio).childNodes[1].innerHTML
  }">`;
  document.getElementById(
    radio
  ).childNodes[2].innerHTML = `<input type="text" class="editText" id="${radio}" value="${
    document.getElementById(radio).childNodes[2].innerHTML
  }">`;
  editNote.removeEventListener("click", edited);
  document.getElementById(
    "saveContain"
  ).innerHTML = `<button id="saveEdit">Save Edited Note</button>`;
});

function renderNoteItem(noteObj) {
  const noteEl = document.createElement("li");
  noteEl.id = noteObj.id;
  noteEl.classList.add("noted");
  noteEl.innerHTML = `<input type="radio" name="note" id="${noteObj.id}" class="radio"><h3 class="title" id="${noteObj.id}">${noteObj.title}</h3><span class= "bodyNote" id="${noteObj.id}">${noteObj.body}</span><span id="${noteObj.id}" class="date">${noteObj.date}</span>`;
  noteList.prepend(noteEl);
}

function deletNoteItem() {
  console.log(radio);
  noteList.removeChild(radio);
  document.getElementById(radio).remove();
}

listNotes();

saveContain.addEventListener("click", function savDit() {
  event.preventDefault();
  console.log(radio);
  let logged = new Date().toLocaleString();
  const titled =
    document.getElementById(radio).childNodes[1].childNodes[0].value;
  const noted =
    document.getElementById(radio).childNodes[2].childNodes[0].value;
  console.log("clicked");
  document.getElementById(radio).childNodes[3].childNodes[0].value;
  console.log("clicked");
  noteList.prepend(document.getElementById(radio));
  fetch(url + "/" + radio, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: titled,
      body: noted,
      date: logged,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById(radio).childNodes[1].innerHTML = titled;
      document.getElementById(radio).childNodes[2].innerHTML = noted;
      document.getElementById(radio).childNodes[3].innerHTML = logged;
      document.getElementById("saveContain").innerHTML = "";
      editNote.addEventListener("click", function edited() {
        console.log("edit clicked");
        document.getElementById(
          radio
        ).childNodes[1].innerHTML = `<input class="editTitle" type="text" id="${radio}"value ="${
          document.getElementById(radio).childNodes[1].innerHTML
        }">`;
        document.getElementById(
          radio
        ).childNodes[2].innerHTML = `<input type="text" class="editText" id="${radio}" value="${
          document.getElementById(radio).childNodes[2].innerHTML
        }">`;
        editNote.removeEventListener("click", edited);
        document.getElementById(
          "saveContain"
        ).innerHTML = `<button id="saveEdit">Save Edited Note</button>`;
      });
      noteList.addEventListener("click", function liListen(e) {
        radio = e.target.id;
        console.log(radio);
        noteList.removeEventListener("click", liListen);
      });
    });
});
