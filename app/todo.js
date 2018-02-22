var state = {
  todos: [
      {id: 1, task: 'Get the training done!',status:true, edit: false},
      {id: 2, task: 'Ensure everyone including me understands this',status:false, edit:false},
      {id: 3, task: 'Be happy',status: false, edit: false}
    ] 
};

var todoService = {
    findTodo: function (todoId) {
        let todo = state.todos.find((todo) => {
            return (todo.id == todoId);
        });
        return todo;
    },
    removeTodo: function (todoId) {
        let todos = state.todos.filter((todo) => {
           return todo.id != todoId;
        });
        state.todos = [...todos];
    },
    toggleEdit: function (todoId) {
        let todo = todoService.findTodo(todoId);
        todo.edit = !todo.edit;
        return todo;
    },
    toggleComplete: function (todoId) {
        let todos = state.todos.map((todo) => {
            if (todo.id == todoId) {
                todo.status = !todo.status;
            }
            return todo;
        });
        state.todos = [...todos];
    }
}

var todoInput = document.getElementById("todo");
var todoList = document.getElementById("todos");

var todoApp = {
  addTodo: function () {
      let todo = todoInput.value;
      let newTodo = {
          id: state.todos.length + 1,  // This should come from the database
          task: todo,
          status: false
      };

      //state.todos.push(newTodo);
      state.todos = [...state.todos, newTodo];
      this.render();
  },

  toggleTodos: function (el) {
      let todoId = el.parentNode.id;
      todoService.toggleComplete(todoId);
      this.render();
  },

  toggleEditEvent: function () {
      console.log(event);
      if (event.target.tagName.toLowerCase() !== "li") return;
      let todoId = event.target.id;
      this.toggleEdit(event.target, todoId);

  },
  toggleEdit: function (target, todoId) {
      let todo = todoService.toggleEdit(todoId);
      this.renderFragment(target,todo);
  },
  
  removeTodo: function (el) {
      let todoId = el.parentNode.id;
      todoService.removeTodo(todoId);
      this.render();
  },
  renderFragment: function (el, todo) {
      el.outerHTML = this.renderItem(todo);
  },

  renderItem: function (todoItem) {
      let html = "";

      let btnText = "complete";
      let bntUndoRedo = "";
      let btnDelete = `
          <button type='button' 
              onclick='todoApp.removeTodo(this)' 
              class='btn'>remove
          </button>
      `;

      let todoItemStyle = "";
      let buttonUndoRedoText = "complete";

      if (todoItem.status === true) {
          todoItemStyle = "todo-completed";
          buttonUndoRedoText = "undo";
      }

      // Use Backtick-> found near <esc> key on most keyboards
      btnUndoRedo = `
          <button type='button' onclick='todoApp.toggleTodos(this)' 
                  class='btn'>${buttonUndoRedoText}</button>`;

      html = `
      <li id=${todoItem.id} class=${todoItemStyle}>
          ${todoItem.task} ${btnUndoRedo}${btnDelete}
          </li>
      `;

      if (todoItem.edit) {
          //let eventH = "todoApp._onUpdate(event," + todoItem.id + ")";
          html = `
              <li id=${todoItem.id} class=${todoItemStyle}>
                  <input onkeyup="todoApp._onUpdate(event, ${todoItem.id})" 
                      type="text" 
                      value='${todoItem.task}' />${btnUndoRedo}${btnDelete}
                  </li>
              `;
      }

      return html;
  },

  _onUpdate: function (event, todoId) {
    console.log("update: ", event, todoId);
    if (event.which == 27) {  // escape key
      this.toggleEdit(event.target.parentNode, todoId);
    } else if (event.which == 13) { //enter key
      let todo = todoService.findTodo(todoId);
      todo.task = event.target.value; // todo: Mutating the state. Not a good practice.
      this.toggleEdit(event.target.parentNode, todoId);
    }

    console.log(state.todos);
  },

  render: function () {
      let html = "";

      if (state.todos.length === 0) {
          todoList.innerHTML = "No todos yet! Be awesome and create some todos!!";
          return;
      }
      for (let i = 0;i < state.todos.length; i++) {
          html += this.renderItem(state.todos[i]);
      }
      todoList.innerHTML = html;
  }
};

todoApp.render();