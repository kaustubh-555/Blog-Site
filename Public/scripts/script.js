let count =0;
let blogsList = document.getElementsByClassName("blogs")
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
let allCookies = document.cookie;
allCookies=allCookies.split(';')
let accessToken=false;
let refreshToken=false;
for(let i=0;i<allCookies.length;i++){
    let coo = allCookies[i].trim();
    if(coo.indexOf("AccessToken")==0){
        accessToken=coo.substring(12);
        break
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
            document.cookie=`AccessToken: ${data.accessToken}`
            accessToken=data.accessToken;
            checkAccessToken();
        }
        else{
            console.log("failed !")
        }
    })
}