let loginBtn = document.getElementById("loginBtn");
let usernamefeild=document.getElementById("username");
let passwordfeild=document.getElementById("password");

loginBtn.addEventListener('click',(e)=>{
    usernamefeild=usernamefeild.value;
    passwordfeild=passwordfeild.value;
    fetch('http://localhost:3500/login',
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body : JSON.stringify({
            username : usernamefeild,
            password : passwordfeild
        })

    }).then((response)=>{
        return response.json()
    }).then(json=>{
        document.cookie = `AccessToken=${json.AccessToken}`;
        console.log(json);
        document.location.href="./index.html"
    })
    e.preventDefault();
})