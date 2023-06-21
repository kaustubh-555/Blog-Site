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