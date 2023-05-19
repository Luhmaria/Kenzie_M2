import {
  getCurrentUserInfo,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "./requests.js";
import { renderToast } from "./globalFunctions.js";

export async function renderFormModal(edit, postID) {
  const formLegend = document.querySelector("legend");
  const titleInput = document.querySelector(".form__title");
  const textInput = document.querySelector(".form__text");

  const allowButton = document.querySelector(".modal__button--edit");

  if (edit) {
    const currentPost = await findPost(postID);
    formLegend.innerText = "Edição";
    titleInput.value = currentPost.title;
    textInput.value = currentPost.content;
    allowButton.innerText = "Salva alterações";
    allowButton.dataset.id = postID;
  } else {
    formLegend.innerText = "Criando novo post";
    titleInput.value = "";
    textInput.value = "";
    allowButton.innerText = "Publicar";
  }
}

export async function renderUserNav() {
  const { username, avatar } = await getCurrentUserInfo();

  const userImage = document.querySelector(".user__image");
  const userName = document.querySelector(".user__logout > h2");

  userImage.src = avatar;
  userName.innerText = username;
}

export async function renderAllPosts() {
  const postSection = document.querySelector(".posts");
  postSection.innerHTML = "";
  const posts = await getAllPosts();

  let count = posts.length;

  if (count == 0) {
    const warningTitle = document.createElement("h2");
    warningTitle.classList.add("text3", "bolder");
    warningTitle.innerText = "Nenhum post publicado ainda";
    postSection.appendChild(warningTitle);
  } else {
    posts.forEach(async (post) => {
      const article = await renderPost(post, true);
      postSection.appendChild(article);
      count--;
      if (count == 0) {
        openPost();
        openEdition();
        openDelete();
      }
    });
  }
}

async function renderPost(post, feed = false) {
  const postContainer = document.createElement("article");
  postContainer.classList.add("post");

  const postTitle = document.createElement("h2");
  postTitle.classList.add("post__title", "text1", "bolder");
  postTitle.innerText = post.title;

  const postContent = document.createElement("p");
  postContent.classList.add("post__content", "text3");

  if (feed) {
    const postHeader = await renderPostHeader(post);

    postContent.innerText = post.content.substring(0, 145);

    const openButton = document.createElement("button");
    openButton.classList.add("post__open", "text3");
    openButton.innerText = "Acessar publicação";
    openButton.dataset.id = post.id;

    postContainer.append(postHeader, postTitle, postContent, openButton);
  } else {
    const postHeader = await renderPostHeader(post, true);
    postHeader.classList.add("post__info--modal");

    postContent.innerText = post.content;

    postContainer.classList.add("post--modal");
    postTitle.classList.add("post__title--modal");
    postContent.classList.add("post__content--modal");

    postContainer.append(postHeader, postTitle, postContent);
  }
  return postContainer;
}

async function checkEditPermission(authorID) {
  const { id } = await getCurrentUserInfo();

  if (Object.values({ id }, [0]).toString() == authorID) {
    return true;
  } else {
    return false;
  }
}

async function renderPostHeader(post, modal = false) {
  const userInfo = post.user;

  const postDateInfo = handleDate(post.createdAt);

  const postHeader = document.createElement("header");
  postHeader.classList.add("post__header");

  const postInfo = document.createElement("div");
  postInfo.classList.add("post__info");

  const authorImage = document.createElement("img");
  authorImage.classList.add("post__author-image");
  authorImage.src = userInfo.avatar;

  const authorName = document.createElement("h2");
  authorName.classList.add("post__author-name", "text4", "bolder");
  authorName.innerText = userInfo.username;

  const divisor = document.createElement("small");
  divisor.innerText = "|";
  divisor.classList.add("post__date", "text4");

  const postDate = document.createElement("small");
  postDate.classList.add("post__date", "text4");
  postDate.innerText = postDateInfo;

  postInfo.append(authorImage, authorName, divisor, postDate);

  if (modal) {
    postInfo.classList.add("post__info--modal");
    return postInfo;
  }

  postHeader.appendChild(postInfo);

  const editable = await checkEditPermission(userInfo.id);

  if (editable) {
    const postActions = renderPostActions(post.id);
    postHeader.appendChild(postActions);
  }

  return postHeader;
}

function renderPostActions(postID) {
  const actionsContainer = document.createElement("div");
  actionsContainer.classList.add("post__actions");

  const editButton = document.createElement("button");
  editButton.classList.add("post__button", "post__button--edit", "text4");
  editButton.dataset.id = postID;
  editButton.innerText = "Editar";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("post__button", "post__button--delete", "text4");
  deleteButton.dataset.id = postID;
  deleteButton.innerText = "Excluir";

  actionsContainer.append(editButton, deleteButton);

  return actionsContainer;
}

function handleDate(timeStamp) {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const date = new Date(timeStamp);
  const month = months.at(date.getMonth());
  const year = date.getFullYear();

  return `${month} de ${year}`;
}

function openPost() {
  const openButtons = document.querySelectorAll(".post__open");
  const postModal = document.querySelector("#post__modal");
  openButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      renderPostModal(e.target.dataset.id);
    });
  });
  handleModal(openButtons, postModal);
}

