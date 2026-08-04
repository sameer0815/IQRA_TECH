const projects = [
    {
        name: "Employee Database",
        link: "./employee-record/"
    },
    {
        name: "Expense Tracker",
        link: "./expanse/"
    },
    {
        name: "Registration Form",
        link: "./formValidation/"
    },
    {
        name: "OTP Generator",
        link: "./OTP-Project/"
    },
    {
        name: "Pagination",
        link: "./pagination/"
    },
    {
        name: "Task Scheduler",
        link: "./Task-Sheduler/"
    },
    {
        name: "Budget Management",
        link: "./IT-Budget/"
    },
    {
        name: "Customer Capture",
        link: "./Customer-Capture-2/"
    },
    {
        name: "Sortable Filter Table",
        link: "./sortable-filter-table/"
    }
];

const projectContainer = document.querySelector(".projects");

projects.forEach(function(project){

    const card = document.createElement("div");

    card.className = "project-card";

    card.innerHTML = `
        <h3>${project.name}</h3>
        <a href="${project.link}" target="_blank">Open Project</a>
    `;

    projectContainer.appendChild(card);

});