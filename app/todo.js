var state = {
  todos: [
    {id: 1, task: 'Get the training done!',status:true},
    {id: 2, task: 'Ensure everyone including me understands this',status:false},
    {id: 3, task: 'Be happy',status: false}
  ]
};
  
var myApp = {
  render : function () {
    var elem = document.getElementById('todos');
    var html = "";

    console.log(state.todos.length);
    if (state.todos.length === 0) {
        elem.innerHTML = "No todos yet! Be awesome and create some!!!";
      return;
    }
    var btnText = 'Complete';

    var btnStatus = "";

    var btnDelete = `<button type='button' onclick='myApp.removeTodo(this)' 
          class='btn'>remove</button>`;

    for(var i = 0; i < state.todos.length; i++) {
      let todo = state.todos[i];
      let style = "";
      btnStatus = `<button type='button' onclick='myApp.toggleTodos(this)' 
          class='btn'>complete</button>`;

      if (todo.status === true) {
        style = "todo-completed";
        btnStatus = `<button type='button' onclick='myApp.toggleTodos(this)' 
                     class='btn'>undo</button>`;
      }  
      //html += "<li id=" + todo.id + " class=" + style + ">" + this.todos[i].task + btnStatus + btnDelete +  "</li>" ;
      
      html += `
        <li id=${todo.id} class=${style}>
          ${state.todos[i].task}${btnStatus}${btnDelete}
        </li>
      `;
    }

    elem.innerHTML = html;
  },
  addTodo: function() {
    var todo = document.getElementById('todo').value;
    state.todos.push({id: state.todos.length+1, task: todo, status:false});
    
    console.log('TODOS: ', this.todos);
    this.render();
  },
  toggleTodos: function(el) {
    //e.parentNode.className = "";
    el.parentNode.classList.remove("todo-completed");

    var todoId = el.parentNode.id;

    var todo = {};

    for(var i = 0; i < state.todos.length; i++){
      todo = state.todos[i];  
      if (todo.id  == todoId) {
        break;
      }
    }

    todo.status = !todo.status;
    myApp.render();
  },
  removeTodo:  function(el) {
    el.parentNode.classList.remove("todo-completed");

    var todoId = el.parentNode.id;

    var todoIndex = -1;

    for(var i = 0; i < state.todos.length; i++){
      todoIndex = i; 
      if (state.todos[i].id  == todoId) {
        break;
      }
    }
    state.todos.splice(todoIndex, 1);
    myApp.render();
  }
};

myApp.render();

  

