const nameInput=document.getElementById("name");
const inputEmail=document.getElementById("email")
const customerType=document.getElementById("csType");
const amountInput=document.getElementById("amount");
const amountRow=document.getElementById("amt")
const existingTableBody=document.querySelector("#existingTable tbody");
const newTableBody=document.querySelector("#newTable tbody")

let existingCustomers=[];
let newCustomers=[];

function changeCT(){
    if(customerType.value==="existing"){
        amountRow.style.display="table-row";
        
    }else{
        amountRow.style.display="none";
    }
}

function validateForm(){
    if(nameInput.value.trim()===""){
        alert("Please Enter Name");
        return false;

    }
    if(inputEmail.value.trim()===""){
        alert("Please Enter Email");
        return false ;
    }
    if(customerType.value===""){
        alert("please Select Customer Type")
        return false;
    }
    if(customerType.value==="existing"&&amountInput.value.trim()===""){
        alert("Please Enter Amount");
        return false;
    }

    return true;

}

function submitForm(){
    if(!validateForm()){
        return;
    }
    if(customerType.value==="existing"){
        addExistingCustomer();
    }
    else
    {
        addNewCustomer();
    }
    clearForm();
}

function addExistingCustomer(){
    const row=document.createElement("tr");

    row.innerHTML=`
        <td>${nameInput.value}</td>
        <td>${inputEmail.value}</td>

        <td>${amountInput.value}</td>
        <td>
            <button onclick="removeCustomer(this)" class="btn btn-danger btn-sm">Remove
            </button>
        </td>
    `;
    existingTableBody.appendChild(row);
}

function addNewCustomer(){
    const row=document.createElement("tr");
    row.innerHTML=
    `
    <td>${nameInput.value}</td>
    <td>${inputEmail.value}</td>
    <td>
     <button onclick="approveCustomer(this)" class="btn btn-primary btn-sm">Approve</button>
    </td>

    `;
    newTableBody.appendChild(row);
}

function approveCustomer(button){
    const row=button.parentElement.parentElement;
    const name=row.cells[0].innerText;
    const email=row.cells[1].innerText;
    const amount=prompt("Enter Amount");
    if(amount===null ||amount.trim()===""){
        return;
    }
    const newRow=document.createElement("tr");

    newRow.innerHTML=`
     <td>${name}</td>
     <td>${email}</td>
     <td>${amount}</td>
     <td>
        <button onclick="removeCustomer(this)"class="btn btn-danger btn-sm">
        Remove</button>
     </td> 

    `;
    existingTableBody.appendChild(newRow);
    row.remove();
}

function removeCustomer(button){
    const row=button.parentElement.parentElement;

    row.remove();
}

function clearForm(){
    nameInput.value="";
    inputEmail.value="";
    customerType.value="";
    amountInput.value="";

    amountRow.style.display="none";
    nameInput.focus();
}