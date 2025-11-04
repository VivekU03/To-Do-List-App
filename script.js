const inpBox = document.getElementById("taskInp");
const listContainer = document.getElementById("listWrapper");
const errorMsg = document.getElementById("error-msg");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");


function taskAdd() {
  const task = inpBox.value.trim();
  if (!task) {
    errorMsg.textContent = "Please enter your task !";
    return;
  }

  errorMsg.textContent = "";

  const listItem = document.createElement("li");

  listItem.innerHTML = `
        <label>
            <input type="checkbox">
            <span class="task-text">${task}</span>
        </label>
        <div class="btn-wrapper">
            <span class="edit-btn btn1">Edit</span>
            <span class="dlt-btn btn2">Delete</span>
        </div>
    
    `;

  listContainer.appendChild(listItem);
  inpBox.value = "";

  const checkBox = listItem.querySelector("input");
  const editBtn = listItem.querySelector(".edit-btn");
  const dltBtn = listItem.querySelector(".dlt-btn");
  const taskSpan = listItem.querySelector("span");

  checkBox.addEventListener("click", function () {
    listItem.classList.toggle("completed", checkBox.checked);
    counterUpdate();
  });

  editBtn.addEventListener("click", function () {
    const update = prompt("Edit Task:", taskSpan.textContent);
    if (update !== null) {
      taskSpan.textContent = update;
      listItem.classList.remove("completed");
      checkBox.checked = false;
      counterUpdate();
    }
  });

  dltBtn.addEventListener("click", function(){
    if(confirm("Do you really want to delete this task?")){
        listItem.remove();
        counterUpdate();
    }
  })

  counterUpdate();
  
}

function counterUpdate() {
    const completedTask = listContainer.querySelectorAll(".completed").length;
    const uncompletedTask = listContainer.querySelectorAll(
      "li:not(.completed)"
    ).length;

    completedCounter.textContent = completedTask;
    uncompletedCounter.textContent = uncompletedTask;
    
}
