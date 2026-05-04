
let members = [
  { id: 1, name: "Bikash", role: "Database Analyst" },
  { id: 2, name: "Himanshu", role: "Project Manager" },
  { id: 3, name: "Suman", role: "Developer" },
  { id: 4, name: "Dilip", role: "Developer" },
  { id: 5, name: "Manoj", role: "Database Analyst" },
  { id: 6, name: "Keshang", role: "Business Analyst" },
  { id: 7, name: "Sumit", role: "Security Analyst" },
  { id: 8, name: "Pradip", role: "Security Analyst" }

];

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
}

