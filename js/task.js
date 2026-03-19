function addTask() {
  const input = document.getElementById("taskInput");
  const memberSelect = document.getElementById("memberSelect");

  if (input.value.trim() === "" || memberSelect.value === "") return;

  const task = {
    id: Date.now(),
    title: input.value,
    assignedTo: parseInt(memberSelect.value),
    status: "To Do"
  };

  tasks.push(task);
   alert("Task added successfully!");
  saveTasks();
  input.value = "";
  memberSelect.value = "";
  render();
}

function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks();
  render();
}
function markAllDone() {
  tasks = tasks.map(task => ( { 
    ...task,
    status: "Done"
}));

saveTasks();
render();
}

function changeStatus(taskId) {
  tasks = tasks.map(task => {
    if (task.id === taskId) {
      if (task.status === "To Do") task.status = "In Progress";
      else if (task.status === "In Progress") task.status = "Done";
      else task.status = "To Do";
    }
    return task;
  });

  saveTasks();
  render();
}

function render() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const member = members.find(m => m.id === task.assignedTo) || {
      name: "Unknown",
      role: "Unknown"
    };

    const li = document.createElement("li");

    li.textContent =
      task.title +
      " -> " +
      member.name +
      " (" +
      member.role +
      ") [" +
      task.status +
      "] ";

    const statusBtn = document.createElement("button");
    statusBtn.textContent = "Change Status";
    statusBtn.style.marginLeft = "10px";
    statusBtn.onclick = () => changeStatus(task.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "5px";
    deleteBtn.onclick = () => deleteTask(task.id);

    li.appendChild(statusBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  // Dashboard calculations
  const todo = tasks.filter(t => t.status === "To Do").length;
  const progress = tasks.filter(t => t.status === "In Progress").length;
  const done = tasks.filter(t => t.status === "Done").length;

  document.getElementById("todoCount").textContent = "To Do: " + todo;
  document.getElementById("progressCount").textContent = "In Progress: " + progress;
  document.getElementById("doneCount").textContent = "Done: " + done;
  document.getElementById("totalCount").textContent = "Total Tasks: " + tasks.length;
}

function populateMembers() {
  const select = document.getElementById("memberSelect");
  select.innerHTML = '<option value="">Assign to...</option>';

  members.forEach(member => {
    const option = document.createElement("option");
    option.value = member.id;
    option.textContent = member.name + " (" + member.role + ")";
    select.appendChild(option);
  });
}

// Initialize
populateMembers();
render();

document.getElementById("addBtn").addEventListener("click", addTask);