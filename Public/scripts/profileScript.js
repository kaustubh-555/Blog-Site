let uname = document.getElementById("username")
let role=document.getElementById("role")
let gender=document.getElementById("gender")

let allCookies = document.cookie;
allCookies=allCookies.split(';')
let accessToken;
for(let i=0;i<allCookies.length;i++){
    let coo = allCookies[i].trim();
    if(coo.indexOf("AccessToken")==0){
        accessToken=coo.substring(12);
        console.log(accessToken)
        break
    }
}

if(accessToken==undefined){
    confirm("Please Login to view profile")
    document.location.href="./index.html"
}
else{
    fetch("http://localhost:3500/userdetails",
    {
        method: 'GET',
        headers: {"Content-Type":"application/json"},
    }
    ).then(response=>{
        return response.json()
    }).then(data=>{
        uname.innerText=data.username;
        role.innerText=data.role;
        gender.innerText=data.gender;
        console.log(data)
    })
}

let logoutBtn=document.getElementById("logoutBtn")
logoutBtn.addEventListener("click",(e)=>{
    document.cookie="AccessToken = k; expires=Thu, 01 Jan 1970 00:00:00 UTC"
    document.location.href="./index.html"
    e.preventDefault();
})