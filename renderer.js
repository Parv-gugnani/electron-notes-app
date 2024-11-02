const fs = require('fs');
const path = require('path');

const noteContent = document.getElementById('note-content');
const noteList = document.getElementById('notes');
const saveButton = document.getElementById('save-note');
const notesFile = path.join(__dirname, 'notes.json');

function loadNotes() {
  if (fs.existsSync(notesFile)) {
    const data = fs.readFileSync(notesFile);
    const notes = JSON.parse(data);
    noteList.innerHTML = '';
    notes.forEach((note, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = note;
      listItem.addEventListener('click', () => {
        noteContent.value = note;
      });
      noteList.appendChild(listItem);
    });
  }
}

function saveNote() {
  const newNote = noteContent.value;
  let notes = [];
  if (fs.existsSync(notesFile)) {
    const data = fs.readFileSync(notesFile);
    notes = JSON.parse(data);
  }
  notes.push(newNote);
  fs.writeFileSync(notesFile, JSON.stringify(notes));
  loadNotes();
  noteContent.value = ''; 
}

saveButton.addEventListener('click', saveNote);

loadNotes();
