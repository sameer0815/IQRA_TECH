const itemList=document.getElementById("itemList");
const prevBtn=document.getElementById("prevBtn")
const nextBtn=document.getElementById("nextBtn")
const pageNumbers=document.getElementById("pageNumbers")

const items=[];
const itemsPerPage=10;
let currentPage=1;
const totalItems=100;


for(let i=1;i<=totalItems;i++){
    items.push("Item " + i)
}

function displayItems(){
    itemList.innerHTML="";

    const startIndex=(currentPage-1)*itemsPerPage;

    const endIndex=startIndex+itemsPerPage;

    const currentItems=items.slice(startIndex,endIndex)

    currentItems.forEach(function(item){
        const li=document.createElement("li")
        li.innerText=item;
        itemList.appendChild(li);
    })
}

function displayPagination(){
    pageNumbers.innerHTML="";

    const totalPages=Math.ceil(totalItems/itemsPerPage);

    for(let i=1;i<=totalPages;i++){
        const button=document.createElement("button")
        button.innerText=i;
        button.onclick=function(){
            currentPage=i;
            displayItems();
        };
        pageNumbers.appendChild(button);
    }

    prevBtn.onclick=function(){
        if(currentPage>1){
            currentPage--;
            displayItems();
        }
    };

    nextBtn.onclick=function(){
        if(currentPage<totalPages){
            currentPage++;
            displayItems();
        }
    };
}
displayItems();
displayPagination();