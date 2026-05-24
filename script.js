const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = JSON.parse(localStorage.getItem('todos')) || [
  { id: 1, text: 'Вивчити HTML', checked: true },
  { id: 2, text: 'Вивчити CSS', checked: true },
  { id: 3, text: 'Вивчити JavaScript', checked: false }
];

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodo(todo) {
  return `
    <li class="list-group-item">
      <input 
        type="checkbox" 
        class="form-check-input me-2" 
        id="todo-${todo.id}" 
        ${todo.checked ? 'checked' : ''} 
        onChange="checkTodo(${todo.id})"
      />
      <label for="todo-${todo.id}">
        <span class="${todo.checked ? 'text-success text-decoration-line-through' : ''}">
          ${todo.text}
        </span>
      </label>
      <button class="btn btn-danger btn-sm float-end" onClick="deleteTodo(${todo.id})">Видалити</button>
    </li>
  `;
}

function render() {
  const htmlContent = todos.map(todo => renderTodo(todo)).join('');
  list.innerHTML = htmlContent;
}

function updateCounter() {
  const totalTodos = todos.length;
  const uncheckedTodos = todos.filter(todo => !todo.checked).length;

  itemCountSpan.textContent = totalTodos;
  uncheckedCountSpan.textContent = uncheckedTodos;
}

function newTodo() {
  const todoText = prompt('Введіть назву нового завдання:');
  
  if (todoText && todoText.trim() !== '') {
    const newTodoItem = {
      id: Date.now(),
      text: todoText.trim(),
      checked: false
    };

    todos.push(newTodoItem);
    
    saveToLocalStorage();
    render();
    updateCounter();
  }
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  
  saveToLocalStorage();
  render();
  updateCounter();
}

function checkTodo(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, checked: !todo.checked };
    }
    return todo;
  });

  saveToLocalStorage();
  render();
  updateCounter();
}

render();
updateCounter();