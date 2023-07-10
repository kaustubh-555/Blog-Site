let blogsList = document.getElementById("blogList")

fetch("/homeBlogs",{
    method: 'GET',
    headers: {"Content-Type":"application/json"},
}).then(response=>{
    return response.json();
}).then(data=>{
    console.log(data)
    let images=["one.jpg","two.jpg","three.jpg","four.jpg","five.jpg"]
    let count=0;
    data.forEach(element=>{
        if(count>4){
            count=0;
        }
        
        let newblog=document.createElement('div');
        newblog.className="blogs";
        
        let blogtitle=document.createElement('div');
        blogtitle.className="blogTitle";
        
        let blogImage=document.createElement('div');
        blogImage.className="blogImage";
        
        let blogimg=document.createElement('img');
        blogimg.src="./images/"+images[count];
        blogimg.width=800
        blogimg.height=500
        
        blogtitle.textContent=element.title
        
        blogImage.appendChild(blogimg)
        newblog.appendChild(blogImage)
        newblog.appendChild(blogtitle)
        blogsList.appendChild(newblog)

        newblog.addEventListener('click',(e)=>{
            e.preventDefault();
            let val=element._id
            let url="./blog.html?id="+encodeURIComponent(val)
            window.location.href=url
        })

        count++;
    })
})



let allBlogs=document.getElementsByClassName("blogs")
allBlogs=Array.from(allBlogs)
allBlogs.forEach(element=>{
    element.addEventListener('click',(e)=>{
        document.location.href="./blog.html"
        e.preventDefault();
    })
})

allBlogs = document.querySelectorAll(".suggestionBlogs")
allBlogs=Array.from(blogsList);

allBlogs.forEach(element=>{
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
            document.location.href="./index.html"
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