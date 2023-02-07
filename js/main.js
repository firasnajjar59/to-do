// vars
let task = [];
let checked = [];
let idForfunction = "";

// elments in html
let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let grid = document.getElementById("grid");
let overlay = document.getElementById("overlay");
let clrdiv = document.getElementById("clrdiv");
let editdiv = document.getElementById("editdiv");
let editInput = document.getElementById("editInput");
let settings = document.getElementById("settings");
let bgColor= document.getElementById("bg-color");
let primaryColor= document.getElementById("primary-color");
let secondColor= document.getElementById("second-color");
let borderStyle= document.getElementById("borderStyle");
let fontSize= document.getElementById("font-size");


// add addEventListener to load the finction onload
document.addEventListener("load", onLoad());

// onload function
function onLoad() {
  if (
    localStorage.getItem("localTask") == null ||
    localStorage.getItem("localTask") ==
      '<div class="task" id=""><p> no tasks</p></div>'
  ) {
    // set task local storage
    localStorage.setItem(
      "localTask",
      '<div class="task" id=""><p> no tasks</p></div>'
    );
    localStorage.setItem("localChecked", false);
    //display function
    grid.innerHTML = localStorage.getItem("localTask");
  } else {
    task = localStorage.getItem("localTask").split(",");
    checked = localStorage.getItem("localChecked").split(",");

    // add display function
    displayArray();
  }
  // 
  if(localStorage.getItem("bg")==null)
  {
    // set settings local storage
    localStorage.setItem("bg",bgColor.value)
    localStorage.setItem("cP",primaryColor.value)
    localStorage.setItem("cS",secondColor.value)
    localStorage.setItem("bS",borderStyle.value)
    localStorage.setItem("fs",fontSize.value)
  }else{
   document.documentElement.style.setProperty("--border-style",localStorage.getItem("bS"))
    document.documentElement.style.setProperty("--bg-color",localStorage.getItem("bg"))
    document.documentElement.style.setProperty("--secondary-color",localStorage.getItem("cS"))
    document.documentElement.style.setProperty("--site-size",localStorage.getItem("fs"))
    document.documentElement.style.setProperty("--primary-color",localStorage.getItem("cP"))
    bgColor.value= localStorage.getItem("bg");
    primaryColor.value= localStorage.getItem("cP");
    secondColor.value= localStorage.getItem("cS");
    borderStyle.value= localStorage.getItem("bS");
    fontSize.value= localStorage.getItem("fs");
  }
  console.log(task, checked);
}
// function add task task array
function addTaskToArray() {
  // unshift new task to the array and reset the input value
  task.unshift(taskInput.value);
  taskInput.value = "";
  // unshift new task to the array and reset the input value
  checked.unshift("false");

  // display function
  displayArray();

  // save the new array to local storage
  localStorage.setItem("localTask", task);
  localStorage.setItem("localChecked", checked);
}

// function to display array
function displayArray() {
  let arrayLength = task.length;
  grid.innerHTML = "";
  for (let i = 0; i < arrayLength; i++) {
    let trueOrfalse = "";
    let style = "";
    
    if (checked[i] == "true") {
      trueOrfalse = "checked";
      style = 'style="background-color: green; color: white; text-decoration: line-through;"';
      
    }
    grid.innerHTML += `
        <div class="task" id="${i}">
          
          <p ${style}><input ${trueOrfalse} onclick="checkedfun(${i})" type="checkbox" id="check${i}"> ${task[i]}</p>
          <button onclick="sureEdit(${i})"><span class="material-symbols-sharp"> border_color </span></button>
          <button onclick="sureClear(${i})"><span class="material-symbols-sharp"> delete </span></button>
        </div>
        `;
  }
}

