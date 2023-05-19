import {
  closeModal,
  openModal,
  renderEditionUserModal,
  renderCoworkersSection,
  renderUserHeader,
  toast,
} from "./render.js";
import { validateUser, updateCurrentUserInfo } from "./requests.js";
function logoutEvent() {
  const logoutButton = document.querySelector("header > div > button");

  logoutButton.addEventListener("click", (event) => {
    localStorage.clear();
    window.location.replace("../../index.html");
  });
}
logoutEvent();

async function authorization() {
  const admin = await validateUser();

  if (Object.hasOwn(admin, "is_admin")) {
    const control = admin.is_admin;
    if (control) {
      window.location.replace("./adminPanel.html");
    }
  } else {
    window.location.replace("../../index.html");
  }
}
authorization();

function editModalEvents() {
  const openButton = document.querySelector("[data-action=edit-open]");
  const editionModal = document.querySelector("#edit-user");
  const closeButton = document.querySelectorAll(".modal__close");
  openModal(openButton, editionModal);
  closeModal(closeButton, editionModal);

  openButton.addEventListener("click", async (event) => {
    renderEditionUserModal();
  });

  const userName = editionModal.querySelector("[name=name]");
  const userMail = editionModal.querySelector("[name=email]");
  const userPassword = editionModal.querySelector("[name=password]");
  const form = editionModal.querySelector("form");
  const editUserAction = editionModal.querySelector("[data-action=edit-user]");
  editUserAction.addEventListener("click", async (event) => {
    if (form.checkValidity()) {
      event.preventDefault();
      const updateInfo = {
        username: userName.value,
        password: userPassword.value,
        email: userMail.value,
      };
      const result = await updateCurrentUserInfo(updateInfo);
      if (!Object.hasOwn(result, "error")) {
        toast("Informações atualizadas com sucesso", true);
        editionModal.close();
        renderUserHeader();
      }
    }
  });
}
editModalEvents();
renderEditionUserModal();
renderCoworkersSection();
renderUserHeader();
