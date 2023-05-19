import { handleMobileMenu, redirect, toast } from "./render.js";
import { createUser } from "./requests.js";

handleMobileMenu(
  "../assets/images/Menu_open.svg",
  "../assets/images/menu_close.svg"
);

function redirectEvents() {
  const homeButton = document.querySelectorAll("[data-action=home]");
  const loginButton = document.querySelector("[data-action=login]");

  homeButton.forEach((btn) => redirect(btn, "../../index.html"));
  redirect(loginButton, "./login.html");
}
redirectEvents();

async function createNewUser() {
  const form = document.querySelector("form");

  const userName = document.querySelector("#name");
  const userMail = document.querySelector("#email");
  const userPassword = document.querySelector("#password");
  const userProfessionalLevel = document.querySelector("#professionalLevel");

  const actionButton = document.querySelector("[data-action=register]");

  const newUser = {};

  actionButton.addEventListener("click", async (event) => {
    if (form.checkValidity()) {
      event.preventDefault();

      newUser.username = userName.value;
      newUser.password = userPassword.value;
      newUser.email = userMail.value;
      newUser.professional_level = userProfessionalLevel.value;

      const created = await createUser(newUser);

      if (Object.hasOwn(created, "error")) {
        toast("E-mail já cadastrado");
      } else {
        toast("Usuário criado com sucesso!", true);
        setTimeout(() => {
          window.location.replace("./login.html");
        }, 3000);
        userName.value = "";
        userPassword.value = "";
        userMail.value = "";
        userProfessionalLevel.value = "";
      }
    }
  });
}
createNewUser();
