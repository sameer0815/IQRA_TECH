const employeeForm=document.getElementById("employeeForm")
const nameInput =document.getElementById("name")
const ageInput=document.getElementById("age")
const emailInput=document.getElementById("email")
const department=document.getElementById("department")
const searchInput=document.getElementById("searchInput")
const employeeTableBody=document.getElementById("employeeTableBody")

const employees=[]
let editIndex=-1;

function validateForm(){
    if(nameInput.value.trim()===""){
        alert("Please Enter Name")
        return false
    }
    if(ageInput.value==="")
    {
        alert("Please Enter Age")
        return false
    }
    if(emailInput.value.trim()===""){
        alert("Please Enter Email")
        return false;
    }
    if(department.value.trim()===""){
        alert("Please Enter Department")
    return false;
    }
    return true;
}
function addEmployee(){
    if(!validateForm()){
        return
    }

    const employee={
        name :nameInput.value,
        age:ageInput.value,
        email:emailInput.value,
        department:department.value
    };
    if(editIndex===-1){
        employees.push(employee);
    }else{
        employees[editIndex]=employee;
    }
    displayEmployee();
    clearForm();
}

function displayEmployee(){

    employeeTableBody.innerHTML="";
    employees.forEach(function(employee,index){
        const row=document.createElement("tr");

        row.innerHTML=`
        <td>${employee.name}</td>
        <td>${employee.age}</td>
        <td>${employee.email}</td>
        <td>${employee.department}</td>
        <td>
            <button onclick="editEmployee(${index})">Edit</button>
            <button onclick="deleteEmployee(${index})">Delete</button>

        </td>
        `;
        employeeTableBody.appendChild(row);


    });

}
function clearForm()
{
    employeeForm.reset();
    editIndex=-1;
}

function editEmployee(index){
    nameInput.value=employees[index].name;
    ageInput.value=employees[index].age;
    emailInput.value=employees[index].email;
department.value=employees[index].department;

editIndex=index;


}

function deleteEmployee(index){
    employees.splice(index,1);
    displayEmployee();

}

function searchEmployee(){
    const searchValue=searchInput.value.toLowerCase();

    const rows=employeeTableBody.getElementsByTagName("tr");

    for(let i=0;i<rows.length;i++){
        const rowText=rows[i].innerText.toLowerCase();

        if(rowText.includes(searchValue)){
            rows[i].style.display="";
        }
        else{
            rows[i].style.display="none";
        }
    }
}