export function handleModal(buttons, modal) {
  buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      modal.showModal();
    });
  });
}

export function closeModal(modalID) {
  const currentModal = document.querySelector(`#${modalID}`);

  const closeButton = currentModal.querySelectorAll(":scope > .modal__close");
  const cancelButton = currentModal.querySelectorAll(` .modal__button--cancel`);

  closeButton.forEach((button) =>
    button.addEventListener("click", (e) => {
      currentModal.close();
    })
  );
  cancelButton.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      currentModal.close();
    })
  );
}

function openEdition() {
  const openButtons = document.querySelectorAll(".post__button--edit");

  const editModal = document.querySelector("#handlePost__modal");

  openButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      renderFormModal(true, e.target.dataset.id);
    });
  });

  handleModal(openButtons, editModal);
}

function openDelete() {
  const openButtons = document.querySelectorAll(".post__button--delete");
  const deleteModal = document.querySelector("#delete__modal");
  openButtons.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      const allowDeleteButtons = deleteModal.querySelector(
        ".modal__button--delete"
      );
      allowDeleteButtons.dataset.id = event.target.dataset.id;
    });
  });
  handleModal(openButtons, deleteModal);
}

async function findPost(postID) {
  const posts = await getAllPosts();
  const chosenPost = posts.find((element) => element.id == postID);

  return chosenPost;
}

export async function renderPostModal(postID) {
  const postContainer = document.querySelector(".modal__content--post");
  postContainer.innerHTML = "";

  const currentPost = await findPost(postID);
  const article = await renderPost(currentPost);
  postContainer.appendChild(article);
}

export async function formModalAction() {
  const modal = document.querySelector("#handlePost__modal");

  const postTitle = document.querySelector(".form__title");
  const postContent = document.querySelector(".form__text");
  const post = {};
  const formulary = document.querySelector(".modal__content--form");
  const actionButton = document.querySelector(".modal__button--edit");

  actionButton.addEventListener("click", async (event) => {
    if (formulary.checkValidity()) {
      event.preventDefault();

      post.title = postTitle.value;
      post.content = postContent.value;

      if (event.target.innerText == "Publicar") {
        await createPost(post);
        await renderAllPosts();

        postTitle.value = "";
        postContent.value = "";
      } else {
        await updatePost(event.target.dataset.id, post);
        await renderAllPosts();
      }
      modal.close();
    }
  });
}

export async function deleteModalAction() {
  const allowButton = document.querySelector(".modal__button--delete");

  const deleteModal = document.querySelector("#delete__modal");

  allowButton.addEventListener("click", async (e) => {
    await deletePost(e.target.dataset.id);
    await renderAllPosts();
    deleteModal.close();
    renderToast(
      "Post deletado com sucesso!",
      "O post selecionado para exlusão foi deletado, a partir de agora não aparecerá no seu feed "
    );
  });
}
