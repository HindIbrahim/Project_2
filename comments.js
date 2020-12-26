const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get('postid')



const url = "https://aqueous-chamber-95142.herokuapp.com/users/hind-alayed/posts"
getPostById(postId);
getComments(postId);
//================================================================ Functions ==========================================================================


//==================================================================get post==========================================================================
function getPostById(postId){
    
    
    const updateUrl = url + '/' + postId ;
    

    fetch(updateUrl)
.then(response => {
    return response.json()})
.then(post =>{
    
    let title=post.post.title;
    let body=post.post.body;
    let image=post.post.image;
    
    createElement(title,body,image);
    


})  
.catch()

}


//====================================================================create post =======================================================================

function createElement(tiitle,boody,img){

    let div=document.querySelector("#readMore");
    let title=document.createElement("h1");
    let body=document.createElement("p");
    let image=document.createElement("img");

    

    title.innerHTML=tiitle;
    body.innerHTML=boody;
    image.setAttribute('src',img);
   


    
    div.append(title);
    div.append(image);
    div.append(body);
    
    

    
}

//====================================================================== create comments ====================================================================

function createComment(Name,Text,commentId){
    let div=document.getElementById("comments");
    let name=document.createElement("p");
    let text=document.createElement("p");

    let edit=document.createElement("button");
    let del=document.createElement("button");
    name.innerHTML=Name;
    text.innerHTML=Text;
    edit.innerHTML="Edit";
    del.innerHTML="Delete";

    edit.addEventListener("click",e=>{
        e.preventDefault();
        updateComment(Name,Text,commentId);

    })

    del.addEventListener("click",e=>{
        e.preventDefault()
        DelComment(commentId)
    })
    div.append(name);
    div.append(text);
    div.append(edit);
    div.append(del);
    let hr=document.createElement("hr");
    div.append(hr);

}


//=============================================================================Get comments===============================================================
function getComments(postId) {
    const updateUrl = url + '/' + postId + '/' + 'comments'

    

    fetch(updateUrl)
        .then(response => {
            return response.json()
        })
        .then(comment => {
            for(let i=0; i< comment.length; i++){
                createComment(comment[i].name,comment[i].text,comment[i].id)
            }
            

        })
        .catch()

}



//=====================================================================Add cooments========================================================================


let addnewC=document.getElementById("addCom");
addnewC.addEventListener("click",e=>{
    e.preventDefault();
    let nm=document.getElementById("newComNam").value;
let tx=document.getElementById("newComTxt").value;

const nComment = {
    name: nm,
    text: tx

}

newComment(nComment)
})

//===============================================================new comment ====================================================================
function newComment(NC) {
    const updateUrl = url + '/' + postId + '/' + 'comments'

    fetch(updateUrl,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(NC),
        })
        .then(response => {
            return response.json()

        })
        .then(comments => {
            console.log('Success:', comments);
            location.reload(); 
        }).catch((error) => {
            console.error('Error:', error);
        })
}




//==================================================================delete Comment==================================================================
function DelComment(commentId) {
    const updateUrl = url + '/' + postId + '/' + 'comments' + '/' + commentId;

    fetch(updateUrl,
        {
            method: 'DELETE',

        })
        .then(response => {
            if (response.ok)
                
                location.reload(); 
            else
                throw new Error("couldn't delete")
        })
        .catch(err => console.log(err.message))
}


//===============================================================Update Comment=================================================================


function updateComment(Name,Text, ComntId) {

    
    const updateUrl = url + '/' + postId + '/' + 'comments' + '/' + ComntId;
    
    let old=document.createElement("h4");
    old.innerHTML="Old data are :"

    let form=document.createElement("form");
    let div=document.getElementById("comments");
    form.append(old);

    let oldName= document.createElement("input");
    oldName.value=Name;
    form.append(oldName);

    let oldText= document.createElement("input");
    oldText.value=Text;
    form.append(oldText);

    let hr=document.createElement("hr");
    form.append(hr);

    //---

    let newData=document.createElement("h4");
    newData.innerHTML="Enter new data  :"
    form.append(newData)

    let newName= document.createElement("input");
    form.append(newName);

    let newText= document.createElement("input");
    form.append(newText);

    
    let save=document.createElement("button");
    save.innerHTML="save";
    form.append(save);

    let cancle=document.createElement("button");
    cancle.innerHTML="cancle";
    form.append(cancle)

    cancle.addEventListener("click",e=>{
        e.preventDefault();
        location.reload(); 
    })
    div.append(form);
   
   
    save.addEventListener("click",e=>{
        e.preventDefault();

        let newComnt={
            name:newName.value,
            text:newText.value
        }

        fetch(updateUrl, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newComnt)
        })
            .then(response => {
                if (response.ok)
                    return response.json()
                else
                    throw new Error("error!!!!")
            })
            .then(updateComnt => {
                console.log("updated post:", updateComnt)
    
            })
            .catch(err => {
                console.log(err.message)
            })
    })
    
}


