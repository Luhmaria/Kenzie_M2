function redirect() {
  const redirectButton = document.querySelector("button");

  redirectButton.addEventListener("click", (event) => {
    window.location.replace("../../index.html");
  });
}
redirect();
