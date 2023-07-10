let user;
let allCookies = document.cookie;
allCookies=allCookies.split(';')
let accessToken;
let submitBtn=document.getElementById("submitBtn")

for(let i=0;i<allCookies.length;i++){
    let coo = allCookies[i].trim();
    if(coo.indexOf("AccessToken")==0){
        accessToken=coo.substring(12);
        console.log(accessToken)
        break
    }
}
if(accessToken!=undefined){
    fetch("http://localhost:3500/userdetails",
    {
        method: 'GET',
        headers: {"Content-Type":"application/json"},
    }
    ).then(response=>{
        return response.json()
    }).then(data=>{
        user=data
        if(user==undefined){
            confirm("Please login to write a blog !")
            document.location.href="./login.html"    
        }
        else{
            submitBtn.addEventListener('click',(e)=>{
                e.preventDefault();
                let title=document.getElementById("Title").value
                let content=document.getElementById("blogContents").value;
                // var tags = document.querySelector('.messageCheckbox:checked').value
                let blog={
                    username : user.username,
                    title : title,
                    content: content
                }  
                sub(blog) 
                document.location.href="./index.html"
            })

        }
        console.log(data)
    })
}
const sub=(data)=>{
    fetch("/create",{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }).then(response=>{
        return response.json()
    }).then(data=>{
        console.log(data)
    })
}
