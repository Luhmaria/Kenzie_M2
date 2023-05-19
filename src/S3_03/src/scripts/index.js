const menu = document.querySelector("#menu");
menu.addEventListener("click", (e) => {
  e.preventDefault();
  const info = document.querySelector(".info");
  info.classList.toggle("show");
});
