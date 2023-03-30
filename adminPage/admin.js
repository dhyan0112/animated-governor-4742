let productContainer=document.getElementById("admin-product-container");
let paginationContainer=document.getElementById("admin-pagination-button");
let tbody=document.querySelector("tbody");

let filterByType=document.getElementById("filter-by-type")
let filterByCategory=document.getElementById("filter-by-category");
let sortByPrice=document.getElementById("sort-by-price");

let arr;
window.addEventListener('load',()=>{
    fetchAndRender(1)
})


function fetchAndRender(page){
    fetch(`https://newser-o48u.onrender.com/product`)
    .then(res=>res.json())
    .then((data)=>{
        arr=data;
        let totalBtn=Math.ceil(arr.length/10)
        let showData=[];
        for(let i=(page-1)*10;i<page*10;i++){
            if(arr[i]==undefined)break;
            showData.push(arr[i]);
        }

        paginationContainer.innerHTML="";
        for(let i=1;i<=totalBtn;i++){
            let btn=getButton(i)
            paginationContainer.append(btn);
        }
        render(showData);
    })
}


function render(data){
    tbody.innerHTML="";
    data.map((ele,ind)=>{
        let tr=document.createElement('tr');
        let image=document.createElement('td');
        let brand=document.createElement('td');
        let description=document.createElement('td');
        let price=document.createElement('td');
        let category=document.createElement('td');
        let type=document.createElement('td');
        let editBtn=document.createElement('td');
        let deleteBtn=document.createElement('td');
        
        editBtn.textContent="Edit";
        // editBtn.addEventListener("click",()=>{
        //     // console.log("working");
        //     fetch(`https://newser-o48u.onrender.com/product/${ele.id}`)
        //     .then(res=>res.json())
        //     .then((data)=>{
        //         console.log(data);
        //     })
        // })


        deleteBtn.textContent="Delete";
        
        let imgTag=document.createElement('img');
        imgTag.setAttribute("src",ele.image);
        imgTag.classList.add("product-image");
        
        image.append(imgTag);
        brand.innerHTML=ele.title;
        description.innerHTML=ele.description;
        price.innerHTML=ele.price;
        category.innerHTML=ele.category;
        type.innerHTML=ele.type;

        tr.append(image,brand,description,price,category,type,editBtn,deleteBtn)

        tbody.append(tr);
    })
}

function getButton(i){
    let btn=document.createElement("button");
    btn.classList.add('pagination-btn');
    btn.innerHTML=i;

    btn.addEventListener('click',()=>{
        // tbody.innerHTML=""
        fetchAndRender(i)
    })

    return btn
}

