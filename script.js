let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const newTaskText = document.getElementById("newTaskInput").value;
    if (newTaskText.trim() !== "") {
        tasks.push({ text: newTaskText, completed: false });
        saveTasks();
        renderTasks();
        document.getElementById("newTaskInput").value = "";
    }
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function hideCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

function renderTasks() {
    const taskListContainer = document.getElementById("taskList");
    taskListContainer.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("li");
        taskElement.textContent = task.text;
        if (task.completed) {
            taskElement.classList.add("completed");
        }

        const actions = document.createElement("div");
        actions.classList.add("actions");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => editTask(index);
        actions.appendChild(editButton);

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.onclick = () => toggleTaskCompletion(index);
        actions.appendChild(completeButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteTask(index);
        actions.appendChild(deleteButton);

        taskElement.appendChild(actions);
        taskListContainer.appendChild(taskElement);
    });

    const hideCompletedButton = document.createElement("button");
    hideCompletedButton.textContent = "Hide Completed";
    hideCompletedButton.onclick = hideCompletedTasks;
    taskListContainer.appendChild(hideCompletedButton);
}

renderTasks();
