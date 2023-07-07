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
let accessToken;
for(let i=0;i<allCookies.length;i++){
    let coo = allCookies[i].trim();
    if(coo.indexOf("AccessToken")==0){
        accessToken=coo.substring(12);
        console.log(accessToken)
        break
    }
}

let loginStrip=document.getElementById("authStrip")
let usernameDisplay=document.getElementById("username-display")
const refresh=()=>{
    fetch("http://localhost:3500/refresh",
    {
        method: 'GET',
        headers: {"Content-Type":"application/json"},
    }
    ).then(response=>{
        return response.json()
    }).then(data=>{
        document.cookie = `AccessToken=${data.AccessToken}`;
    })
    update()
}
let add=document.getElementById("create")
const update=()=>{
    loginStrip.remove()
}
const auth=()=>{
    fetch("http://localhost:3500/auth",
    {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({"AccessToken":accessToken})
    }
    ).then(response=>{
        return response.json()
    }).then(data=>{
        if(data.status=='verified'){
            update()
        }
        else if(data.status=='expired'){
            refresh()
        }
        else{
            document.cookie="AccessToken = k; expires=Thu, 01 Jan 1970 00:00:00 UTC"
            // document.location.href="./index.html"
            console.log("logged Out!")
        }
        console.log(data)
    })
}
if(accessToken!=undefined){
    auth()
}

add.addEventListener('click',(e)=>{
    e.preventDefault();
    if(accessToken==undefined){
        confirm("Please login to write a blog")
    }
    else{
        document.location.href="./create.html"
    }
})