let carturl="https://newser-o48u.onrender.com/cart";
let totalprice=document.getElementById("cart_totalprice");
let discount=document.getElementById("cart_filldiscount");
let finalprice=document.getElementById("amount_pay");
let apply=document.getElementById("cart_apply");
let coupon=document.getElementById("cart_promo");
let placeorder=document.getElementById("cart_makeorder");
let cartarr=[];
url1();
function url1()
{

fetch(carturl).then((res)=>{
    return res.json();
}).then((data)=>{
    cartarr=data;
    cart();
}).catch((err)=>{
    console.log(err);
})
}


function cart(data)
{
  document.querySelector(".container").innerHTML="";
  let sum=0;
  totalprice.innerText=sum;
        cartarr.map(function(ele,ind){
          sum+=ele.price;
            var box = document.createElement("div");
            box.className ="cart_main"
          
            var imgbox = document.createElement("div");
            
            var image =document.createElement("img");
            image.src = ele.image;
           imgbox.append(image)

          var detailsbox = document.createElement("div");

          var name =document.createElement("p");
          name.innerText=ele.title;
          name.style.fontSize="20px";
          name.style.marginBottom ="-8px"


          var para =document.createElement("p");
          para.innerText=ele.category;
          para.style.color="red"

          var price = document.createElement("span");
          price.innerText = `$${ele.price}`;

          var offer = document.createElement("span");
          offer.innerText ="55%";
          offer.style.color="red";


          var pricepara =document.createElement("p");
          pricepara.append(price);
          
          detailsbox.append(name,para,pricepara,offer)

          var buttonbox = document.createElement("div");
          
          var remove =document.createElement("button");

          remove.innerText ="REMOVE";
          remove.addEventListener("click",function(){
         let option={
            method:"DELETE"
          }
          fetch(`https://newser-o48u.onrender.com/cart/${ele.id}`,option);

           url1();
          })
          
          buttonbox.append (remove)
          
          
          
          box.append(imgbox,detailsbox,buttonbox)

        document.querySelector(".container").append(box)

        })
        totalprice.innerText=sum;
        
        finalprice.innerText=Math.ceil(sum-(sum/100)*50);
        discount.innerText=Math.ceil((sum/100)*50);

        apply.addEventListener("click",()=>{
            coup=coupon.value;
            if(coup==="MYNTRA300")
            {
              totalprice.innerText=(sum-(Math.ceil(sum/2)));
              coupon.value="";
            }
            else
            {
              alert("Invalid coupon");
              coupon.value="";

            }
        })

}


placeorder.addEventListener("click",()=>{
  for(let i=0;i<cartarr.length;i++)
  {
  let option={
    method:"DELETE"
  }
  fetch(`https://newser-o48u.onrender.com/cart/${cartarr[i].id}`,option).then((res)=>{
    return res.json();
  }).then((data)=>{
  }).catch((err)=>{
    console.log(err);
  })
}

alert("order placed sucessfully");
   url1();
   window.location.href="../index.html";
})
