var state = {
  todos: [
    {id: 1, task: 'Get the training done!',status:true},
    {id: 2, task: 'Ensure everyone including me understands this',status:false},
    {id: 3, task: 'Be happy',status: false}
  ]
};

var todoInput = document.getElementById('todo');
var todoList = document.getElementById('todos');  

var todoApp = {
  render : function () {
    let html = "";
    console.log(state.todos.length);
    if (state.todos.length === 0) {
        elem.innerHTML = "No todos yet! Be awesome and create some!!!";
      return;
    }
    let btnText = 'Complete';

    let btnStatus = "";

    let btnDelete = `<button type='button' onclick='todoApp.removeTodo(this)' 
          class='btn'>remove</button>`;

    for(var i = 0; i < state.todos.length; i++) {
      let todo = state.todos[i];
      let todoItemStyle = "";
      btnStatus = `<button type='button' onclick='todoApp.toggleTodos(this)' 
          class='btn'>complete</button>`;

      if (todo.status === true) {
        todoItemStyle = "todo-completed";
        btnStatus = `<button type='button' onclick='todoApp.toggleTodos(this)' 
                     class='btn'>undo</button>`;
      }  
      //html += "<li id=" + todo.id + " class=" + style + ">" + this.todos[i].task + btnStatus + btnDelete +  "</li>" ;
      
      html += `
        <li id=${todo.id} class=${todoItemStyle}>
          ${state.todos[i].task}${btnStatus}${btnDelete}
        </li>
      `;
    }

    todoList.innerHTML = html;
  },

  addTodo: function() {
    let todo = todoInput.value;
    let newTodo = {
      id: state.todos.length + 1,
      task: todo,
      status: false
    }
    //state.todos.push({id: state.todos.length+1, task: todo, status:false});
    state.todos = [...state.todos, newTodo];
    this.render();
  },

  toggleTodos: function(el) {
    let todoId = el.parentNode.id;

    let todo = {};

    // for(var i = 0; i < state.todos.length; i++){
    //   todo = state.todos[i];  
    //   if (todo.id  == todoId) {
    //     break;
    //   }
    // }
    // todo.status = !todo.status;
    let todos = state.todos.map((todo) => {
      if (todo.id == todoId) {
        todo.status = !todo.status;
      }
      return todo;
    });

    state.todos = [...todos];

    todoApp.render();
  },
  removeTodo:  function(el) {
    el.parentNode.classList.remove("todo-completed");

    let todoId = el.parentNode.id;

    // for(var i = 0; i < state.todos.length; i++){
    //   todoIndex = i; 
    //   if (state.todos[i].id  == todoId) {
    //     break;
    //   }
    // }
    // state.todos.splice(todoIndex, 1);

    let todos = state.todos.filter((todo) => {
      return todo.id != todoId;
    });

    state.todos = [...todos];

    todoApp.render();
  }
};

todoApp.render();

  

