import {redirect,renderToast} from "./globalFunctions.js"
import {createUser} from "./requests.js"

function routeProtection (){

    const token = localStorage.getItem("@petinfo:token")

    if(token != null){
        window.location.replace("./feed.html")
    }
}
routeProtection()

function redirectLogin(){
    const redirectButton1 = document.querySelector(".redirect__button")
    const redirectButton2 = document.querySelector(".header__button")
    redirect(redirectButton1, "../../index.html")
    redirect(redirectButton2, "../../index.html")
}
redirectLogin()

function doRegister(){

    const registerButton = document.querySelector(".register__submit")
    const form = document.querySelector("form")
    const fieldset = document.querySelector("fieldset")
    const userMail = document.querySelector("#Email")
    const userPassword = document.querySelector("#Senha")
    const userName = document.querySelector("#user")
    const userImage = document.querySelector("#picture")
    

    const user = {}
    
    registerButton.addEventListener("click", ( async event=>{

        const alerts = document.querySelector("small")

        if(alerts != null){
            fieldset.removeChild(alerts)
        }

        if(userName.classList.contains("wrong")){
            userName.classList.remove("wrong")    
        }
        if(userMail.classList.contains("wrong")){
            userMail.classList.remove("wrong")    
        }

        if(form.checkValidity()){

            event.preventDefault()

            user.username = userName.value;
            user.email = userMail.value;
            user.password = userPassword.value;
            user.avatar = userImage.value;

            const result = await createUser(user)

            if(Object.hasOwn(result, "message")){

                const wrong = document.createElement("small")
                wrong.classList.add("text4","alert")
                wrong.innerText = result.message

                if (result.message.includes("Email")){
                    userMail.classList.add("wrong")
                    userMail.insertAdjacentElement("afterend",wrong)
                }else{
                    userName.classList.add("wrong")
                    userName.insertAdjacentElement("afterend",wrong)
                }
            }else{
                userName.value = ""
                userMail.value = ""
                userPassword.value = ""
                userImage.value = ""
                renderToast("Sua conta foi criada com sucesso!", "Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login:", true, false)
                setTimeout(() =>{
                    window.location.replace("../../index.html")
                },4000)
            }
        }
    }))
}
doRegister()

