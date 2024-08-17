let searchBar=document.getElementById("searchText");
let dummyele1=document.getElementById("one");
let searchList=document.getElementById("slist")
function getresults(searchedString){
    searchedString=encodeURIComponent(searchedString);
    let url=`/results?val=${searchedString}`
    let resultList=[];
    fetch(url,{
        method: 'GET',
        headers:{'Content-Type':'application/json'}
    }).then(response=>{
        return response.json();
    }).then(data=>{
        console.log(data);
        resultList=data.result;
    })
    return resultList;
}
searchBar.addEventListener('input',()=>{
    
    dummyele1.style.borderRadius="0px 0px 0px 0px"
    searchList.style.display="block";
})
searchBar.addEventListener('focusout',()=>{
    dummyele1.style.borderRadius="0px 0px 0px 20px"
    searchList.style.display="none";

})