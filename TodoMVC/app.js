var STORAGE_KEY = 'vue2-todo-mvc';
var todoStorage = {
    fetch: function () {
        var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        todos.forEach(function (todo, index) {
            todo.id = index;
        })
        todoStorage.uid = todos.length
        return todos
    },
    save: function (todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
}

var filters = {
    all: function (todos) {
        return todos
    },
    active: function (todos) {
        return todos.filter(function (todo) {
            return !todo.finish
        })
    },
    completed: function (todos) {
        return todos.filter(function (todo) {
            return todo.finish
        })
    }
}


var app = new Vue({
    data: {
        todos: todoStorage.fetch(),
        newTodo: '',
        curEditIndex: '',
        tempTodo: '',
        editingTodo: '',
        visibility: 'all'

    },
    watch:{
      todos:{
          handler:function (todos) {
              todoStorage.save(todos)
          },
          deep:true
      }
    },
    methods: {
        addTodo: function () {
            var value = this.newTodo;
            if (value) {
                this.todos.push({
                    id: todoStorage.uid++,
                    title: value,
                    finish: false
                })
                this.newTodo = ""
            }
        },
        delTodo: function (index) {
            this.todos.splice(index, 1);
        },
        editTodo: function (todo, index) {
            this.tempTodo = todo.title
            this.curEditIndex = index
        },
        doneTodo: function (todo, index) {
            this.curEditIndex = '';
            if (!todo.title) {
                this.delTodo(index)
            }
        },
        cancelTodo: function (todo) {
            this.curEditIndex = '';
            todo.title = this.tempTodo
            this.tempTodo = ''
        },
        removeCompleted: function () {
            this.todos = filters.active(this.todos);
        }
    },
    directives: {
        todoFocus: function (el, value) {
            if (value) {
                el.focus();
            }
        }
    },
    computed: {
        filteredTodos: function () {
            return filters[this.visibility](this.todos);
        },
        remaining: function () {
            return filters.active(this.todos).length
        },
        allDone: {
            get: function () {
                return this.remaining === 0
            },
            set: function (val) {
                this.todos.forEach(function (todo) {
                    todo.finish = val
                })
            }
        }
    }
})

function onHashChange(){
    var visibility = location.hash.replace(/#\/?/,"");
    if(filters[visibility]){
        app.visibility = visibility
    }else {
        window.location.hash = ''
        app.visibility = 'all'
    }
}

window.addEventListener('hashchange',onHashChange)
onHashChange()

app.$mount('.todoapp')