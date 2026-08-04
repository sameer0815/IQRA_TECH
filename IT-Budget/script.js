const subjectInput = document.getElementById("subject");
const budgetSelect = document.getElementById("budget");
const budgetAmount = document.getElementById("budgetamt");
const remainingBudget = document.getElementById("remaining");
const amountInput = document.getElementById("amount");
const balanceInput = document.getElementById("balance");

const tableBody = document.getElementById("tableBody");
const totalBudgets = document.getElementById("nfe");
const errorMsg = document.querySelector(".error");

const budget = {
  budget1: 10000,
  budget2: 20000,
};
const remaining={
    budget1:10000,
    budget2:20000
}
function selectBudget() {
  const selectedBudget = budgetSelect.value;

  errorMsg.innerText = "";

  if (selectedBudget === "0") {
    budgetAmount.value = "";
    remainingBudget.value = "";
    amountInput.value = "";
    balanceInput.value = "";
    return;
  }
  budgetAmount.value = budget[budgetSelect.value];
  remainingBudget.value = remaining[budgetSelect.value];

  if (remaining[budgetSelect.value] === 0) {
    amountInput.disabled = true;
    amountInput.value = "";
    balanceInput.value = "";
    errorMsg.innerText = "Budget amount is 0";
} else {
    amountInput.disabled = false;
    errorMsg.innerText = "";
}
}

function updateBalance() {
  errorMsg.innerText = "";
  if (amountInput.value === "") {
    balanceInput.value === "";
    return;
  }

  const remaining = Number(remainingBudget.value);
  const amount = Number(amountInput.value);
  if (isNaN(amount)) {
    errorMsg.innerText = "Please Enter Valid Number";
    balanceInput.value = "";
    return;
  }

  if (amount > remaining) {
    errorMsg.innerText = "Amount cannot be greater than Remaining Budget";
    balanceInput.value = "";
    return;
  }
  balanceInput.value = remaining - amount;
}

function validateForm() {
  errorMsg.innerText = "";
  if (subjectInput.value.trim() === "") {
    errorMsg.innerText = "Please Enter Subject";
    subjectInput.focus();
    return false;
  }
  if (budgetSelect.value === "0") {
    errorMsg.innerText = "please Select Budget";
    budgetSelect.focus();
    return false;
  }
  if (amountInput.value.trim() === "") {
    errorMsg.innerText = "Please Ener Amount";
    amountInput.focus();
    return false;
  }
  const amount = Number(amountInput.value);
  const remaining = Number(remainingBudget.value);

  if (isNaN(amount)) {
    errorMsg.innerText = "Please Enter Valid Number";
    amountInput.focus();
    return false;
  }
  if (amount <= 0) {
    errorMsg.innerText = "Amount should be greater than 0";
    amountInput.focus();
    return false;
  }
  if (amount > remaining) {
    errorMsg.innerText = "Amount cannot be greater than Remaining Budget";
    amountInput.focus();
    return false;
  }

  return true;
}

function submitForm(event){
    event.preventDefault();
    if(!validateForm()){
        return
    }
    addRow();
    clearForm();
}

function addRow(){

    const row=document.createElement("tr");
    row.innerHTML=`<td>${subjectInput.value}</td>
    <td>${budgetSelect.options[budgetSelect.selectedIndex].text}</td>
    <td>${amountInput.value}</td>
    <td>${balanceInput.value}</td>
    <td>
        <button class="btn btn-danger btn-sm" onClick="removeRow(this)">Remove</button>
    </td>`;
    tableBody.appendChild(row);

    remaining[budgetSelect.value]=Number(balanceInput.value);

    remainingBudget.value=budget[budgetSelect.value];

    

    totalBudgets.innerText=tableBody.rows.length;
}

function removeRow(button){
    const row=button.parentElement.parentElement;

    const budgetName=row.cells[1].innerText;
    const amount=Number(row.cells[2].innerText)

    let budgetKey="";

    if(budgetName==="Budget 1"){
        budgetKey="budget1";

    }else{
        budgetKey="budget2";
    }

    //budget restore

    remaining[budgetKey]+=amount;

    if(budgetSelect.value===budgetKey){
        remainingBudget.value=remaining[budgetKey]
    }

    if(remaining[budgetKey]>0){
        amountInput.disabled=false;
        errorMsg.innerText="";
    }
    row.remove();

    totalBudgets.innerText=tableBody.rows.length;
}
function clearForm() {

    subjectInput.value = "";
    budgetSelect.value = "0";
    budgetAmount.value = "";
    remainingBudget.value = "";
    amountInput.value = "";
    balanceInput.value = "";

    errorMsg.innerText = "";

    subjectInput.focus();
}