//function that show the popup to delete task
function sureClear(a) {
  overlay.removeAttribute("class", "hidden");
  overlay.setAttribute("class", "overlay");
  clrdiv.removeAttribute("class", "hidden");
  clrdiv.setAttribute("class", "sureClr");
  idForfunction = a;
}
// clr function submit the delete
function clearTask() {
  task.splice(idForfunction, 1);
  // save the new array to local storage
  localStorage.setItem("localTask", task);
  if (localStorage.getItem("localTask") == "") {
    localStorage.setItem(
      "localTask",
      '<div class="task" id=""><p> no tasks</p></div>'
    );
    location.reload();
  }
  overlay.removeAttribute("class", "overlay");
  overlay.setAttribute("class", "hidden");
  clrdiv.removeAttribute("class", "sureClr");
  clrdiv.setAttribute("class", "hidden");
  // display function
  displayArray();
  idForfunction = "";
}
//function to close the popup without deleted
function clearTaskNo() {
  overlay.removeAttribute("class", "overlay");
  overlay.setAttribute("class", "hidden");
  clrdiv.removeAttribute("class", "sureClr");
  clrdiv.setAttribute("class", "hidden");
  idForfunction = "";
}
// edit function submit edit
function editTask() {
  task[idForfunction] = editInput.value;
  editInput.value = "";
  // save the new array to local storage
  localStorage.setItem("localTask", task);
  // display function
  displayArray();
  //
  overlay.removeAttribute("class", "overlay");
  overlay.setAttribute("class", "hidden");
  editdiv.removeAttribute("class", "edit");
  editdiv.setAttribute("class", "hidden");
  //
  idForfunction = "";
}
// function that open popup to edit the task
function sureEdit(a) {
  overlay.removeAttribute("class", "hidden");
  overlay.setAttribute("class", "overlay");
  editdiv.removeAttribute("class", "hidden");
  editdiv.setAttribute("class", "edit");
  idForfunction = a;
  editInput.value = task[a];
  console.log(a);
}
//   function that edit the task
function editTaskNo() {
  overlay.removeAttribute("class", "overlay");
  overlay.setAttribute("class", "hidden");
  editdiv.removeAttribute("class", "edit");
  editdiv.setAttribute("class", "hidden");
  idForfunction = "";
}

//
function checkedfun(a) {
  let check = document.getElementById(`check${a}`);
  if (checked[a] == "false") {
    checked[a] = "true";
    check.checked = "true";
  } else {
    checked[a] = "false";
    check.checked = "false";
  }
  localStorage.setItem("localChecked", checked);
  displayArray();
}
// function exit fron settings tab
function settingsExit(){
  overlay.removeAttribute("class", "overlay");
  overlay.setAttribute("class", "hidden");
  settings.removeAttribute("class", "settings");
  settings.setAttribute("class", "hidden");
}
// function to open settings div
function openSettingsDiv(){
  overlay.removeAttribute("class", "hidden");
  overlay.setAttribute("class", "overlay");
  settings.removeAttribute("class", "hidden");
  settings.setAttribute("class", "settings");
}

// function to change primary color
function colorPrimaryChange(){
document.documentElement.style.setProperty("--primary-color",primaryColor.value)
}
// function to change secondary color
function colorSecondaryChange(){
document.documentElement.style.setProperty("--secondary-color",secondColor.value)
}
// function to change bg color
function colorBgChange(){
document.documentElement.style.setProperty("--bg-color",bgColor.value)
}
// function to change border style
function borderStyleChange(){
document.documentElement.style.setProperty("--border-style",borderStyle.value)
}
// function to change website size
function fontSizeChange(){
document.documentElement.style.setProperty("--site-size",fontSize.value)
}
// function to submit changes and save them
function submitSettings(){
    localStorage.setItem("bg",bgColor.value);
    localStorage.setItem("cP",primaryColor.value);
    localStorage.setItem("cS",secondColor.value);
    localStorage.setItem("bS",borderStyle.value);
    localStorage.setItem("fs",fontSize.value);
    
    settingsExit();
}