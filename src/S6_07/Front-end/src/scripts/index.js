import { redirect } from "./globalFunctions.js";
import { getAccess } from "./requests.js";

function routeProtection() {
  const token = localStorage.getItem("@petinfo:token");

  if (token != null) {
    window.location.replace("./src/pages/feed.html");
  }
}
routeProtection();

function redirectRegister() {
  const redirectButton = document.querySelector(".redirect__button");
  redirect(redirectButton, "./src/pages/register.html");
}
redirectRegister();

function doLogin() {
  const accessButton = document.querySelector(".login__submit");
  const form = document.querySelector("form");
  const fieldset = document.querySelector("fieldset");
  const userMail = document.querySelector("#Email");
  const userPassword = document.querySelector("#Senha");
  const user = {};

  accessButton.addEventListener("click", async (event) => {
    const alerts = document.querySelector("small");

    if (alerts != null) {
      fieldset.removeChild(alerts);
    }

    if (userPassword.classList.contains("wrong")) {
      userPassword.classList.remove("wrong");
    }
    if (userMail.classList.contains("wrong")) {
      userMail.classList.remove("wrong");
    }

    if (form.checkValidity()) {
      event.preventDefault();

      user.email = userMail.value;
      user.password = userPassword.value;

      const result = await getAccess(user);

      if (Object.hasOwn(result, "message")) {
        const wrong = document.createElement("small");
        wrong.classList.add("text4", "alert");
        wrong.innerText = result.message;

        if (result.message.includes("senha")) {
          userPassword.classList.add("wrong");
          userPassword.insertAdjacentElement("afterend", wrong);
        } else {
          userMail.classList.add("wrong");
          userMail.insertAdjacentElement("afterend", wrong);
        }
      } else {
        localStorage.setItem("@petinfo:token", result.token);
        window.location.replace("./src/pages/feed.html");
      }
    }
  });
}
doLogin();
