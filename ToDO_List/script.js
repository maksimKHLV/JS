window.addEventListener('DOMContentLoaded', function() {
    var addButton = document.getElementById('add-button');
    var todoInput = document.getElementById('todo-input');
    var todoList = document.getElementById('todo-list');
  
    addButton.addEventListener('click', function() {
      var todoText = todoInput.value.trim();
      if (todoText !== '') {
        var todoItem = document.createElement('li');
        todoItem.textContent = todoText;
        
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', function() {
          todoList.removeChild(todoItem);
        });
        
        todoItem.appendChild(deleteButton);
        todoList.appendChild(todoItem);
        
        todoInput.value = '';
      }
    });
  });
