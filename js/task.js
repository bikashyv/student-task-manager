// 👨‍💻 Software Developer Contributions
// Sandesh and Dilip worked on frontend interaction, task management logic,
// responsive UI improvements, task rendering, and dynamic user experience enhancements.

let loggedUser = localStorage.getItem("user") || "";

// LOGIN
function loginUser() {
  const name = document.getElementById("usernameInput").value.trim();

  if (!name) return alert("Enter name");

  if (name.length < 2) {
    alert("Name must be at least 2 characters");
    return;
  }

  localStorage.setItem("user", name);
  loggedUser = name;
  showApp();
}

function showApp() {
  if (loggedUser) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("app").style.display = "block";
    document.getElementById("welcomeText").textContent =
      "👤 Welcome, " + loggedUser;
  } else {
    document.getElementById("loginPage").style.display = "block";
    document.getElementById("app").style.display = "none";
  }
}

function logout() {
  localStorage.removeItem("user");
  location.reload();
}

// ADD TASK
function addTask() {

  const t = document.getElementById("taskInput").value.trim();
  const m = document.getElementById("memberSelect").value;
  const p = document.getElementById("prioritySelect").value;
  const d = document.getElementById("dueDate").value;

  // 🔐 Security validation
  if (!t || !m || !p) {
    alert("All fields are required");
    return;
  }

  if (t.length < 3) {
    alert("Task must be at least 3 characters");
    return;
  }

  // Create task object
  tasks.push({
    id: Date.now(),
    title: t,
    assignedTo: parseInt(m),
    status: "To Do",
    priority: p,
    dueDate: d,
    createdBy: loggedUser
  });

  saveTasks();

  // Clear input after task creation
  document.getElementById("taskInput").value = "";

  render();
}

// CHANGE TASK STATUS
function changeStatus(id) {

  tasks = tasks.map(t => {

    if (t.id === id) {

      // Workflow logic
      if (t.status === "To Do") {
        t.status = "In Progress";

      } else if (t.status === "In Progress") {
        t.status = "Done";

      } else {
        t.status = "To Do";
      }
    }

    return t;
  });

  saveTasks();
  render();
}

// DELETE TASK
function deleteTask(id) {

  tasks = tasks.filter(t => t.id !== id);

  saveTasks();
  render();
}

// RENDER TASKS
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

    // Highlight overdue tasks
    if (task.dueDate && new Date(task.dueDate) < new Date()) {
      li.classList.add("overdue");
    }

    li.innerHTML = `
      <strong>${task.title}</strong>
      <small>👤 Assigned to: ${member?.name}</small>
      <small>🧑 Created by: ${task.createdBy || "Unknown"}</small>
      <small>📌 Priority: ${task.priority}</small>
      <small>📅 Due Date: ${task.dueDate || "No date"}</small>
    `;

    // MOVE BUTTON
    const moveBtn = document.createElement("button");
    moveBtn.textContent = "Move ➡";
    moveBtn.onclick = () => changeStatus(task.id);

    // DELETE BUTTON
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteTask(task.id);

    li.appendChild(moveBtn);
    li.appendChild(delBtn);

    // Render task into correct column
    if (task.status === "To Do") {

      todo.appendChild(li);

    } else if (task.status === "In Progress") {

      progress.appendChild(li);

    } else {

      done.appendChild(li);
    }
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

  document.getElementById("totalCount").textContent =
    tasks.length;
}

// SEARCH TASKS
function searchTasks() {

  const q =
    document.getElementById("searchInput").value.toLowerCase();

  render(
    tasks.filter(t =>
      t.title.toLowerCase().includes(q)
    )
  );
}

// POPULATE TEAM MEMBERS
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