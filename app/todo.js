var myApp = {
  todos: [
    {id: 1, task: 'Get the training done!',status:true},
    {id: 2, task: 'Ensure everyone including me understands this',status:false},
    {id: 3, task: 'Be happy',status: false}
  ],
  
  refreshUI : function () {
    var elem = document.getElementById('todos');
    var html = "";

    if (this.todos.length === 0) {
      elem.innerHTML = "No todos yet! Be awesome and create some!!!";
      return;
    }
    var btnText = 'Complete';

    var btnStatus = "";

    var btnDelete = "<button type='button' onclick='myApp.removeTodo(this)' class='btn'>remove</button>";

    for(var i = 0; i < this.todos.length; i++) {
      var todo = this.todos[i];
      var style = "";

      btnStatus = "<button type='button' onclick='myApp.toggleTodos(this)' class='btn'>complete</button>";

      if (todo.status === true) {
        style = "todo-completed";
        btnStatus = "<button type='button' onclick='myApp.toggleTodos(this)' class='btn'>undo</button>";
      }  

      html += "<li id=" + todo.id + " class=" + style + ">" + this.todos[i].task + btnStatus + btnDelete +  "</li>" ;
    }

    elem.innerHTML = html;
  },
  
  renderTodoItem: function (todo) {
    var elem = document.getElementById('todos');
    var html = "";

    if (!todo) {
      return;
    }

    var btnText = 'Complete';
    var btnStatus = "";

    var btnDelete = "<button type='button' onclick='myApp.removeTodo(this)' class='btn'>remove</button>";

    var style = " ";

    btnStatus = "<button type='button' onclick='myApp.toggleTodos(this)' class='btn'>complete</button>";

    if (todo.status === true) {
      style = "todo-completed";
      btnStatus = "<button type='button' onclick='myApp.toggleTodos(this)' class='btn'>undo</button>";
    }  

    html = "<li id='" + todo.id + "'" + " class=" + style + ">" + todo.task + btnStatus + btnDelete +  "</li>" ;

    elem.insertAdjacentHTML('beforeend', html);
    
  },
  
  addTodo: function() {
    var todoValue = document.getElementById('todo').value;

    var todo = {id: this.todos.length+1, task: todoValue, status:false};
    this.todos.push(todo);

    this.renderTodoItem(todo);  // FIX: Only add the new node
  },
  
  toggleTodos: function(el) {
    //e.parentNode.className = "";
    el.parentNode.classList.remove("todo-completed");

    var todoId = el.parentNode.id;

    var todo = {};

    for(var i = 0; i < this.todos.length; i++){
      todo = this.todos[i];  
      if (todo.id  == todoId) {
        break;
      }
    }

    todo.status = !todo.status;
    
    // FIX: Only update the specific element
    this.toggleElementClass(el,todo.status);
    
  },
  
  toggleElementClass: function (el, status) {
    if (status) {
      el.parentNode.classList.add("todo-completed");
      el.innerText = "undo";
    }else {
      el.parentNode.classList.remove("todo-completed");
      el.innerText = "complete";
    }
  },
  
  removeTodo:  function(el) {
    el.parentNode.classList.remove("todo-completed");

    var todoId = el.parentNode.id;

    var todoIndex = -1;

    for(var i = 0; i < this.todos.length; i++){
      todoIndex = i; 
      
      if (this.todos[i].id  == todoId) {
        break;
      }
    }

    this.todos.splice(todoIndex, 1);
    myApp.removeTodoItem(el.parentNode);  //FIX: only remove the deleted element
  },

  removeTodoItem: function (li){
    var elem = document.getElementById('todos');
    elem.removeChild(li);
  }
  
};

myApp.refreshUI();

  

