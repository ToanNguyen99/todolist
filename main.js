// Get element DOM
const taskInput = document.querySelector('.task-input input');
const boxListTask = document.querySelector('.task-box');

// Call API from Local Storage

let todos = JSON.parse(localStorage.getItem("todo-list"));
// set data to LocalStorage 
let setItemStorage = data => {
    localStorage.setItem("todo-list", JSON.stringify(data))
}

//-- Func Handle 
// render UI
let renderTodos = () => {
    let todoTask = "";
    todos?.forEach((todo, id) => {
        const isComplete = todo.status == "complete" ? "checked" : ""; 
        todoTask +=
        `
            <li class="task">
                <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isComplete}>
                    <p class="${isComplete}">${todo.name}</p>
                </label>
                <div class="settings">
                    <i class="uil uil-ellipsis-h"></i>
                    <ul class="task-menu">
                        <li  onclick="editTask(${id}, '${todo.name}')" ><i class="uil uil-pen"></i>Edit</li>
                        <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </li>
        `
    });
    boxListTask.innerHTML = todoTask;
}

//Update Status when click
let updateStatus = taskSelected => {
    let taskName = taskSelected.parentElement.lastElementChild;
    if(taskSelected.checked) {
        taskName.classList.add('checked');
        todos[taskSelected.id].status = 'complete';
    } else {
        taskName.classList.remove('checked');
        todos[taskSelected.id].status = 'pending';
    }
    setItemStorage(todos)
}
// Edit task

let editTask = (id, nameTask) => {
    console.log('id', id);
    console.log('name', nameTask);
    taskInput.value = nameTask;
    
}

// Remove task
let deleteTask = id => {
    console.log(id)
    todos.splice(id, 1);
    setItemStorage(todos);
    renderTodos();
}
// Handle Event
taskInput.addEventListener("keyup", e => {
    let inputValue = taskInput.value.trim();
    if(e.key == "Enter" && inputValue) {
        if(!todos) {
            todos = [];
        }
        taskInput.value = "";
        let creatObjTodo = {
            name: inputValue,
            status: "pending",
        }
        todos.push(creatObjTodo);
        setItemStorage(todos)
        renderTodos()
    }
} )


// Run Start
renderTodos();