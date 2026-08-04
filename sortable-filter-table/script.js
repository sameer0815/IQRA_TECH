const searchInput=document.getElementById("searchInput");
const dataTable=document.getElementById("dataTable");

console.log(searchInput);
console.log(dataTable);

function searchTable(){
    const filter=searchInput.value.toLowerCase();
    const rows=dataTable.getElementsByTagName("tr");

    for(let i=1;i<rows.length;i++){
        const rowText=rows[i].innerText.toLowerCase();
        console.log(rowText)
        
        if(rowText.includes(filter)){
            rows[i].style.display="";
        }else{
            rows[i].style.display="none";
        }
        
    }
}

function sortTable(columnIndex){
    const tbody=dataTable.querySelector("tbody");
    const rows=Array.from(tbody.rows);

    rows.sort(function(rowA,rowB){
        let  cellA=rowA.cells[columnIndex].innerText.toLowerCase();
        let  cellB=rowB.cells[columnIndex].innerText.toLowerCase();


        return  cellA.localeCompare(cellB);
    })

    rows.forEach(function(row){
        tbody.appendChild(row)
    })

}