import { getAllSectors } from "./requests.js";
import {
  generateSelectOptions,
  renderCompanies,
  handleMobileMenu,
  redirect,
} from "./render.js";

async function handleOptions() {
  const allSectors = await getAllSectors();
  const select = document.querySelector("select");
  generateSelectOptions(select, allSectors);
  select.value = "";
  await renderCompanies(true);

  select.addEventListener("change", async (event) => {
    const companies = event.target.value;
    if (companies == "") {
      await renderCompanies(true);
    } else {
      await renderCompanies(false, companies);
    }
  });
}
handleOptions();

handleMobileMenu(
  "./src/assets/images/Menu_open.svg",
  "./src/assets/images/menu_close.svg"
);

function redirectEvents() {
  const loginButton = document.querySelector("[data-action=login]");
  const registerButton = document.querySelector("[data-action=register]");

  redirect(loginButton, "./src/pages/login.html");
  redirect(registerButton, "./src/pages/register.html");
}
redirectEvents();
