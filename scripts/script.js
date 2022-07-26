const todoList = document.querySelector('.todo-list');
const checkAll = document.querySelector('.checkAll');
const input = document.querySelector('.toDO-input');
const footer = document.querySelector('.footer');
const counter = document.querySelector('.counter');
let arrayOfTasks = [];
let counterTasks = document.querySelector(".counter");

const enterKey =13;
if(localStorage.getItem('tasks')){
    arrayOfTasks = JSON.parse(localStorage.getItem('tasks'));
    addElementsToPage(arrayOfTasks);
    let count = 0 ;
    arrayOfTasks.forEach((task)=>{
        if(!task.completed){
            count++;
        }
    })
    setCounter(count);
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
    let completed = arrayOfTasks.filter((task)=>{
        return task.completed === true;
    })
    setCounter(arrayOfTasks.length - completed.length);
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
        e.target.ondblclick = function(){
            editTask(e.target.parentElement.querySelector('.text'),e.target);
        }
    }
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
            if(itemInput.value !== ''){
                itemSpan.innerText = itemInput.value;
                itemInput.innerHTML = itemInput.value;
            }
            itemInput.classList.add('unshown');
            itemSpan.classList.remove('unshown');
            setToLocalStorage(itemParent);
        }
    })
    itemInput.addEventListener('blur',function(){
        if(itemInput.value !== ''){
            itemSpan.innerText = itemInput.value;
            itemInput.innerHTML = itemInput.value;
        }
        itemInput.classList.add('unshown');
        itemSpan.classList.remove('unshown');
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
    arrayCompletedTasks = arrayOfTasks.filter((task)=>{
        return task.completed;
    })
    let arrayOfUncompleted = arrayOfTasks.filter((task)=>!task.completed)
    setCounter(arrayOfUncompleted.length);
    addTasksToLocalStorage(arrayOfTasks);
}
//delete task
function deleteTask(task){
    let id = task.getAttribute('data-id');
    task.remove();
    arrayOfTasks = arrayOfTasks.filter((task)=>task.id != id);
    let completed = arrayOfTasks.filter((task)=>task.completed);
    setCounter(arrayOfTasks.length - completed.length);
    addTasksToLocalStorage(arrayOfTasks);
}
footer.addEventListener('click',function(e){
    if(e.target.classList.contains('completed')){
        arrayCompletedTasks = arrayOfTasks.filter((task)=>{
            return task.completed;
        })
        
        showCompletedTasks(arrayCompletedTasks);
        addTasksToLocalStorage(arrayOfTasks);
    }
    if(e.target.classList.contains('all')){
        addElementsToPage(arrayOfTasks);
    }
    if(e.target.classList.contains('active')){
        const activeTasks = arrayOfTasks.filter((task)=>!task.completed);
        addElementsToPage(activeTasks);
    }
    if(e.target.classList.contains('clear')){
        arrayOfTasks = arrayOfTasks.filter((task)=> !task.completed);
        addElementsToPage(arrayOfTasks);
        addTasksToLocalStorage(arrayOfTasks);
    }
})
//show completed tasks
function showCompletedTasks(arrayCompletedTasks){
    addElementsToPage(arrayCompletedTasks);
}
checkAll.addEventListener('click',function(){
    let arrayOfCheckedTasks = arrayOfTasks.filter((task)=>!task.completed);
    if(arrayOfCheckedTasks.length > 0){
        arrayOfTasks.forEach((task)=>{
            task.completed = true;
        } )
        addElementsToPage(arrayOfTasks);
        addTasksToLocalStorage(arrayOfTasks);
    }else{
        arrayOfTasks.forEach((task)=>{
            task.completed = false;
        } )
        addElementsToPage(arrayOfTasks);
        addTasksToLocalStorage(arrayOfTasks);
    }
    arrayOfCheckedTasks = arrayOfTasks.filter((task)=>!task.completed);
    setCounter(arrayOfCheckedTasks.length);
});
function setCounter(count){
    if(count > 0){
        counter.innerHTML = `${count} items left`;
    }else{
        count = 0;
        counter.innerHTML = `${count} items left`;
    }
};
let completed = arrayOfTasks.filter((task)=>task.completed);
setCounter(arrayOfTasks.length - completed.length);