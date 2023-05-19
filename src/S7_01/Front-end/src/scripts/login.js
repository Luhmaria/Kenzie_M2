import { handleMobileMenu, redirect, toast } from "./render.js";
import { getAccess, validateLogin } from "./requests.js";

handleMobileMenu(
  "../assets/images/Menu_open.svg",
  "../assets/images/menu_close.svg"
);

function redirectEvents() {
  const homeButton = document.querySelector("[data-action=home]");
  const registerButton = document.querySelectorAll("[data-action=register]");

  redirect(homeButton, "../../index.html");
  registerButton.forEach((btn) => redirect(btn, "./register.html"));
}
redirectEvents();

async function doLogin() {
  const form = document.querySelector("form");
  const loginButton = document.querySelector("[data-action=login]");

  const userMail = document.querySelector("#email");
  const userPassword = document.querySelector("#password");

  const userInfo = {};

  loginButton.addEventListener("click", async (event) => {
    if (form.checkValidity()) {
      event.preventDefault();

      userInfo.email = userMail.value;
      userInfo.password = userPassword.value;

      const token = await getAccess(userInfo);

      if (Object.hasOwn(token, "error")) {
        toast("Email ou senha inválidos");
      } else {
        userMail.value = "";
        userPassword.value = "";

        localStorage.setItem("@kenzieEmpresas:token", token.token);

        const isAdmin = await validateLogin(token.token);

        if (isAdmin) {
          window.location.replace("./adminPanel.html");
        } else {
          window.location.replace("./userPanel.html");
        }
      }
    }
  });
}
doLogin();
