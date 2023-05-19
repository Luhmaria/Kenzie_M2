export function redirect(button, location) {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.replace(location);
  });
}

export function renderToast(
  title,
  text,
  redirect = false,
  notPermanent = true
) {
  const body = document.body;

  const toast = document.createElement("div");
  toast.classList.add("toast");

  const toastInfo = document.createElement("div");
  toastInfo.classList.add("toast__info");

  const toastIcon = document.createElement("img");
  toastIcon.src = "../assets/img/check.svg";
  toastIcon.alt = "checkIcon";
  toastIcon.classList.add("toast__image");

  const toastTitle = document.createElement("h2");
  toastTitle.innerText = title;
  toastTitle.classList.add("text3", "bolder", "toast__title");

  toastInfo.append(toastIcon, toastTitle);

  const toastText = document.createElement("p");
  toastText.innerText = text;
  toastText.classList.add("toast__text", "text4");

  if (redirect) {
    const toastRedirect = document.createElement("a");
    toastRedirect.href = "../../index.html";
    toastRedirect.innerText = " Acessar página de login";
    toastRedirect.classList.add("text4", "toast__text--redirect");

    toastText.insertAdjacentElement("beforeend", toastRedirect);
  }

  toast.append(toastInfo, toastText);

  body.appendChild(toast);

  if (notPermanent) {
    setTimeout(() => {
      toast.classList.add("toast__remove");
    }, 4000);

    setTimeout(() => {
      body.removeChild(toast);
    }, 5990);
  }
}
