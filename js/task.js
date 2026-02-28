function addTask() {
  const input = document.getElementById("taskInput");
  const memberSelect = document.getElementById("memberSelect");

  if (input.value.trim() === "" || memberSelect.value === "") return;

  const task = {
    id: Date.now(), // unique ID
    title: input.value,
    assignedTo: parseInt(memberSelect.value)
  };

  tasks.push(task);
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

function render() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const member = members.find(m => m.id === task.assignedTo);

    const li = document.createElement("li");
    li.textContent = `${task.title} → ${member.name} (${member.role}) `;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = () => deleteTask(task.id);

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function populateMembers() {
  const select = document.getElementById("memberSelect");

  members.forEach(member => {
    const option = document.createElement("option");
    option.value = member.id;
    option.textContent = `${member.name} (${member.role})`;
    select.appendChild(option);
  });
}

populateMembers();
render();