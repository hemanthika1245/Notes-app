const titleinput=document.getElementById("title");
let editId=null;
const contentinput=document.getElementById("content");
const addBtn=document.getElementById("addBTN");
addBtn.addEventListener("click",addNote);
async function addNote(){
    const title=titleinput.value;
    const content=contentinput.value;
     if(editId===null){
        await fetch("/notes",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({title,content})
        });
        editId=null;
        addBtn.innerHTML="ADD NOTE";
     }
     titleinput.value="";
     contentinput.value="";
     loadNotes();
    
    
}
async function loadNotes(){
    const response=await fetch("/notes");
    const notes=await response.json();
    const container=document.getElementById("notesContainer");
    container.innerHTML="";
    notes.forEach(note=>{
        container.innerHTML+=`
          <div class="note">
            <h3>📌${note.title}</h3>
            <p>${note.content}</p>
            
            <button onclick="editNote(${note.id},'${note.title}','${note.content}')">✏️Edit</button>
            <button onclick="deleteNotes(${note.id})">🗑 Delete</button>
          </div>`

    });
}

async function deleteNotes(id){
    await fetch(`/notes/${id}`,{
        method:"DELETE"
    });
    loadNotes();
}
function editNote(id,title,content){
    titleinput.value=title;
    contentinput.value=content;
    editID=id;
    addBtn.innerHTML="update Note"
}

loadNotes();
