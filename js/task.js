
let loggedUser = localStorage.getItem("user") || "";

// LOGIN
function loginUser() {
  const name = document.getElementById("usernameInput").value.trim();
  if (!name) return alert("Enter name");

  localStorage.setItem("user", name);
  loggedUser = name;
  showApp();
}

function showApp() {
  if (loggedUser) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("app").style.display = "block";
    document.getElementById("welcomeText").textContent = "👤 " + loggedUser;
  }
}

function logout() {
  localStorage.removeItem("user");
  location.reload();
}

// ADD TASK
function addTask() {
  const t = document.getElementById("taskInput").value;
  const m = document.getElementById("memberSelect").value;
  const p = document.getElementById("prioritySelect").value;
  const d = document.getElementById("dueDate").value;

  if (!t || !m || !p) return alert("Fill all fields");

  tasks.push({
    id: Date.now(),
    title: t,
    assignedTo: parseInt(m),
    status: "To Do",
    priority: p,
    dueDate: d
  });

  saveTasks();
  document.getElementById("taskInput").value = "";
  render();
}

// CHANGE STATUS (SIMPLE BUTTON)
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

// DELETE
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

// RENDER
function render(filtered = tasks) {
  const todo = document.getElementById("todoList");
  const progress = document.getElementById("progressList");
  const done = document.getElementById("doneList");

  todo.innerHTML = "";
  progress.innerHTML = "";
  done.innerHTML = "";

  filtered.forEach(task => {
    const member = members.find(m => m.id === task.assignedTo);

    const li = document.createElement("li");

    // overdue highlight
    if (task.dueDate && new Date(task.dueDate) < new Date()) {
      li.classList.add("overdue");
    }

    li.innerHTML = `
      <strong>${task.title}</strong>
      <small>${member?.name}</small>
      <small>${task.priority} • ${task.dueDate || ""}</small>
    `;

    // ➡️ STATUS BUTTON
    const moveBtn = document.createElement("button");
    moveBtn.textContent = "➡";
    moveBtn.onclick = () => changeStatus(task.id);

    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";
    delBtn.onclick = () => deleteTask(task.id);

    li.appendChild(moveBtn);
    li.appendChild(delBtn);

    if (task.status === "To Do") todo.appendChild(li);
    else if (task.status === "In Progress") progress.appendChild(li);
    else done.appendChild(li);
  });

  updateDashboard();
}

// DASHBOARD
function updateDashboard() {
  document.getElementById("todoCount").textContent =
    tasks.filter(t => t.status === "To Do").length;

  document.getElementById("progressCount").textContent =
    tasks.filter(t => t.status === "In Progress").length;

  document.getElementById("doneCount").textContent =
    tasks.filter(t => t.status === "Done").length;

  document.getElementById("totalCount").textContent = tasks.length;
}

// SEARCH
function searchTasks() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  render(tasks.filter(t => t.title.toLowerCase().includes(q)));
}

// MEMBERS
function populateMembers() {
  const s = document.getElementById("memberSelect");
  s.innerHTML = '<option value="">Assign</option>';

  members.forEach(m => {
    const o = document.createElement("option");
    o.value = m.id;
    o.textContent = m.name;
    s.appendChild(o);
  });
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  populateMembers();
  loadTasks();
  showApp();
  render();

  document.getElementById("addBtn").onclick = addTask;
});

