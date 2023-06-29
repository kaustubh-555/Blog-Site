let count =0;
let usernameDisplay=document.getElementById("username-display")
let blogsList = document.getElementsByClassName("blogs")
let allCookies = document.cookie;
allCookies=allCookies.split(';')
let accessToken=false;
let refreshToken=false;
let use=""
blogsList=Array.from(blogsList)
blogsList.forEach(element=>{
    element.addEventListener('click',(e)=>{
        document.location.href="./blog.html"
        e.preventDefault();
    })
})
blogsList = document.querySelectorAll(".suggestionBlogs")
blogsList=Array.from(blogsList);
blogsList.forEach(element=>{
    element.addEventListener('click',(e)=>{
        document.location.href="./blog.html"
        e.preventDefault();
    })
})
for(let i=0;i<allCookies.length;i++){
    let coo = allCookies[i].trim();
    if(coo.indexOf("AccessToken")==0){
        accessToken=coo.substring(12);
        console.log(accessToken)
        break
    }
    if(coo.indexOf("username")==0){
        use=coo.substring(9)
    }
}
let loginStrip=document.getElementById("authStrip")
let AuthStatus=false;
function checkAccessToken(){
    if(count ==5){
        return
    }
    fetch('/auth',{
        method: 'POST',
        headers : {'Content-Type':'application/json'},
        body: JSON.stringify({"token": accessToken})
    }).then(response=>{
        return response.json()
    }).then(data=>{
        console.log(data);
        if(data.status=="verified"){
            loginStrip.remove()
            usernameDisplay.innerHTML=use
            AuthStatus=true;
        }
        else{
            count++;
            refresh();
        }
    })
}
if(accessToken!=false){
    checkAccessToken()
}
function refresh(){
    fetch('/refresh',{
        method: 'GET',
        headers : {'Content-Type':'application/json'},
    }).then(response=>{
        return response.json()
    }).then(data=>{
        if(data.status==true){
            console.log({"accessToken" : data.accessToken})
            document.cookie=`AccessToken= ${data.accessToken}`
            accessToken=data.accessToken;
            usernameDisplay.innerHTML=data.username;
            checkAccessToken();
        }
        else{
            console.log(data.status)
        }
    })
}