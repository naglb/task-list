// targeting the id's of html elements
const taskInput = document.querySelector("#task-box");
const addButton = document.querySelector("#add-button");
const taskList = document.querySelector("#task-list");

console.log("Initial elements:", { taskInput, addButton, taskList });


// Function to create a new task
function createTask() {
    console.log("createTask function called");
    const taskText = taskInput.value.trim();
    console.log("Task text:", taskText);
    if (taskText !== "") {
        addTaskToList(taskText);
        taskInput.value = "";
    }
}

// Event listener for the 'Add' button
addButton.addEventListener("click", createTask);

// Adding the created task to a list of tasks
function addTaskToList(text) {
    console.log("addTask function called");
    const taskItem = document.createElement('div');
    taskItem.className = 'current-tasks';
    taskItem.innerHTML = `
        <input type="checkbox" class="done-btn">
        <span class="task-text">${text}</span>
        <button class="delete-btn">Delete</button>
        <button class="edit-btn">Edit</button>
    `;
    
    taskList.appendChild(taskItem);

    // Add event listeners to the new buttons
    taskItem.querySelector('.delete-btn').addEventListener('click', deleteTask);
    taskItem.querySelector('.done-btn').addEventListener('click', doneTask);
    taskItem.querySelector('.edit-btn').addEventListener('click', editTask);
}

// deletes the selected task + the div it's in
function deleteTask() {
    console.log("deleteTask function called")
    // adding confirm deletion for tasks
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete){
        this.closest('.current-tasks').remove();
        console.log("Task deleted");
    }
}

// editing a task
function editTask() {
    console.log("editTask func called");
    const taskItem = this.closest('.current-tasks');
    const taskText = taskItem.querySelector('.task-text');
    const checkbox = taskItem.querySelector('.done-btn');

    // Check if the task is completed (checkbox is checked)
    if (checkbox.checked) {
        console.log("Cannot edit completed task");
        return; // Exit the function early if the task is completed
    }

    const currentText = taskText.textContent;

    // Create an input field
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = currentText;
    inputField.className = 'edit-input';

    // Replace the task text with the input field
    taskText.replaceWith(inputField);
    inputField.focus();

    // Add event listener for when editing is done (e.g., pressing Enter)
    inputField.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            finishEditing(inputField, taskText);
        }
    });

    // Add event listener for losing focus (clicking outside)
    inputField.addEventListener('blur', function() {
        finishEditing(inputField, taskText);
    });
}

// Helper function to finish editing
function finishEditing(inputField, taskText) {
    const newText = inputField.value.trim();
    if (newText) {
        const newTaskText = document.createElement('span');
        newTaskText.className = 'task-text';
        newTaskText.textContent = newText;
        inputField.replaceWith(newTaskText);
    } else {
        inputField.replaceWith(taskText);
    }
}

// Function to mark a task as done
function doneTask() {
    const taskItem = this.closest('.current-tasks');
    const taskText = taskItem.querySelector('.task-text');
    const editBtn = taskItem.querySelector('.edit-btn');

    if (this.checked) {
        taskText.style.textDecoration = 'line-through';
        editBtn.disabled = true; // Disable the edit button
    } else {
        taskText.style.textDecoration = 'none';
        editBtn.disabled = false; // Enable the edit button
    }
}

// Event listener for the Enter key
taskInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        createTask();
    }
});
