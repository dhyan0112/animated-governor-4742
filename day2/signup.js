console.log("working")
let form = document.getElementById("form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let name = document.getElementById("signup-name").value;
    let password = document.getElementById("signup-password").value;
    let email = document.getElementById("signup-email").value;
    let number = document.getElementById("signup-number").value;
    let newobj = {
        username : name,
        password:password,
        email:email,
        number:number
    }
    form.reset();
     fetch(`https://newser-o48u.onrender.com/signup`,{
        method:"POST",
        headers:{
            'Content-type': 'application/json',
        },
        body:JSON.stringify(newobj)
     }).then((res)=>{
        return res.json();
     })
     .then((data)=>{
        // console.log(data)
        alert("Account created successfully")
        // window.Location.href="./login.html"
        window.location.href="./login.html";
     })
})