const expenseForm=document.getElementById("expenseForm")
const amountInput=document.getElementById("amount")
const categoryInput=document.getElementById("category")
const descriptioInput=document.getElementById("description")
const expenseList=document.getElementById("expenseList")
const totalExpenses=document.getElementById("totalExpenses")

const expenses=[];
let editIndex=-1;

function validateForm(){
    if(amountInput.value===""){
        alert("Please Enter Amount")
        return  false
    }

    if(categoryInput.value.trim()===""){
        alert("Please Enter Category");
        return  false;
    }
    return  true;
}

function addExpenses(){
    if(!validateForm()){
        return;
    }

    const expense={
        amount:amountInput.value,
        category:categoryInput.value,
        description:descriptioInput.value
    };

    if(editIndex===-1){
        expenses.push(expense);
    }else{
        expenses[editIndex]=expense;
    }
    displayExpense();
    updateSummary();
    clearForm();
}


function displayExpense(){
    expenseList.innerHTML="";

    expenses.forEach(function(expense,index){
        const row=document.createElement("tr");

        row.innerHTML=
       ` <td>${expense.amount}</td>
        <td>${expense.category}</td>
        <td>${expense.description}</td>
        <td>
            <button onClick="editExpense(${index})">Edit</button>
            <button onClick="deleteExpenses(${index})">Delete</button>
        </td>
        `;
        expenseList.appendChild(row);
    })
}

function  updateSummary(){
    let  total=0;
    expenses.forEach(function(expense){
        total+=Number(expense.amount);
    });

    totalExpenses.innerText=total;
    
}

function clearForm(){
    expenseForm.reset();
    editIndex=-1
}

function editExpense(index){
    amountInput.value=expenses[index].amount;
    categoryInput.value=expenses[index].category;
    descriptioInput.value=expenses[index].description;

    editIndex=index
}
   function  deleteExpenses(index){
    expenses.splice(index,1);
    displayExpense();
    updateSummary();
}

displayExpense();
updateSummary();