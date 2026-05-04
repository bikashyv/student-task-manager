// filter.js — Developed by Dilip (Software Developer)

let activeSearch = "";
let activeMember = "";
let activeStatus = "";

function getFilteredTasks() {
  return tasks.filter(function (task) {

    const matchesSearch =
      activeSearch === "" ||
      task.title.toLowerCase().includes(activeSearch.toLowerCase());

    const matchesMember =
      activeMember === "" ||
      task.assignedTo === parseInt(activeMember);

    const matchesStatus =
      activeStatus === "" ||
      task.status === activeStatus;

    return matchesSearch && matchesMember && matchesStatus;
  });
}

function render() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  const filtered = getFilteredTasks();
  const resultLabel = document.getElementById("filterResult");

  const filtersActive = activeSearch !== "" || activeMember !== "" || activeStatus !== "";
  if (resultLabel) {
    if (filtersActive) {
      resultLabel.textContent =
        filtered.length + " of " + tasks.length + " task(s) shown";
      resultLabel.style.color = filtered.length === 0 ? "#e74c3c" : "#27ae60";
    } else {
      resultLabel.textContent = "";
    }
  }

  if (filtered.length === 0) {
    const li = document.createElement("li");
    li.textContent = filtersActive
      ? "No tasks match your search or filter."
      : "No tasks yet. Add one above.";
    li.style.color = "#999";
    li.style.textAlign = "center";
    list.appendChild(li);
  } else {
    filtered.forEach(function (task) {
      const member = members.find(function (m) {
        return m.id === task.assignedTo;
      }) || { name: "Unknown", role: "Unknown" };

      const li = document.createElement("li");

      if (task.status === "Done") {
        li.style.textDecoration = "line-through";
        li.style.opacity = "0.6";
      }

      // Highlight search match in task title
      let displayTitle = task.title;
      if (activeSearch !== "") {
        const regex = new RegExp("(" + escapeRegex(activeSearch) + ")", "gi");
        displayTitle = task.title.replace(regex, "<mark>$1</mark>");
      }

      li.innerHTML =
        "<span class='task-title'>" + displayTitle + "</span>" +
        " &rarr; " + member.name + " (" + member.role + ")" +
        " <span class='status-badge " + getStatusClass(task.status) + "'>" + task.status + "</span> ";

      const statusBtn = document.createElement("button");
      statusBtn.textContent = "Update Status";
      statusBtn.style.marginLeft = "10px";
      statusBtn.onclick = (function (id) {
        return function () { changeStatus(id); };
      })(task.id);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.style.marginLeft = "5px";
      deleteBtn.onclick = (function (id) {
        return function () { deleteTask(id); };
      })(task.id);

      li.appendChild(statusBtn);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  }

  const todo     = tasks.filter(function (t) { return t.status === "To Do"; }).length;
  const progress = tasks.filter(function (t) { return t.status === "In Progress"; }).length;
  const done     = tasks.filter(function (t) { return t.status === "Done"; }).length;

  document.getElementById("todoCount").textContent     = "To Do: " + todo;
  document.getElementById("progressCount").textContent = "In Progress: " + progress;
  document.getElementById("doneCount").textContent     = "Done: " + done;
  document.getElementById("totalCount").textContent    = "Total Tasks: " + tasks.length;
}


function getStatusClass(status) {
  if (status === "To Do")       return "status-todo";
  if (status === "In Progress") return "status-progress";
  return "status-done";
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function populateFilterMembers() {
  const select = document.getElementById("filterMember");
  if (!select) return;

  members.forEach(function (member) {
    const option = document.createElement("option");
    option.value = member.id;
    option.textContent = member.name + " (" + member.role + ")";
    select.appendChild(option);
  });
}


function initFilter() {
  const searchInput    = document.getElementById("searchInput");
  const filterMember   = document.getElementById("filterMember");
  const filterStatus   = document.getElementById("filterStatus");
  const clearFilterBtn = document.getElementById("clearFilterBtn");

  if (!searchInput || !filterMember || !filterStatus) {
    console.warn("filter.js: filter UI elements not found in HTML.");
    return;
  }

  populateFilterMembers();

  searchInput.addEventListener("input", function () {
    activeSearch = searchInput.value.trim();
    render();
  });

  filterMember.addEventListener("change", function () {
    activeMember = filterMember.value;
    render();
  });

  filterStatus.addEventListener("change", function () {
    activeStatus = filterStatus.value;
    render();
  });

  clearFilterBtn.addEventListener("click", function () {
    activeSearch = "";
    activeMember = "";
    activeStatus = "";
    searchInput.value = "";
    filterMember.value = "";
    filterStatus.value = "";
    render();
  });
}

document.addEventListener("DOMContentLoaded", initFilter);