function handleModal(){
    const modal = document.querySelector("#modal")
    const firstButtonShow = document.querySelector(".header__button")
    const secondButtonShow = document.querySelector(".faq__button")

    firstButtonShow.addEventListener("click", () =>{
        modal.showModal();
        closeModal()
    })
    secondButtonShow.addEventListener("click", () =>{
        modal.showModal();
        closeModal();
    })
    
}
handleModal();

function closeModal(){
    const buttonClose = document.querySelector(".modal__close")
    const modal = document.querySelector("#modal")

    buttonClose.addEventListener("click", ()=>{
        modal.close();
    })
}