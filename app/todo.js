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

    //var btnDelete = "<button type='button' onclick='myApp.removeTodo(this)' class='btn'>remove</button>";
    var btnDelete = "<a type='button'  onclick='myApp.removeTodo(this)' data-toggle='tooltip'  " 
      + "data-placement = 'top' title = 'Delete this todo' "
      + "class='btn btn-xs btn-danger pull-right'><i class='glyphicon glyphicon-trash'></i></a>";
    
    var todo = {};
    
    for (var i = 0; i < this.todos.length; i++) {
        todo = this.todos[i];
        var style = "";
        // alert(i);
        btnStatus = "<button type='button' onclick='myApp.toggleTodos(this)' data-toggle='tooltip' " 
          + " data-placement = 'top' title = 'Mark this as complete'  class='btn btn-xs btn-warning'>Complete</button>";
        
      if (todo.status == true) {
            style = 'todo-completed';
            btnStatus = "<button type='button' onclick='myApp.toggleTodos(this)' data-toggle='tooltip' " 
                +" data-placement = 'top' title = 'Mark this as not-complete'  "
                + " class='btn btn-xs btn-warning '>Undo</button>";
        }
        html += "<li><span id=" + todo.id + " class=" + style + ">" + todo.task + "</span> " + btnStatus + btnDelete + "</li>";
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

    var btnDelete = "<a type='button'  onclick='myApp.removeTodo(this)' data-toggle='tooltip'  " 
      + "data-placement = 'top' title = 'Delete this todo' "
      + "class='btn btn-xs btn-danger pull-right'><i class='glyphicon glyphicon-trash'></i></a>";
    
    
    var style = " ";

    btnStatus = "<button type='button' onclick='myApp.toggleTodos(this)' data-toggle='tooltip' " 
          + " data-placement = 'top' title = 'Mark this as complete'  class='btn btn-xs btn-warning'>Complete</button>";
    
    if (todo.status === true) {
      style = "todo-completed";
      btnStatus = "<button type='button' onclick='myApp.toggleTodos(this)' data-toggle='tooltip' " 
                +" data-placement = 'top' title = 'Mark this as not-complete'  "
                + " class='btn btn-xs btn-default '>Undo</button>";
    }  

    html += "<li><span id=" + todo.id + " class=" + style + ">" + todo.task + "</span> " 
        + btnStatus + btnDelete + "</li>";
    
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

    //var todoId = el.parentNode.id;   // This will point to <li>
    
    var todoId = el.parentNode.childNodes[0].id;  // we need the <span>

    var todo = {};

    console.log(el.parentNode);
    

    todo = this.todos.filter(function (item){
      console.log(item);
      return item.id == todoId;
    })[0];   // filter will return and array always, so we need to grab the first element.
    
    todo.status = !todo.status;
    
    // FIX: Only update the specific element
    this.toggleElementClass(el,todo.status);
    
  },
  
  toggleElementClass: function (el, status) {
    if (status) {
      el.parentNode.childNodes[0].classList.add("todo-completed");
      el.innerText = "undo";
    }else {
      el.parentNode.childNodes[0].classList.remove("todo-completed");
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

  

