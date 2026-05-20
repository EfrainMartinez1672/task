const task = document.querySelector(".input")
const submit = document.querySelector(".submit")
const notes = document.querySelector(".listNotes")
const filterButtons = document.querySelectorAll(".btnfilter")

document.addEventListener("DOMContentLoaded", () => {
  const savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
    notes.innerHTML = savedNotes;
  }
});

submit.addEventListener("click", (event) => {
  event.preventDefault();

  if (task.value.trim() !== "") {
    const newNote = `<li class="liNote">
      <button class="btndelate">X</button>
      <button class="btnedit">✏️</button>
      <button class="btnstatus pendiente" style="background-color: red; color: white;">Pendiente</button>
      <span class="textNotes">${task.value}</span>
    </li>`;
    notes.innerHTML += newNote;     

    localStorage.setItem("notes", notes.innerHTML);
    task.value = "";
  }
});

notes.addEventListener("click", (event) => {
  if (event.target.classList.contains("btndelate")) {
    const liAEliminar = event.target.parentElement;
    liAEliminar.remove();
    localStorage.setItem("notes", notes.innerHTML);
  }
  
  if (event.target.classList.contains("btnedit")) {
    const liEdit = event.target.parentElement.querySelector(".textNotes");

    if (liEdit.contentEditable === "true") {
      liEdit.contentEditable = "false";
      event.target.textContent = "✏️";
      localStorage.setItem("notes", notes.innerHTML);
    } else {
      liEdit.contentEditable = "true";
      liEdit.focus();
      event.target.textContent = "💾"; 
    }
  }

  if (event.target.classList.contains("btnstatus")) {
    const btn = event.target;
    if (btn.classList.contains("pendiente")) {
      btn.classList.remove("pendiente");
      btn.classList.add("completada");
      btn.textContent = "Completada";
      btn.style.backgroundColor = "green";
    } else {
      btn.classList.remove("completada");
      btn.classList.add("pendiente");
      btn.textContent = "Pendiente";
      btn.style.backgroundColor = "red";
    }
    localStorage.setItem("notes", notes.innerHTML);
  }
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filterValue = button.getAttribute("data-filter");
    const allNotes = notes.querySelectorAll(".liNote");

    allNotes.forEach(note => {
      const statusBtn = note.querySelector(".btnstatus");
      
      if (filterValue === "todas") {
        note.style.display = "flex";
      } else if (filterValue === "pendientes" && statusBtn.classList.contains("pendiente")) {
        note.style.display = "flex";
      } else if (filterValue === "completadas" && statusBtn.classList.contains("completada")) {
        note.style.display = "flex";
      } else {
        note.style.display = "none";
      }
    });
  });
});