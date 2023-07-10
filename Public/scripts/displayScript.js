let author=document.getElementById("author")
let title=document.getElementById("title");
let content=document.getElementById("content")
let url=window.location.search;
let id= new URLSearchParams(url)
let BlogId=id.get('id')
console.log(id)

const show=(obj)=>{
    author.textContent="~ "+obj.username;
    title.textContent=obj.title;
    content.textContent=obj.content;
}


fetch('/getBlogData/'+BlogId,{
    method: 'GET',
    headers: {"Content-Type":"application/json"},
}).then(response=>{
    return response.json()
}).then(data=>{
    show(data[0])
    console.log(data[0])
})