var state = {
  todos: [
      {id: 1, task: 'Get the training done!',status:true, edit: false},
      {id: 2, task: 'Ensure everyone including me understands this',status:false, edit:false},
      {id: 3, task: 'Be happy',status: false, edit: false}
    ] 
};

var todoService = {
    addTodo: function (newTodo) {
        newTodo.id = state.todos.length + 1;
        state.todos = [...state.todos, newTodo];
    },
    updateTodo: function (todoId, value) {
        let todo = todoService.findTodo(todoId);
        todo.task = value; // todo: Mutating the state. Not a good practice.
    },
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
        let currentTodo;
        let todos = state.todos.map((todo) => {
            if (todo.id == todoId) {
                currentTodo = todo;
                todo.status = !todo.status;
            }
            return todo;
        });
        state.todos = [...todos];

        return currentTodo;
    }
}

var todoInput = document.getElementById("todo");
var todoList = document.getElementById("todos");

var todoApp = {
  addTodo: function () {
      let todo = todoInput.value;
      let newTodo = {
          task: todo,
          status: false
      };
      todoService.addTodo(newTodo);
      this.renderItem(newTodo);
  },

  toggleTodos: function (el) {
      let todoId = el.parentNode.id; // Here 'el' is button.  The parent is the <li> element.
      let todo = todoService.toggleComplete(todoId);
      this.renderFragment(el.parentNode, todo);
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

  onUpdateTodo: function (event, todoId) {
    if (event.which == 27) {  // escape key
      this.toggleEdit(event.target.parentNode, todoId);
    } else if (event.which == 13) { //enter key
      todoService.updateTodo(todoId, event.target.value);
      this.toggleEdit(event.target.parentNode, todoId);
    }
  },

  removeTodo: function (el) {
      let todoId = el.parentNode.id;
      todoService.removeTodo(todoId);
      this.render();
  },

  // render one element
  renderFragment: function (el, todo) {
      el.outerHTML = this.getItemView(todo);
  },

  // get html view of one model item.
  getItemView: function (todoItem) {
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
                  class='btn'>${buttonUndoRedoText}
          </button>
      `;

      html = `
        <li id=${todoItem.id} class=${todoItemStyle}>
            ${todoItem.task} ${btnUndoRedo}${btnDelete}
        </li>
      `;

      if (todoItem.edit) {
          html = `
              <li id=${todoItem.id} class=${todoItemStyle}>
                <input onkeyup="todoApp.onUpdateTodo(event, ${todoItem.id})" 
                    type="text" 
                    value='${todoItem.task}' />
                    ${btnUndoRedo}
                    ${btnDelete}
             </li>
          `;
      }
      return html;
  },

  parseHtml: function (html) {
    var t = document.createElement('template');
    t.innerHTML = html;
    return t.content.cloneNode(true);
  },

  renderItem: function (todo) {
    var itemView = this.parseHtml(this.getItemView(todo));
    todoList.appendChild(itemView);
  },

  render: function () {
      let html = "";
      if (state.todos.length === 0) {
          todoList.innerHTML = "No todos yet! Be awesome and create some todos!!";
          return;
      }
      for (let i = 0;i < state.todos.length; i++) {
          html += this.getItemView(state.todos[i]);
      }
      todoList.innerHTML = html;
  }
};

todoApp.render();