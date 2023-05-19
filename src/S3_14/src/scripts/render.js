import  {users, posts} from "./database.js"

export function renderCurrentUser(user){
    const main = document.querySelector("main")
    const actualUser = createUserCard(user)
    main.insertAdjacentElement("afterbegin",actualUser)
}
export function createUserCard (user){

    const userContainer = document.createElement("div")
    userContainer.classList.add("user")

    const userImage = document.createElement("img")
    userImage.classList.add("user__image")
    userImage.src = user.img;
    userImage.alt = user.user;

    const userInfo = document.createElement("div")
    userInfo.classList.add("user__info")

    const userName = document.createElement("h2")
    userName.classList.add("title2")
    userName.innerText = user.user;

    const userStack = document.createElement("h3")
    userStack.innerText = user.stack;
    userStack.classList.add("user__stack")
    userStack.classList.add("text2")

    userInfo.append(userName, userStack)

    userContainer.append(userImage , userInfo)

    return userContainer;
}
export function renderSugestions(usersList){
    const sugestionContainer = document.querySelector(".sugestions__container")
    
    usersList.forEach((user)=>{
        const sugestedUser = createSugestedUser(user)
        sugestionContainer.appendChild(sugestedUser)
    })
}
function createSugestedUser (user) {

    const container = document.createElement("div")
    container.classList.add("suggestedUser__container")
    
    const sugestedUser = createUserCard(user);

    const followButton = document.createElement("button")
    followButton.classList.add("follow-button")
    followButton.classList.add("text2")
    followButton.innerText = "Seguir"
    
    followButton.addEventListener("click",(event)=>{
        followButton.classList.toggle("follow-button--active")
        if(followButton.innerText == "Seguir"){
            followButton.innerText = "Seguindo"
        }else{
            followButton.innerText = "Seguir"
        }
    })

    container.append(sugestedUser,followButton)

    return container;
}
 function createPost(post){

    const postContainer = document.createElement("article")
    postContainer.classList.add("post")

    const postTitle = document.createElement("h2")
    postTitle.classList.add("post__title")
    postTitle.classList.add("title1")
    postTitle.innerText = post.title;

    const postContent = document.createElement("p")
    postContent.classList.add("post__content")
    postContent.classList.add("text1")
    postContent.innerText = post.text;

   
    postContainer.append(postTitle,postContent);
    
    return postContainer
}
function createModalPost(post){

    const postContainer = document.createElement("article")
    postContainer.classList.add("post")
    postContainer.classList.add("post--modal")

    const postTitle = document.createElement("h2")
    postTitle.classList.add("post__title")
    postTitle.classList.add("title1")
    postTitle.classList.add("post__title--modal")
    postTitle.innerText = post.title;

    const postContent = document.createElement("p")
    postContent.classList.add("post__content")
    postContent.classList.add("text1")
    postContent.classList.add("post__content--modal")
    postContent.innerText = post.text;

   
    postContainer.append(postTitle,postContent);
    
    return postContainer
}
function generateModalContent(post){

    let modalContainer = document.createElement("div")
    modalContainer.classList.add("modal__container")

    modalContainer.innerHTML="";

    const closeModal = document.createElement("button")
    closeModal.classList.add("modal__button")
    closeModal.classList.add("text1")
    closeModal.innerText = "X"

    const user = createUserCard(post.userInfo);

    const content = createModalPost(post) 

    modalContainer.append(closeModal,user,content) 

    return modalContainer

}
export function renderPosts(postsList){

    const postsContainer = document.querySelector(".posts")
    postsContainer.innerHTML="";

    postsList.forEach((post) =>{
        const postAuthor = createUserCard(post.userInfo)

        const postContent = createPost(post)

        const postInfo = document.createElement("div")
        postInfo.classList.add("post__info")
    
        const openButton = document.createElement("button")
        openButton.classList.add("post__button")
        openButton.classList.add("text2")
        openButton.dataset.id = post.id;
        openButton.innerText = "Abrir Post"
    
    
        const likeContainer = document.createElement("div")
        likeContainer.classList.add("post__like")
    
        const likeImage = document.createElement("img")
        if(post.liked == true){
            likeImage.src = "src/assets/img/Red heart.svg"
            likeImage.alt = "RedHeart(Post liked)"
        }else{
            likeImage.src = "src/assets/img/Empty heart.svg"
            likeImage.alt = "EmptyHeart(Post not liked)"
        }
        
       
        likeImage.dataset.id = post.id;
    
        const likesAmount = document.createElement("small")
        likesAmount.innerText = post.likes;
        likesAmount.dataset.id=post.id;
    
        likeContainer.append(likeImage,likesAmount)
        postInfo.append(openButton,likeContainer)
        postContent.appendChild(postInfo)
   
        postsContainer.append(postAuthor,postContent)
    })
    
    likeEvents()
    const modal = document.querySelector("#modal");

    const openButtons = document.querySelectorAll(".post__button")

    openButtons.forEach((button => button.addEventListener("click",(event)=>{
        
        const currentPost = posts.find((postinfo)=> postinfo.id == event.target.dataset.id
        )
        const modalContent = generateModalContent(currentPost);
        
        modal.appendChild(modalContent)
         
        modal.showModal();

        const closeButton = document.querySelector(".modal__button")
        closeButton.addEventListener("click", ()=>{
        const modal = document.querySelector("#modal");
        modal.close();
        modal.innerHTML = "";
    })
    })))
    

}
export function insertNewPost(post){
    posts.unshift(post)
    renderPosts(posts)
}
export function postingEvent (){

    const newPost = document.querySelector(".newPost__button")
    
    newPost.addEventListener("click",((event)=>{
       
        event.preventDefault();

        const newPostTitle = document.querySelector("input")

        const newPostContent = document.querySelector("textarea")

        if(newPostContent.value && newPostTitle.value != ""){
            const newPost = {
                id: posts.length + 1,
                title: newPostTitle.value,
                text:newPostContent.value,
                userInfo:users[0],
                likes:0,
                liked:false
            }
            insertNewPost(newPost);
            newPostTitle.value = "";
            newPostContent.value = "";

        }else{
            alert("Para postar, defina um título e uma descrição para o seu conteúdo")
        }
        
    }))

}
function likeEvents (){

    const hearts = document.querySelectorAll(".post__like > img")

    hearts.forEach((heart)=>{
        heart.addEventListener("click",((e)=>{
            
            const currentPost = posts.find((post)=> post.id == e.target.dataset.id)
            
            if(currentPost.liked == false){
                currentPost.likes++
                currentPost.liked=true
                heart.src = "src/assets/img/Red heart.svg"
                heart.alt = "RedHeart(Post liked)"
                improveLikes(e.target.dataset.id,currentPost.likes)
            }else if(currentPost.liked == true){
                currentPost.liked = false
                currentPost.likes--
                heart.src = "src/assets/img/Empty heart.svg"
                heart.alt = "EmptyHeart(Post not liked)"
                improveLikes(e.target.dataset.id,currentPost.likes)
            }
        }))
    })
}
function improveLikes(id,likes){

    const amounts = document.querySelectorAll(".post__like > small")

    amounts.forEach((small)=>{
        if(small.dataset.id == id){
            small.innerText = likes;
        }
    })
}