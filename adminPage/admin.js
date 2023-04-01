let productContainer=document.getElementById("admin-product-container");
let paginationContainer=document.getElementById("admin-pagination-button");
let tbody=document.querySelector("tbody");

let filterByType=document.getElementById("filter-by-type")
let filterByCategory=document.getElementById("filter-by-category");
let sortByPrice=document.getElementById("sort-by-price");

// /products/?category=${Category}

let arr=[];
let page=1;
let category=""
window.addEventListener('load',()=>{
    fetchAndRender()
})

filterByCategory.addEventListener('change',()=>{
    if(!filterByCategory.value){
        category="";
    }else{
        category=`?category=${filterByCategory.value}`
    }
    fetchAndRender();
})

filterByType.addEventListener('change',()=>{
    if(!filterByType.value){
        category="";
    }else{
        category=`?type=${filterByType.value}`
    }
    fetchAndRender();
})

sortByPrice.addEventListener("change",()=>{
    // console.log(arr);
    if(sortByPrice.value="lowToHigh"){
        arr=arr.sort((a,b)=>a.price-b.price)
    }else{
        arr=arr.sort((a,b)=>b.price-a.price)
    }
    console.log(sortByPrice.value)
    dataCall(arr);
})

function fetchAndRender(){
    fetch(`https://newser-o48u.onrender.com/product/${category}`)
    .then(res=>res.json())
    .then((data)=>{
        arr=data;
        dataCall(arr)
    })
}

function dataCall(arr){
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
}

function render(data){
    tbody.innerHTML="";
    data.map((ele,ind)=>{
        tbody.append(createRow(ele,ind))
    })
}

function createRow(ele,ind){
    let tr=document.createElement('tr');
    let image=document.createElement('td');
    let brand=document.createElement('td');
    let description=document.createElement('td');
    let price=document.createElement('td');
    let category=document.createElement('td');
    let type=document.createElement('td');
    let editCol=document.createElement('td');
    let deleteCol=document.createElement('td');
    
    editColBtn=document.createElement("button");
    editColBtn.innerHTML="Edit"
    editColBtn.classList.add("editColBtn")

    editCol.append(editColBtn);
    editCol.addEventListener("click",()=>{
        editColData(ele.id)
    })


    deleteColBtn=document.createElement("button");
    deleteColBtn.innerHTML="Delete"
    deleteColBtn.classList.add("deleteColBtn");

    deleteCol.append(deleteColBtn);
    deleteCol.addEventListener('click',()=>{
        deleteColData(ele.id);
    })
    
    let imgTag=document.createElement('img');
    imgTag.setAttribute("src",ele.image);
    imgTag.classList.add("product-image");
    
    image.append(imgTag);
    brand.innerHTML=ele.title;
    description.innerHTML=ele.description;
    price.innerHTML=ele.price;
    category.innerHTML=ele.category;
    type.innerHTML=ele.type;

    tr.append(image,brand,description,price,category,type,editCol,deleteCol)

    return tr;
}

function getButton(i){
    let btn=document.createElement("button");
    btn.classList.add('pagination-btn');
    btn.innerHTML=i;

    btn.addEventListener('click',()=>{
        // tbody.innerHTML=""
        page=i;
        fetchAndRender()
    })

    return btn
}

function editColData(id){
    document.getElementById("image").style.display="none"
    document.getElementById("brand").style.display="none"
    document.getElementById("description").style.display="none"

    document.getElementById("headingOfFormData").innerHTML="Edit the data";

    document.getElementById("submit-btn").addEventListener("click",(e)=>{
        e.preventDefault();
        let obj={
            price:document.getElementById("price").value,
            category:document.getElementById("category").value,
            type:document.getElementById("type").value,
        }
        if(obj.price=="" || obj.category=="" || obj.type==""){
            alert("Please fill the value")
        }else{
            fetch(`https://newser-o48u.onrender.com/product/${id}`,{
                method:"PATCH",
                body:JSON.stringify(obj),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(res=>res.json())
            .then((data)=>{
                alert("Data is editColed successfully");
                console.log(data);
                fetchAndRender()
                document.getElementById("image").style.display="block"
                document.getElementById("brand").style.display="block"
                document.getElementById("description").style.display="block"
                document.getElementById("price").value=""
                document.getElementById("category").value=""
                document.getElementById("type").value=""
            })
        }
    })
}

function deleteColData(id){
    fetch(`https://newser-o48u.onrender.com/product/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res=>res.json())
    .then((data)=>{
        console.log(data);
        alert("Data is deleted successfully");
        fetchAndRender()
    })
}

document.getElementById("submit-btn").addEventListener("click",(e)=>{
    e.preventDefault()
    let image=document.getElementById("image").value;
    let brand=document.getElementById("brand").value;
    let description=document.getElementById("description").value;
    let price=document.getElementById("price").value;
    let category=document.getElementById("category").value;
    let type=document.getElementById("type").value;
    // console.log(image,brand,description,price,category,type);
    if(!image || !brand || !description || !price || !category || !type){
        alert("Value should not be empty , Please fill all the input")
    }else{
        let obj={
            image,
            title:brand,
            description,
            price,
            category,
            type
        }
        fetch(`https://newser-o48u.onrender.com/product`,{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data);
            alert("New product added succesfully")
        })
    }
})

// {
//     "image": "https://bit.ly/3uHGEnN",
//     "title": "Anouk",
//     "description": "Women Pink Self Design Kurta with Trousers & Dupatta",
//     "price": 791,
//     "category": "kurta",
//     "type": "women",
//     "id": "6037ae90ae0"
//   }