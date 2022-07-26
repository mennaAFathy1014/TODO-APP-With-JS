let todoList = document.querySelector(".todo-list");
let input = document.querySelector(".todo");
let addbtn = document.querySelector(".add");
let compdbtn = document.querySelector(".show-completed");
let uncomp = document.querySelector(".show-uncompleted");
let all = document.querySelector(".show-all");



function addCheck(item){
    let check = document.createElement("span");
    check.classList.add("check");
    check.innerHTML = "&check;";
    item.appendChild(check);
    check.addEventListener("click", function(){
        item.classList.toggle("completed");
    })
}
function addDelete(item){
    let delet = document.createElement("span");
    delet.classList.add("delete");
    delet.innerHTML = "&cross;";
    item.appendChild(delet);
    delet.addEventListener("click", function(){
        item.remove();
    })

}
addbtn.addEventListener("click", function() {
    if( input.value !== "" ) {
        let item = document.createElement("div");
        item.classList.add("item");
        item.innerHTML = `<p>${input.value}</p>`;
        addCheck(item);
        addDelete(item);
        todoList.appendChild(item);
        input.value = "";
    }
})

compdbtn.addEventListener("click", function(){
    let items = document.querySelectorAll(".item");
    items.forEach(function(item){
        if(!item.classList.contains("completed")){
            item.classList.toggle("hidden");
        }
    });
})
uncomp.addEventListener("click", function(){
    let items = document.querySelectorAll(".item");
    items.forEach(function(item){
        if(item.classList.contains("completed")){
            item.classList.toggle("hidden");
        }
    });
})
all.addEventListener("click", function(){
    let items = document.querySelectorAll(".item");
    items.forEach(function(item){
        item.classList.remove("hidden");
    });
})