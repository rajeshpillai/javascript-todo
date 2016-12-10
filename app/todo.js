var myApp = {
  todos: [
    {id: 1, task: 'Get the training done!',status:true},
    {id: 2, task: 'Ensure everyone including me understands this',status:false},
    {id: 3, task: 'Be happy',status: false}
  ],
  
  refreshUI : function () {
    var elem = document.getElementById('todos');
    var html = "";

    console.log(this.todos.length);
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
  addTodo: function() {
    var todo = document.getElementById('todo').value;

    this.todos.push({id: todos.length+1, task: todo, status:false});

    console.log('TODOS: ', this.todos);

    this.refreshUI();
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
    myApp.refreshUI();
  },
  removeTodo:  function(el) {
    el.parentNode.classList.remove("todo-completed");

    var todoId = el.parentNode.id;

    var todoIndex;

    for(var i = 0; i < this.todos.length; i++){
      todoIndex = i; 
      if (todo.id  == todoId) {
        break;
      }
    }

    this.todos.splice(todoIndex, 1);


    myApp.refreshUI();

  }
};

myApp.refreshUI();

  

 