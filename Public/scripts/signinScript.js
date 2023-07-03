let signinBtn=document.getElementById("signinBtn");
signinBtn.addEventListener('click',(e)=>{
    let userData ={
    username : document.getElementById("username").value,
    password : document.getElementById("password").value,
    gender : document.querySelector('input[name="gender"]:checked').value,
    role : document.getElementById("role").value
    }
    console.log(userData)
    fetch('http://localhost:3500/signin',
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body : JSON.stringify(userData)

    }).then((response)=>{
        return response.json()
    }).then(json=>{
        console.log(json);
        document.location.href="./login.html"
    })
    e.preventDefault();
})
