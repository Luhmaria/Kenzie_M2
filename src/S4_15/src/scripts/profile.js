function pageEvents() {
  const redirectButton = document.querySelector(".change-user-button");
  redirectButton.addEventListener("click", () => {
    window.location.replace("../../index.html");
  });
}
pageEvents();

function renderUserInfo(user) {
  const userContainer = document.querySelector(".user");
  userContainer.innerHTML = "";

  const userImage = document.createElement("img");
  userImage.src = user.avatar_url;
  userImage.alt = "Imagem de perfil do usuário";
  userImage.classList.add("user__image");

  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("user__details");

  const userName = document.createElement("h2");
  userName.innerText = user.name;
  userName.classList.add("user__name");
  userName.classList.add("title2");
  detailsContainer.appendChild(userName);

  if (user.bio != null) {
    const userStack = document.createElement("h3");
    userStack.innerText = user.bio;
    userStack.classList.add("user__stack");
    userStack.classList.add("text2");
    detailsContainer.appendChild(userStack);
  }

  userContainer.append(userImage, detailsContainer);
}

function renderCurrentUser() {
  const currentUser = JSON.parse(localStorage.getItem("WantedUser"));
  renderUserInfo(currentUser);
  getUserRepos(currentUser);
}
renderCurrentUser();

async function getUserRepos(user) {
  const userRepos = await fetch(user.repos_url);
  const reposData = await userRepos.json();

  renderRepos(reposData);
}
function renderRepos(reposList) {
  const reposSection = document.querySelector(".projects-container");
  reposSection.innerHTML = "";

  if (reposList.length == 0) {
    const noRepos = document.createElement("h2");
    noRepos.classList.add("projects__none");
    noRepos.innerText =
      "Este usuário não possui repositórios públicos para exibição";
    reposSection.appendChild(noRepos);
  } else {
    reposList.forEach((repo) => {
      reposSection.append(createProjectCard(repo));
    });
  }
}
function createProjectCard(repository) {
  const projectContainer = document.createElement("article");
  projectContainer.classList.add("project");

  const projectTitle = document.createElement("h2");
  projectTitle.classList.add("title3");
  projectTitle.classList.add("project__title");
  projectTitle.innerText = repository.name;

  const projectDescription = document.createElement("p");
  projectDescription.classList.add("text2");
  projectDescription.classList.add("project__description");
  projectDescription.innerText = repository.description;

  const repositoryLink = document.createElement("a");
  repositoryLink.innerText = "Repositório";
  repositoryLink.classList.add("project__button");
  repositoryLink.classList.add("text2");
  repositoryLink.href = repository.html_url;
  repositoryLink.target = "_blank";

  projectContainer.append(projectTitle, projectDescription, repositoryLink);

  return projectContainer;
}
