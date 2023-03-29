let form = document.getElementById("login-form");
let userData=[];

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    loginDataCheck();
})

function loginDataCheck(){
    fetch(`https://newser-o48u.onrender.com/signup`)
    .then(res=>res.json())
    .then((data)=>{
        userData=data;
        if(check(userData)){
            alert("Login successfull")
            window.location.href="#";
        }
        else{
            alert("Please write correct ID and Password")
        }
    })
}

function check(data){
    for(let i=0;i<data.length;i++){
        if(document.getElementById("login-password").value==data[i]["password"] && document.getElementById("login-email").value==data[i]["email"]){
            storeLoginData();
            return true;
        }
    }
    return false;
}


function storeLoginData(){
    let password = document.getElementById("login-password").value;
    let email = document.getElementById("login-email").value;
    let newobj = {
        password:password,
        email:email,
    }
     fetch(`https://newser-o48u.onrender.com/login`,{
        method:"POST",
        body:JSON.stringify(newobj),
        headers:{
            'Content-type': 'application/json',
        }
     }).then((res)=>{
        return res.json();
     })
     .then((data)=>{
        // console.log(data)
     })
}