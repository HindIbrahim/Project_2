//DOM

function createElement(tiitle,boody,img,postId){

    


let firstDiv=document.createElement("div");
firstDiv.classList.add("row","mb-2");
firstDiv.setAttribute('id','subContainer')

let secondDiv=document.createElement("div");
secondDiv.classList.add("col-md-6");

firstDiv.append(secondDiv);

let thiredDiv=document.createElement("div");
thiredDiv.classList.add("row", "g-0", "border", "rounded", "overflow-hidden", "flex-md-row", "mb-4", "shadow-sm", "h-md-250", "position-relative");

secondDiv.append(thiredDiv);

let div4=document.createElement("div");
div4.classList.add("col", "p-4", "d-flex", "flex-column", "position-static");

thiredDiv.append(div4);

let strong=document.createElement("strong");
strong.classList.add("d-inline-block", "mb-2", "text-primary");
strong.innerHTML=tiitle;

let p=document.createElement("p");
p.classList.add("card-text", "mb-auto");
p.innerHTML=boody;

let br=document.createElement("br");

let readmore=document.createElement("button");
readmore.classList.add("btn", "btn-link");
readmore.innerHTML="Read more";
let Eidt=document.createElement("button");
Eidt.classList.add("btn", "btn-link");
Eidt.innerHTML="Eidt";
let del=document.createElement("button");
del.classList.add("btn", "btn-link");
del.innerHTML="Delete";

div4.append(strong);
div4.append(p);
div4.append(br);
div4.append(readmore);
div4.append(br);
div4.append(Eidt);
div4.append(br);
div4.append(del);

let div5=document.createElement("div");
div5.classList.add("col-auto", "d-none", "d-lg-block");

let image=document.createElement("img");
image.setAttribute("src",img);
div5.append(image);
thiredDiv.append(div5);

let container=document.getElementById("container");
container.append(firstDiv);
    
    del.addEventListener("click",e=>{
        e.preventDefault;
        deletePost(postId);
    })

    Eidt.addEventListener("click",e =>{
        updatePost(tiitle,boody,img,postId);

    })

    readmore.addEventListener("click",e=>{
        e.preventDefault();
        readMore(postId);
    })
    




    
}




const url = "https://aqueous-chamber-95142.herokuapp.com/users/hind-alayed/posts"


//===================================Get Posts===================================
function getPost(){

    fetch(url)
.then(response => {
    return response.json()})
.then(posts =>{
    
    let length=posts.posts.length;
    for(let i=0;i<length;i++){
        createElement(posts.posts[i].title,posts.posts[i].body,posts.posts[i].image,posts.posts[i].id)
        
    }
    
        
    }).catch()
    


}

getPost();

//=================================== new post===================================

let newPoost=document.getElementById("upload");
newPoost.addEventListener("click",e=>{
    e.preventDefault();
    newPost();

})


function newPost(){
    let title=document.getElementById("newPostTitle").value;
    let body=document.getElementById("newPostBody").value;
    let image=document.getElementById("newPostImage").value;

    let newPost={
        title:title,
        body:body,
        image:image
    }

    fetch(url,
{
    method: 'POST',
    headers: { 'Content-Type': 'application/json',},
    body: JSON.stringify(newPost),
})
.then(response => {
    return response.json()})
.then(data => {
    console.log('Success:', data);
    location.reload(); 
}).catch((error)=>{
    console.error('Error:', error);
})


}



//===================================delete post===================================



function deletePost(postId) {
    const deleteUrl = url + '/' + postId
    fetch(deleteUrl, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok)
        location.reload(); 
        else
            throw new Error("couldn't delete")
    })
    .catch(err => console.log(err.message))
}


//===================================update post ===================================


function updatePost(oldTitle,oldBody,oldImg,postId) {
    const updateUrl = url + '/' + postId;

    let old=document.createElement("h4");
    old.innerHTML="Old data are :"

    let form=document.createElement("form");
    let div=document.getElementById("subContainer")
    form.append(old);
    let oldtitle= document.createElement("input");
    oldtitle.value=oldTitle;
    form.append(oldtitle);

    let oldbody= document.createElement("input");
    oldbody.value=oldBody;
    form.append(oldbody);

    let oldtimg= document.createElement("input");
    oldtimg.value=oldImg;
    form.append(oldtimg);
    let hr=document.createElement("hr");
    form.append(hr);

    //---

    let newData=document.createElement("h4");
    newData.innerHTML="Enter new data  :"
    form.append(newData)
    let newTile= document.createElement("input");
    form.append(newTile);

    let newBody= document.createElement("input");
    form.append(newBody);

    let newImg= document.createElement("input");
    form.append(newImg);
    let save=document.createElement("button");
    save.innerHTML="save";
    form.append(save);

    let cancle=document.createElement("button");
    cancle.innerHTML="cancle";
    cancle.addEventListener("click",e=>{
        e.preventDefault();
        location.reload(); 
    })
    form.append(cancle)

    div.append(form);
   
   
    save.addEventListener("click",e=>{
        e.preventDefault();
        
        let newPos={
            title: newTile.value,
            body: newBody.value,
            image: newImg.value
    
        }
        fetch(updateUrl, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newPos)
        })
            .then(response => {
                if (response.ok)
                    return response.json()
                else
                    throw new Error("error!!!!")
            })
            .then(updatePost => {
                console.log("updated post:", updatePost)
                location.reload(); 
                
                
    
            })
            .catch(err => {
                console.log(err.message)
            })
        
    })
  
}



//===================================search post ===================================


let search=document.getElementById("search");
search.addEventListener("click",e=>{
    e.preventDefault();
    let postID=document.getElementById("postID").value;
    const updateUrl = url + '/' + postID;

    //---
    fetch(updateUrl)
    .then(response => {
        return response.json()})
    .then(posts =>{
        
        

        if(typeof posts.post.title ===  'string'){
            window.location.href = "readMore.html?postid="+postID;
        }
      
            
        }).catch() 
    
    
   
  
})

//==================== read more =====================

function readMore(postId){
    const updateUrl = url + '/' + postId ;

    window.location.href = "readMore.html?postid="+postId;
    
    

}