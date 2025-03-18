// Selectors
const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');

// Event Listeners
toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', handleTodoActions);
document.addEventListener('DOMContentLoaded', loadTodos);
standardTheme.addEventListener('click', () => changeTheme('standard'));
lightTheme.addEventListener('click', () => changeTheme('light'));
darkerTheme.addEventListener('click', () => changeTheme('darker'));

// Load saved theme or default to 'standard'
let savedTheme = localStorage.getItem('savedTheme') || 'standard';
changeTheme(savedTheme);

// Functions

/**
 * Adds a new todo item to the list.
 * @param {Event} event - The click event.
 */
function addToDo(event) {
    event.preventDefault();

    const todoText = toDoInput.value.trim();
    if (!todoText) {
        alert('You must write something!');
        return;
    }

    // Create and append the todo item
    const todoElement = createTodoElement(todoText);
    toDoList.appendChild(todoElement);

    // Save to localStorage and clear input
    saveTodoToLocalStorage(todoText);
    toDoInput.value = '';
}

/**
 * Handles delete and check actions for todo items.
 * @param {Event} event - The click event.
 */
function handleTodoActions(event) {
    const target = event.target;
    const todoElement = target.closest('.todo');

    if (target.classList.contains('delete-btn')) {
        // Remove todo with animation
        todoElement.classList.add('fall');
        todoElement.addEventListener('transitionend', () => {
            todoElement.remove();
            removeTodoFromLocalStorage(todoElement);
        });
    } else if (target.classList.contains('check-btn')) {
        // Toggle completed state
        todoElement.classList.toggle('completed');
    }
}

/**
 * Creates a new todo element.
 * @param {string} todoText - The text content of the todo.
 * @returns {HTMLElement} - The created todo element.
 */
function createTodoElement(todoText) {
    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);

    const newToDo = document.createElement('li');
    newToDo.innerText = todoText;
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);

    const checkedButton = createButton('fas fa-check', 'check-btn');
    const deleteButton = createButton('fas fa-trash', 'delete-btn');
    toDoDiv.append(checkedButton, deleteButton);

    return toDoDiv;
}

/**
 * Creates a button with an icon.
 * @param {string} iconClass - The FontAwesome icon class.
 * @param {string} buttonClass - The button class.
 * @returns {HTMLElement} - The created button element.
 */
function createButton(iconClass, buttonClass) {
    const button = document.createElement('button');
    button.innerHTML = `<i class="${iconClass}"></i>`;
    button.classList.add(buttonClass, `${savedTheme}-button`);
    return button;
}

/**
 * Saves a todo to localStorage.
 * @param {string} todoText - The text content of the todo.
 */
function saveTodoToLocalStorage(todoText) {
    const todos = getTodosFromLocalStorage();
    todos.push(todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
}

/**
 * Loads todos from localStorage and renders them.
 */
function loadTodos() {
    const todos = getTodosFromLocalStorage();
    todos.forEach(todoText => {
        const todoElement = createTodoElement(todoText);
        toDoList.appendChild(todoElement);
    });
}

/**
 * Removes a todo from localStorage.
 * @param {HTMLElement} todoElement - The todo element to remove.
 */
function removeTodoFromLocalStorage(todoElement) {
    const todos = getTodosFromLocalStorage();
    const todoText = todoElement.querySelector('.todo-item').innerText;
    const updatedTodos = todos.filter(todo => todo !== todoText);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
}

/**
 * Retrieves todos from localStorage.
 * @returns {Array} - An array of todos.
 */
function getTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

/**
 * Changes the theme of the application.
 * @param {string} color - The theme color ('standard', 'light', 'darker').
 */
function changeTheme(color) {
    localStorage.setItem('savedTheme', color);
    savedTheme = color;

    // Update body class
    document.body.className = color;

    // Update title class for darker theme
    const title = document.getElementById('title');
    color === 'darker' ? title.classList.add('darker-title') : title.classList.remove('darker-title');

    // Update input class
    toDoInput.className = `${color}-input`;

    // Update todo items
    document.querySelectorAll('.todo').forEach(todo => {
        const isCompleted = todo.classList.contains('completed');
        todo.className = `todo ${color}-todo ${isCompleted ? 'completed' : ''}`;
    });

    // Update buttons
    document.querySelectorAll('button').forEach(button => {
        if (button.classList.contains('check-btn')) {
            button.className = `check-btn ${color}-button`;
        } else if (button.classList.contains('delete-btn')) {
            button.className = `delete-btn ${color}-button`;
        } else if (button.classList.contains('todo-btn')) {
            button.className = `todo-btn ${color}-button`;
        }
    });
}