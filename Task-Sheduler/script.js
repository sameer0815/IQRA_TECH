const taskName=document.getElementById("taskName");
const dueDate=document.getElementById("dueDate");
const priority=document.getElementById("priority")
const taskList=document.getElementById("taskList")

const tasks=[];
let editIndex=-1;


function validateForm(){
    if(taskName.value.trim()===""){
        alert("please enter task name");
        return false;

    }
    if(dueDate.value===""){
        alert("please select due date")
        return false;

    }
    return true;

}
// console.log(validateForm())
function addTask(){
    if(!validateForm()){
        return
    }

    const task={
        taskName:taskName.value,
        dueDate:dueDate.value,
        priority:priority.value,

    };
    if(editIndex===-1){
    tasks.push(task);

    }
    else{
        tasks[editIndex]=task;
    }
    console.log(tasks)
    displayTask();
    clearForm();
}

function displayTask(){
    taskList.innerHTML="";

    tasks.forEach(function(task,index){
        const li=document.createElement("li");
        li.innerHTML=`
        <strong>${task.taskName}</strong>
        ${task.dueDate}
        <span class="${task.priority}-priority">${task.priority}</span>
        <button class="edit" onClick="editTask(${index})">Edit</button>
        <button class="delete" onClick="deleteTask(${index})">Delete</button>
`;
taskList.appendChild(li);

    })
}

function deleteTask(index){
    tasks.splice(index,1);
    displayTask();
    clearForm();
}

function editTask(index){
    taskName.value=tasks[index].taskName;
    dueDate.value=tasks[index].dueDate
    priority.value=tasks[index].priority

    editIndex=index;
}
function clearForm(){
    taskName.value="";
    dueDate.value="";
    priority.value="low";

    editIndex=-1;
    taskName.focus();
}