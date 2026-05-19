 // Database Analyst Contribution
 // This file defines the system data structure for members and task storage.
 // localStorage is used to simulate database persistence within the browser.

 // Team member data structure used for task assignment
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


// Task data retrieved from browser localStorage
// Each task contains:
// id -> unique task identifier
// title -> task name
// assignedTo -> assigned team member ID
// status -> To Do / In Progress / Done
// priority -> task priority level
// dueDate -> task deadline

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Save tasks into localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Load tasks from localStorage
function loadTasks() {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
}