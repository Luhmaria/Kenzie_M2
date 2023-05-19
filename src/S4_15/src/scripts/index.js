function pageEvents() {
  const userInput = document.querySelector("input");
  const searchButton = document.querySelector("button");
  searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    const wantedUser = userInput.value;
    handleSearchInfo(wantedUser);
    userInput.value = "";
  });
}
pageEvents();

async function handleSearchInfo(wantedUser) {
  const searchedUser = await fetch(
    `https://api.github.com/users/${wantedUser}`
  );
  const result = await searchedUser.json();

  if (Object.keys(result).includes("message")) {
    window.location.replace("./src/pages/error.html");
  } else {
    localStorage.setItem("WantedUser", JSON.stringify(result));
    window.location.replace("./src/pages/profile.html");
  }
}
