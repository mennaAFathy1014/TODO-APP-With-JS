let arrayOfTasks = [];
let input = document.querySelector('.toDO-input');
let tasks = document.querySelector('.todo-list');
let checkAll = document.querySelector('.checkAll');

//check if there is tasks in local storage
if(window.localStorage.getItem('tasks')){
    arrayOfTasks = JSON.parse(window.localStorage.getItem('tasks'));
    addElementsToPage(arrayOfTasks);
}


//click on element
tasks.addEventListener('click',(e)=>{
    //delete button
    if(e.target.classList.contains('del')){
        let id = e.target.parentElement.getAttribute('data-id');
        deleteTask(id);
    }
    if(e.target.classList.contains('check')){
        let id = e.target.parentElement.getAttribute('data-id');
        completeTask(id);
    }
   
})
tasks.addEventListener('dblclick',(e)=>{
    if(e.target.classList.contains('text')){
        editText(e.target.parentElement.getAttribute('data-id'),
        e.target.parentElement.querySelector('.text'));
    }
})
function editText(id,parent){
    arrayOfTasks.forEach((task)=>{
        if(task.id == id){
            parent.contentEditable = true;
            parent.innerHTML ='';
            parent.focus();
            parent.addEventListener('blur',()=>{
            task.title = parent.innerHTML;
            addDataToLocalStorage(arrayOfTasks);
            });
            
        }
    })
}


input.addEventListener('keydown',function(e){
    if(e.keyCode === 13 && input.value !==''){
        let taskText = input.value;
        addTasksToarray(taskText);
        addElementsToPage(arrayOfTasks);
        input.value = '';
    }
})

checkAll.addEventListener('click',function(){
    arrayOfTasks.forEach((task)=>{
        !task.completed ? task.completed = true : task.completed = true;    
    })
    addDataToLocalStorage(arrayOfTasks);
    
})

function addTasksToarray(taskText){
    let task = {
        id:Date.now(),
        title:taskText,
        completed:false
    }
    // add task to array
    arrayOfTasks.push(task);
    //add task to page
    addElementsToPage(arrayOfTasks);
    //add to local storage
    addDataToLocalStorage(arrayOfTasks);
    //count tasks
    countTasks(arrayOfTasks);

}
function addDataToLocalStorage(arrayOfTasks){
    window.localStorage.setItem('tasks',JSON.stringify(arrayOfTasks));
    addElementsToPage(arrayOfTasks);
}
function addElementsToPage(arrayOfTasks){
    tasks.innerHTML = '';
    //loop through array of tasks
    arrayOfTasks.forEach(function(task){
        //create main div 
        let div = document.createElement('div');
        div.className='item';
        div.setAttribute('data-id',task.id);
        //create checkbox
        let check = document.createElement('button');
        check.className = 'check';
        div.appendChild(check);

        //add text
        let text = document.createElement('span');
        text.className = 'text';
        text.innerHTML = task.title;
        div.appendChild(text);
        if(task.completed){
            check.innerHTML = '&check;';
            check.classList.add('checked');
        }
        // delete button
        let deleteButton = document.createElement('button');
        deleteButton.className = 'del';
        deleteButton.innerHTML = '&times;';
        div.appendChild(deleteButton);
        tasks.prepend(div);
 
    });

}

//delete task
function deleteTask(id){
    arrayOfTasks = arrayOfTasks.filter((task)=> task.id != id);
    addDataToLocalStorage(arrayOfTasks);
    countTasks(arrayOfTasks);
}
//complete task
function completeTask(id){
    arrayOfTasks.forEach((task)=>{
        if(task.id == id){
            task.completed = !task.completed;
        }
    }
    )
    addDataToLocalStorage(arrayOfTasks);

}
let activeFilter = [];
let completedFilter = [];

//filter
let footerTodo = document.querySelector('.footer');

footerTodo.addEventListener('click',function(e){
    if(e.target.classList.contains('all')){
        addElementsToPage(arrayOfTasks);
    }
    if(e.target.classList.contains('active')){
        activeFilter = arrayOfTasks.filter((task)=>!task.completed);
        addElementsToPage(activeFilter);
    }
    if(e.target.classList.contains('completed')){
        completedFilter = arrayOfTasks.filter((task)=>task.completed);
        addElementsToPage(completedFilter);
    }
})
let counter = document.querySelector('.counter');
let clearAll = document.querySelector('.clear');
clearAll.addEventListener('click',function(){
    arrayOfTasks = arrayOfTasks.filter((task)=>!task.completed);
    addDataToLocalStorage(arrayOfTasks);
    countTasks(arrayOfTasks);
})
function countTasks(arrayOfTasks){
    let count = arrayOfTasks.length;
    counter.innerHTML = `${count} items left`;
}
countTasks(arrayOfTasks);
