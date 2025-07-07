// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
/*const TopicList = document.querySelector(".TopicList");*/
const deleteAllBtn = document.querySelector(".footer button");

// onkeyup event
inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; //getting user entered value
  if(userEnteredValue.trim() != 0){ //if the user value isn't only spaces
    addBtn.classList.add("active"); //active the add button
  }else{
    addBtn.classList.remove("active"); //unactive the add button
  }
}

showTasks(); //calling showTask function
/*showTasks1(); //calling showTask function*/
addBtn.onclick = () => {
  let userEnteredValue = inputBox.value.trim();
  if (userEnteredValue === "") return;

  let getLocalStorageData = localStorage.getItem("New Todo");
  let listArray = getLocalStorageData ? JSON.parse(getLocalStorageData) : [];

  // Add task as object with text and checkbox state
  listArray.push({ text: userEnteredValue, checked: false });

  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();

  addBtn.classList.remove("active");
  inputBox.value = "";
};

function showTasks() {
  let getLocalStorageData = localStorage.getItem("New Todo");
  let listArray = getLocalStorageData ? JSON.parse(getLocalStorageData) : [];

  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length;

  if (listArray.length > 0) {
    deleteAllBtn.classList.add("active");
  } else {
    deleteAllBtn.classList.remove("active");
  }

  let newLiTag = "";
  listArray.forEach((element, index) => {
    const isChecked = element.checked ? "checked" : "";
    newLiTag += `
      <li>
        <input type="checkbox" name="height" value="1" ${isChecked} onchange="toggleCheckbox(${index})">
        ${element.text}
        <span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span>
      </li>`;
  });

  todoList.innerHTML = newLiTag;
  inputBox.value = "";
}

// delete task function
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = ()=>{
  let getLocalStorageData = localStorage.getItem("New Todo"); 
  if(getLocalStorageData == null){ 
    listArray = []; 
  }else{
    listArray = JSON.parse(getLocalStorageData);  
    listArray = []; 
  }
  localStorage.setItem("New Todo", JSON.stringify(listArray)); 
  showTasks(); 
}

function toggleCheckbox(index) {
  let getLocalStorageData = localStorage.getItem("New Todo");
  let listArray = JSON.parse(getLocalStorageData);

  listArray[index].checked = !listArray[index].checked;

  localStorage.setItem("New Todo", JSON.stringify(listArray));
}





