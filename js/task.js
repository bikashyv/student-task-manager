function addTask() {
  const input = document.getElementById("taskInput");
  const memberSelect = document.getElementById("memberSelect");
  const prioritySelect = document.getElementById("prioritySelect");
  const dueDate = document.getElementById("dueDate");

  if (
    input.value.trim() === "" ||
    memberSelect.value === "" ||
    prioritySelect.value === ""
  ) {
    alert("Fill all fields");
    return;
  }

  const task = {
    id: Date.now(),
    title: input.value,
    assignedTo: parseInt(memberSelect.value),
    status: "To Do",
    priority: prioritySelect.value,
    dueDate: dueDate.value
  };

  tasks.push(task);
  saveTasks();

  input.value = "";
  memberSelect.value = "";
  prioritySelect.value = "";
  dueDate.value = "";

  render();
}

function deleteTask(id) {
  if (!confirm("Delete task?")) return;
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

function changeStatus(id) {
  tasks = tasks.map(t => {
    if (t.id === id) {
      if (t.status === "To Do") t.status = "In Progress";
      else if (t.status === "In Progress") t.status = "Done";
      else t.status = "To Do";
    }
    return t;
  });

  saveTasks();
  render();
}

function render(filteredTasks = tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  if (filteredTasks.length === 0) {
    list.innerHTML = "<p>No tasks yet</p>";
    return;
  }

  filteredTasks.forEach(task => {
    const member = members.find(m => m.id === task.assignedTo);

    const li = document.createElement("li");
    li.className = task.status.toLowerCase().replace(" ", "");

    li.innerHTML = `
      <div>
        <strong>${task.title}</strong><br>
        👤 ${member.name} (${member.role})<br>
        📅 ${task.dueDate || "No date"}<br>
        🔥 <span class="${task.priority.toLowerCase()}">${task.priority}</span>
      </div>
      <div>
        <strong>[${task.status}]</strong>
      </div>
    `;

    const btn1 = document.createElement("button");
    btn1.textContent = "Status";
    btn1.onclick = () => changeStatus(task.id);

    const btn2 = document.createElement("button");
    btn2.textContent = "Delete";
    btn2.onclick = () => deleteTask(task.id);

    li.appendChild(btn1);
    li.appendChild(btn2);
    list.appendChild(li);
  });

  updateDashboard();
}

function updateDashboard() {
  document.getElementById("todoCount").textContent =
    tasks.filter(t => t.status === "To Do").length;

  document.getElementById("progressCount").textContent =
    tasks.filter(t => t.status === "In Progress").length;

  document.getElementById("doneCount").textContent =
    tasks.filter(t => t.status === "Done").length;

  document.getElementById("totalCount").textContent = tasks.length;

  const completed = tasks.filter(t => t.status === "Done").length;
  const percent = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  document.getElementById("completion").textContent = percent + "%";
}

function searchTasks() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(search)
  );
  render(filtered);
}

function populateMembers() {
  const select = document.getElementById("memberSelect");
  select.innerHTML = '<option value="">Assign to...</option>';

  members.forEach(m => {
    const option = document.createElement("option");
    option.value = m.id;
    option.textContent = `${m.name} (${m.role})`;
    select.appendChild(option);
  });
}

// INIT
populateMembers();
loadTasks();
render();

document.getElementById("addBtn").addEventListener("click", addTask);