import {
  renderFormModal,
  renderUserNav,
  renderAllPosts,
  handleModal,
  formModalAction,
  closeModal,
  deleteModalAction,
} from "./render.js";

function routeProtection() {
  const token = localStorage.getItem("@petinfo:token");

  if (token == null) {
    window.location.replace("../../index.html");
  }
}
routeProtection();

function openNewPublication() {
  const openButton = document.querySelectorAll(".user__newpost");

  const newPostModal = document.querySelector("#handlePost__modal");
  openButton.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      renderFormModal(false, e.target.dataset.id);
    });
  });

  handleModal(openButton, newPostModal);
}

function showUserMenu() {
  const userNav = document.querySelector(".user");
  const menu = document.querySelector(".user__logout");
  userNav.addEventListener("mouseover", (e) => {
    menu.classList.remove("hidden");
  });
  userNav.addEventListener("mouseout", (e) => {
    menu.classList.add("hidden");
  });
}

function logoutEvent() {
  const logoutButton = document.querySelector(".logout__button");

  logoutButton.addEventListener("click", (e) => {
    localStorage.clear();
    window.location.replace("../../index.html");
  });
}

renderUserNav();
showUserMenu();
openNewPublication();
logoutEvent();
renderAllPosts();

function modalEvents() {
  const allDialog = document.querySelectorAll("dialog");
  allDialog.forEach((dialog) => {
    closeModal(dialog.id);
  });
}
modalEvents();

deleteModalAction();

formModalAction();
