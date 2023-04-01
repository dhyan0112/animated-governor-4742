let nurl="https://newser-o48u.onrender.com/product";

let category_class=document.querySelectorAll(".cb");

for(let i=0;i<category_class.length;i++)
{
    category_class[i].addEventListener("click",()=>{
    // console.log(category_class[i].checked);
    // console.log(category_class[i]["className"].split(" "));
  category(category_class[i]);  
})
}

let lurl=`${nurl}?type=women`;
let pagination=document.getElementById("product_pagination");
let contain=document.getElementById("product_container");
let priceSort=document.getElementById("priceSort");
let totalsize;
getlength(lurl);

function getlength(lurl)
{
fetch(lurl).then((res)=>{
    return res.json();
}).then((data)=>{
    totalsize=data.length;
}).catch((err)=>{
    console.log(err);
})
}

    urlfun(1);
function urlfun(pagenum)
{
    url=`${nurl}?_limit=9_&_page=${pagenum}&type=women`;
    
fetch(url).then((res)=>{
    return res.json();
}).then((data)=>{
    let btn=Math.ceil(totalsize/9);
    pagination.innerHTML=null;
    for(let i=1;i<=btn;i++)
    {
        pagination.append(createbtn(i));
    }
contain.innerHTML="";
    displayPage(data);
}).catch((err)=>{
    console.log(err);
});
}


function urlfun1(pagenum)
{
    // console.log(nurl);
    url=`${nurl}&_limit=9_&_page=${pagenum}&type=women`;
fetch(url).then((res)=>{
    return res.json();
}).then((data)=>{
    let btn=Math.ceil(totalsize/9);
    pagination.innerHTML=null;
    for(let i=1;i<=btn;i++)
    {
        pagination.append(createbtn1(i));
    }
contain.innerHTML="";
    displayPage(data);
}).catch((err)=>{
    console.log(err);
});
}





function displayPage(productData) {

    document.getElementById("product_container").innerHTML = "";

    productData.map(function(elem) {
        var box = document.createElement("div")
        box.style.cursor = "pointer"

        var img = document.createElement("img")
        img.src = elem.image;

        var contentBox = document.createElement('div');
        contentBox.setAttribute('class', 'contentBox')

        var brand = document.createElement("h4")
        brand.textContent=elem.type;

        var productname = document.createElement("p")
        productname.textContent = elem.category


        var mix = document.createElement("div")
        mix.setAttribute("class", "mixbox")


        var price = document.createElement("p")
        price.textContent = `$ ${elem.price}`;

        var offer = document.createElement("p")
        offer.textContent = "(55% OFF)";
        offer.style.color="orange";
        offer.setAttribute("class", "offerp")

        mix.append(price,price,offer)

    
      
        var atc = document.createElement("p")
        atc.setAttribute("class", "addToBagp")
        atc.textContent = "Add To BAG";
        atc.style.cursor = "pointer"


        atc.addEventListener("click", function() {
            atc.innerText="Added To Cart";
          product_cart(elem);
        })

        contentBox.append(brand, productname, mix,atc)

        box.append(img, contentBox)

        document.querySelector("#product_container").append(box);



    });
}

priceSort.addEventListener("click",(e)=>{
    e.preventDefault();
    nurl="https://newser-o48u.onrender.com/product";
//   console.log(priceSort.value);
  if(priceSort.value==="---")
  {
    urlfun();
  }
  else
  {
    // console.log(priceSort.value);
    if(priceSort.value==="lth")
    {
        nurl=`${nurl}?_sort=price&_order=asc`;
    fetch(`${nurl}`).then((res)=>{
        return res.json();
      }).then((data)=>{
        // console.log(data,nurl);
        urlfun1(1);
      }).catch((err)=>{
        console.log(err);
      })
    }

    if(priceSort.value==="htl"){
        nurl=`${nurl}?_sort=price&_order=desc`;
        fetch(`${nurl}`).then((res)=>{
            return res.json();
          }).then((data)=>{
            // console.log(data,"hhhhhhhhhhhhhhhhhhh\n....",nurl);
            urlfun1(1);
          }).catch((err)=>{
            console.log(err);
          })
    }
  }
})

function createbtn(i)
{
    let btn=document.createElement("button");
    btn.innerText=i;
    btn.setAttribute("class","pagina_btn");

    btn.addEventListener("click",()=>{
        urlfun(i);
    });
    // console.log(btn);
    return btn;
}

function createbtn1(i)
{
    let btn=document.createElement("button");
    btn.innerText=i;
    btn.setAttribute("class","pagina_btn");

    btn.addEventListener("click",()=>{
        urlfun1(i);
    });
    // console.log(btn);
    return btn;
}



function product_cart(elem)
{
    fetch("https://newser-o48u.onrender.com/cart",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(elem)
       })
       .then((res)=>res.json())
       .then((data)=>{
        // console.log(data);
       }).catch((error)=>{
        console.log(error)
       })
}




function category(data)
{
    nurl="https://newser-o48u.onrender.com/product";
    let obj={};
    category_class.forEach((ele)=>{
        // console.log(ele.checked);
        let classn=ele["className"].split(" ");
        if(ele.checked)
        {
            let data=document.querySelectorAll(`.${classn[0]}`);
            if(obj[data[1].innerText]==undefined)
            obj[data[1].innerText]=1;
            else
            {
            obj[data[1].innerText]++;
            }
        }
    })

 nurl=`${nurl}?category`;
//  console.log(nurl);
  for(let key in obj)
  {
    // console.log(key);
   nurl+=`&category=${key}`;
  }
//   console.log(nurl);
  fetch(`${nurl}`).then((res)=>{
    return res.json();
  }).then((data)=>{
    // console.log(data);
    getlength(nurl);
    urlfun1(1);
  }).catch((err)=>{
    // console.log(err);
  });
    // console.log("hii",data);   
}