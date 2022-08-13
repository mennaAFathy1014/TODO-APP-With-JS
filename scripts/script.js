const todoList = document.querySelector('.todo-list');
const checkAll = document.querySelector('.checkAll');
const input = document.querySelector('.toDO-input');
const footer = document.querySelector('.footer');
const enterKey =13;
let completedFilter =[];
let arrayOfTasks = [];
let counterTasks = document.querySelector(".counter");
if(localStorage.getItem('tasks')){
    arrayOfTasks = JSON.parse(localStorage.getItem('tasks'));
    addElementsToPage(arrayOfTasks);
}
function addElementsToPage(arrayOfTasks){
    todoList.innerHTML = '';
    arrayOfTasks.forEach((task)=>{
        let div = document.createElement('div');
        div.className='item';
        div.setAttribute('data-id',task.id);
        let check = document.createElement('button');
        check.className = 'check';
        div.appendChild(check);
        let textinput = document.createElement('input');
        textinput.className = 'text';
        textinput.innerText = task.title;
        textinput.classList.add('unshown');
        let text = document.createElement('span');
        text.className = 'text';
        text.innerHTML = task.title;
        div.appendChild(text);
        div.appendChild(textinput);
        if(task.completed){
            check.innerHTML = '&check;';
            check.classList.add('checked');
            text.classList.add('completed-text');
        }
        let deleteButton = document.createElement('button');
        deleteButton.className = 'del';
        deleteButton.innerHTML = '&times;';
        div.appendChild(deleteButton);
        todoList.prepend(div);
    })
    completedFilter = arrayOfTasks.filter((task)=> task.completed);
    countTasks();
} 
input.addEventListener('keydown',function(e){
    if(e.keyCode === enterKey && input.value !==''){
        let taskText = input.value;
        addTasksToArray(taskText);
        input.value='';
    }
})
// add tasks to Array
function addTasksToArray(taskText){
    class Task  {
        constructor(taskText){
            this.id = Date.now();
            this.title = taskText;
            this.completed = false;
        }
    }
    let task = new Task(taskText);
    arrayOfTasks.push(task);
    addTaskTopage(task);
    addTasksToLocalStorage(arrayOfTasks);
}
function addTaskTopage(task){
    let div = document.createElement('div');
    div.className='item';
    div.setAttribute('data-id',task.id);
    //create checkbox
    let check = document.createElement('button');
    check.className = 'check';
    div.appendChild(check);
    //add text input
    let textinput = document.createElement('input');
    textinput.className = 'text';
    textinput.innerText = task.title;
    textinput.classList.add('unshown');
    //add text
    let text = document.createElement('span');
    text.className = 'text';
    text.innerHTML = task.title;
    text.innerText = task.title;
    div.appendChild(text);
    div.appendChild(textinput);
    div.appendChild(textinput);
    if(task.completed){
        check.innerHTML = '&check;';
        check.classList.add('checked');
    }
    // delete button
    let deleteButton = document.createElement('button');
    deleteButton.className = 'del';
    deleteButton.innerHTML = '&times;';
    div.appendChild(deleteButton);
    todoList.prepend(div);
    countTasks();
}
function addTasksToLocalStorage(arrayOfTasks){
    localStorage.setItem('tasks',JSON.stringify(arrayOfTasks));
}
//click on element
todoList.addEventListener('click',function(e){
    if(e.target.classList.contains('check')){
        completeTask(e.target.parentElement);
    }
    if(e.target.classList.contains('del')){
        deleteTask(e.target.parentElement);
    }
    if(e.target.classList.contains('text')){
        e.target.addEventListener('click',function(){
            editTask(e.target.parentElement.querySelector('.text'),e.target);
        })
    }
    countTasks();
})
//edit task
function editTask(parent,task){
    const itemParent = parent.parentElement;
    const itemInput = itemParent.querySelector('input');
    const itemSpan = itemParent.querySelector('span');
    itemInput.classList.remove('unshown');
    itemInput.value = task.innerText;
    itemInput.focus();
    itemInput.addEventListener('keydown',function(e){
        if(e.keyCode === enterKey){
            
            itemSpan.innerText = itemInput.value;
            itemInput.classList.add('unshown');
            itemSpan.classList.remove('unshown');
            itemInput.innerHTML = itemInput.value;
            itemInput.removeEventListener('keydown',function(){});
            setToLocalStorage(itemParent);
        }
    })
    itemInput.addEventListener('blur',function(){
        itemSpan.innerText = itemInput.value;
        itemInput.classList.add('unshown');
        itemSpan.classList.remove('unshown');
        itemInput.innerHTML = itemInput.value;
        setToLocalStorage(itemParent);
    })
    itemSpan.classList.add('unshown');
}
function setToLocalStorage(itemParent){
    arrayOfTasks.find((task)=>{
        if(task.id == itemParent.getAttribute('data-id')){
            task.title = itemParent.querySelector('input').value;
        }
    })
    addTasksToLocalStorage(arrayOfTasks);
}
//complete task
function completeTask(task){
    let id = task.getAttribute('data-id');
    let check = task.querySelector('.check');
    let text = task.querySelector('.text');
    if(check.classList.contains('checked')){
        check.classList.remove('checked');
        check.innerHTML = '';
        text.classList.remove('completed-text');
        arrayOfTasks.find((task)=>{
            if(task.id == id){
                task.completed = false;
            }
        })
    }else{
        check.classList.add('checked');
        check.innerHTML = '&check;';
        text.classList.add('completed-text');
        arrayOfTasks.find((task)=>{
            if(task.id == id){
                task.completed = true;
            }
        })
    }
    addTasksToLocalStorage(arrayOfTasks);
    completedFilter = arrayOfTasks.filter((task)=> task.completed);
    countTasks();
}
//delete task
function deleteTask(task){
    let id = task.getAttribute('data-id');
    task.remove();
    arrayOfTasks = arrayOfTasks.filter((task)=>task.id != id);
    addTasksToLocalStorage(arrayOfTasks);
    completedFilter = arrayOfTasks.filter((task)=> task.completed);
    countTasks();
}
countTasks();
function countTasks(){
    let count = completedFilter.length;
    let active = arrayOfTasks.length - count;
    counterTasks.innerText = `${active} items left`;
}
footer.addEventListener('click',function(e){
    if(e.target.classList.contains('completed')){
        addElementsToPage(completedFilter);
    }
    if(e.target.classList.contains('all')){
        addElementsToPage(arrayOfTasks);
    }
    if(e.target.classList.contains('active')){
        addElementsToPage(arrayOfTasks.filter((task)=> !task.completed));
    }
    if(e.target.classList.contains('clear')){
        arrayOfTasks = arrayOfTasks.filter((task)=> !task.completed);
        addElementsToPage(arrayOfTasks);
        addTasksToLocalStorage(arrayOfTasks);
    }
})
checkAll.addEventListener('click',function(e){
    todoList.querySelectorAll('.check').forEach((check)=>{
        if(!check.classList.contains('checked')){
            completeTask(check.parentElement);
        }else{
            completeTask(check.parentElement);
        }
    })
})