import {
  getAllCompanies,
  getAllDepartments,
  getCompaniesBySector,
  getCompanyDepartments,
  getAllUsers,
  getAdmissibleUsers,
  hireUser,
  dismissUser,
  getCurrentUserInfo,
  getDepartmentCoworkers,
  getCurrentUserCompanyDepartments,
} from "./requests.js";

export function generateSelectOptions(select, optionsData) {
  const firstOption = document.createElement("option");
  firstOption.value = "";
  firstOption.innerText = "Selecionar setor";
  select.appendChild(firstOption);
  optionsData.forEach((data) => {
    const option = document.createElement("option");
    option.value = data.description;
    option.innerText = data.description;
    select.appendChild(option);
  });
}

export function renderCompany({ name, opening_hours, sectors }) {
  const company = document.createElement("li");
  company.classList.add("companies__item")

  const companyName = document.createElement("h2");
  companyName.innerText = name;
  companyName.classList.add("title1","bolder","companies__name")

  const companyOpening = document.createElement("p");
  companyOpening.innerText = opening_hours;
  companyOpening.classList.add("text2")

  const companySector = document.createElement("h3");
  companySector.innerText = sectors.description;
  companySector.classList.add("text2", "companies__sector")

  company.append(companyName, companyOpening, companySector);

  return company;
}
export async function renderCompanies(all = false, sector) {
  const list = document.querySelector("ul");
  list.innerHTML = "";
  let companies = "";
  if (all) {
    companies = await getAllCompanies();
  } else {
    companies = await getCompaniesBySector(sector);
  }
  companies.forEach((company) => {
    const companyElement = renderCompany(company);
    list.appendChild(companyElement);
  });
}
export function handleMobileMenu(openSrc,closeSrc) {
  const controller = document.querySelector("header > div > button");
  const hiddenMenu = document.querySelector(".hidden");
  const menuImg = document.querySelector("[data-action=toggle-menu]")
  controller.addEventListener("click", (event) => {
    hiddenMenu.classList.toggle("hidden");
    if (hiddenMenu.classList.contains("hidden")) {
      menuImg.src = openSrc
    } else {
      menuImg.src = closeSrc
    }
  });
}
export function redirect(element, url) {
  element.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.replace(url);
  });
}
export function toast(text, success = false) {
  const body = document.body;

  const toast = document.createElement("div");
  toast.classList.add("toast");

  const toastInfo = document.createElement("h2");
  toastInfo.classList.add("text5","bolder")
  toastInfo.innerText = text;

  if (success) {
    toast.classList.add("success");
  } else {
    toast.classList.add("failure");
  }

  toast.appendChild(toastInfo);
  body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast__remove");
  }, 4000);

  setTimeout(() => {
    body.removeChild(toast);
  }, 5990);
}
function renderDepartmentCard({ name, description, companies, uuid }) {
  const departmentCard = document.createElement("li");

  const departmentName = document.createElement("h2");
  departmentName.classList.add("title1","bolder")
  departmentName.innerText = name;

  const departmentDescription = document.createElement("p");
  departmentDescription.classList.add("text1")
  departmentDescription.innerText = description;

  const companyDepartment = document.createElement("p");
  companyDepartment.classList.add("text1")
  companyDepartment.innerText = companies.name;

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("button__div");

  const manageButton = document.createElement("button");
  const manageButtonIcon = document.createElement("img")
  manageButtonIcon.dataset.id = uuid;
  manageButtonIcon.src = "../assets/images/manageIcon.svg"
  manageButton.appendChild(manageButtonIcon)
  const managementModal = document.querySelector("#manage");
  openModal(manageButtonIcon, managementModal);
  manageButtonIcon.addEventListener("click", async (event) => {
    renderManagementContent(event.target.dataset.id);
  });

  const editButton = document.createElement("button");
  const editButtonIcon = document.createElement("img")
  editButtonIcon.dataset.id = uuid;
  editButtonIcon.src = "../assets/images/edit-icon-black.svg"
  editButton.appendChild(editButtonIcon)
  editButtonIcon.dataset.id = uuid;
  const editModal = document.querySelector("#edit-depart");
  openModal(editButtonIcon, editModal);
  editButtonIcon.addEventListener("click", async (event) => {
    renderEditDepartmentModal(event.target.dataset.id);
  });

  const deleteButton = document.createElement("button");
  const deleteButtonIcon = document.createElement("img")
  deleteButtonIcon.dataset.id = uuid;
  deleteButtonIcon.src = "../assets/images/delete-icon.svg"
  deleteButton.appendChild(deleteButtonIcon)
  deleteButtonIcon.dataset.id = uuid;
  const deleteModal = document.querySelector("#delete");
  openModal(deleteButtonIcon, deleteModal);
  deleteButtonIcon.addEventListener("click", async (event) => {
    const actionButton = deleteModal.querySelector("[data-action=delete]");
    renderDeleteInfo(true, departmentName.innerText);
    actionButton.dataset.id = event.target.dataset.id;
    actionButton.dataset.type = "department";
  });

  buttonsContainer.append(manageButton, editButton, deleteButton);

  departmentCard.append(
    departmentName,
    departmentDescription,
    companyDepartment,
    buttonsContainer
  );

  return departmentCard;
}
export async function renderCompanyDepartmentSection(all = false, companyID) {
  const list = document.querySelector(".departments > ul");
  list.innerHTML = "";
  let departments = "";
  if (all) {
    departments = await getAllDepartments();
    departments.forEach((department) => {
      const departmentCard = renderDepartmentCard(department);
      list.appendChild(departmentCard);
    });
  } else {
    departments = await getCompanyDepartments(companyID);
    if (departments.length == 0) {
      const warning = document.createElement("h2");
      warning.innerText = "Essa empresa não possui departamentos cadastrados";
      list.appendChild(warning);
    } else {
      departments.forEach((department) => {
        const departmentCard = renderDepartmentCard(department);
        list.appendChild(departmentCard);
      });
    }
  }
}
export function generateCompaniesSelectOptions(select, optionsData) {
  select.innerHTML = "";
  const firstOption = document.createElement("option");
  firstOption.value = "";
  firstOption.innerText = "Selecionar Empresa";
  select.appendChild(firstOption);
  optionsData.forEach((data) => {
    const option = document.createElement("option");
    option.value = data.uuid;
    option.innerText = data.name;
    select.appendChild(option);
  });
}
export async function createUserCard({
  username,
  professional_level,
  department_uuid,
  uuid,
  kind_of_work,
}) {
  const userCard = document.createElement("li");

  const userName = document.createElement("h2");
  userName.classList.add("title1","bolder")
  userName.innerText = username;

  const userLevel = document.createElement("p");
  userLevel.classList.add("text1")
  userLevel.innerText = capitalizeInfo(professional_level);

  const userCompany = document.createElement("p");
  userCompany.classList.add("text1")
  if (department_uuid == null) {
    userCompany.innerText = "Disponível para contratação";
  } else {
    const departments = await getAllDepartments();
    const currentCompany = departments.find(
      (department) => department.uuid == department_uuid
    ).companies;
    userCompany.innerText = currentCompany.name;
  }

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("button__div");

  const editButton = document.createElement("button");
  const editButtonIcon = document.createElement("img")
  editButtonIcon.dataset.id = uuid;
  editButtonIcon.src = "../assets/images/edit-icon.svg"
  editButton.appendChild(editButtonIcon)
  const editableInfo = {
    kind_of_work: kind_of_work,
    professional_level: professional_level,
  };
  const editUserModal = document.querySelector("#edit-user");
  openModal(editButtonIcon, editUserModal);
  editButtonIcon.addEventListener("click", async (event) => {
    const actionButton = editUserModal.querySelector("[data-action=edit-user]");
    actionButton.dataset.id = event.target.dataset.id;
    renderEditUserContent(editableInfo);
  });

  const deleteButton = document.createElement("button");
  const deleteButtonIcon = document.createElement("img")
  deleteButtonIcon.dataset.id = uuid;
  deleteButtonIcon.src = "../assets/images/delete-icon.svg"
  deleteButton.appendChild(deleteButtonIcon)
  const deleteModal = document.querySelector("#delete");
  openModal(deleteButtonIcon, deleteModal);
  deleteButtonIcon.addEventListener("click", async (event) => {
    const actionButton = deleteModal.querySelector("[data-action=delete]");
    renderDeleteInfo(false, userName.innerText);
    actionButton.dataset.id = event.target.dataset.id;
    actionButton.dataset.type = "user";
  });

  buttonsContainer.append(editButton, deleteButton);

  userCard.append(userName, userLevel, userCompany, buttonsContainer);

  return userCard;
}
export async function renderUsersSection() {
  const list = document.querySelector(".users > ul");
  list.innerHTML = "";

  const users = await getAllUsers();
  const filteredUsers = await filterAdmin(users);
  filteredUsers.forEach(async (user) => {
    const userCard = await createUserCard(user);
    list.append(userCard);
  });
}

function capitalizeInfo(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function openModal(buttons, modal) {
  if (buttons instanceof NodeList) {
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        modal.showModal();
      });
    });
  } else {
    buttons.addEventListener("click", (event) => {
      modal.showModal();
    });
  }
}
export function closeModal(closeButtons, modal) {
  closeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      modal.close();
    });
  });
}
export function selectCurrentModalClose(modal) {
  return modal.querySelectorAll(".modal__close");
}
export async function renderDepartmentCreationModal() {
  const modalContent = document.querySelector(
    "#create-depart > .modal__content"
  );
  const select = modalContent.querySelector("select");
  const companies = await getAllCompanies();
  generateCompaniesSelectOptions(select, companies);
}
export async function renderEditDepartmentModal(departmentID) {
  const allDepartments = await getAllDepartments();
  const { description } = allDepartments.find(
    (department) => department.uuid == departmentID
  );

  const modal = document.querySelector("#edit-depart");

  const departmentDescription = modal.querySelector("textarea");
  departmentDescription.value = description;

  const actionButton = modal.querySelector(".modal__content > button");
  actionButton.dataset.id = departmentID;
}
export async function renderDepartments() {
  const selectCompany = document.querySelector("#company");
  selectCompany.value = "";
  renderCompanyDepartmentSection(true);
}
function renderDeleteInfo(department = true, name) {
  const deleteModal = document.querySelector("#delete");
  const deleteInfo = deleteModal.querySelector("p");
  let content = "";
  if (department) {
    content = `Realmente deseja deletar o departamento ${name} e demitir seus funcionários?`;
  } else {
    content = `Realmente deseja remover o usuário ${name}?`;
  }
  deleteInfo.innerText = content;
}
function renderEditUserContent(userInfo) {
  const editUserModal = document.querySelector("#edit-user");

  const kindOfWork = editUserModal.querySelector("#kind-of-work");
  const professionalLevel = editUserModal.querySelector("#professional-level");
  if(userInfo.kind_of_work == null){
    kindOfWork.value = ""
  }else{
    kindOfWork.value = userInfo.kind_of_work;
  }
  professionalLevel.value = userInfo.professional_level;
}

async function renderManagementContent(departmentID) {
  const allDepartments = await getAllDepartments();
  const { name, description, companies } = allDepartments.find(
    (department) => department.uuid == departmentID
  );

  const managementModal = document.querySelector("#manage");

  const modalTitle = managementModal.querySelector("[data-id=depart-name]");
  modalTitle.innerText = name;

  const departDescription = managementModal.querySelector(
    "[data-id=depart-description]"
  );
  departDescription.innerText = description;

  const departCompany = managementModal.querySelector(
    "[data-id=depart-company]"
  );
  departCompany.innerText = companies.name;

  const admissibleUsersSelect =
    managementModal.querySelector("#admissable-users");
  const admissibleUserData = await getAdmissibleUsers();
  generateAdmissableUsersSelectOptions(
    admissibleUsersSelect,
    admissibleUserData
  );
  const hiringButton = managementModal.querySelector("[data-action=hire]");
  hiringButton.dataset.departId = departmentID;

  const allDepartmentEmployees = await getCurrentDepartmentEmployees(
    departmentID
  );
  await renderEmployees(allDepartmentEmployees);
}

async function renderEmployees(employees) {
  const managementModal = document.querySelector("#manage");
  const employeeList = managementModal.querySelector("ul");
  employeeList.innerHTML = "";
  if (employees.length == 0) {
    const warning = document.createElement("h2");
    warning.innerText = "Não há funcionários contratados nesse departamento";
    employeeList.appendChild(warning);
  } else {
    employees.forEach(async (employee) => {
      const card = await createEmployeeCard(employee);
      employeeList.appendChild(card);
    });
  }
}
async function createEmployeeCard({
  username,
  professional_level,
  uuid,
  department_uuid,
}) {
  const managementModal = document.querySelector("#manage");
  const admissibleUsersSelect =
    managementModal.querySelector("#admissable-users");

  const employeeCard = document.createElement("li");
  employeeCard.classList.add("manage__employee")

  const userName = document.createElement("h2");
  userName.classList.add("title1","bolder")
  userName.innerText = username;

  const userLevel = document.createElement("p");
  userLevel.classList.add("text1")
  userLevel.innerText = capitalizeInfo(professional_level);

  const userCompany = document.createElement("p");
  userCompany.classList.add("text1")
  const departments = await getAllDepartments();
  const currentDepartment = departments.find(
    (departments) => departments.uuid == department_uuid
  ).companies;
  userCompany.innerText = currentDepartment.name;

  const dismissButton = document.createElement("button");
  dismissButton.innerText = "Desligar";
  dismissButton.dataset.id = uuid;
  dismissButton.classList.add("button-style", "employee__button","bolder")
  dismissButton.addEventListener("click", async (event) => {
    const dismiss = await dismissEmployee(event.target.dataset.id);
    if (!Object.hasOwn(dismiss, "error")) {
      toast("Funcionário desligado com sucesso", true);
      const admissibleUserData = await getAdmissibleUsers();
      generateAdmissableUsersSelectOptions(
        admissibleUsersSelect,
        admissibleUserData
      );
      const allDepartmentEmployees = await getCurrentDepartmentEmployees(
        department_uuid
      );
      await renderEmployees(allDepartmentEmployees);
      await renderUsersSection();
    }
  });

  employeeCard.append(userName, userLevel, userCompany, dismissButton);

  return employeeCard;
}

async function getCurrentDepartmentEmployees(departmentID) {
  const allUsers = await getAllUsers();
  const CurrentDepartmentEmployees = allUsers.filter(
    (user) => user.department_uuid == departmentID
  );

  return CurrentDepartmentEmployees;
}
export function generateAdmissableUsersSelectOptions(select, usersData) {
  select.innerHTML = "";
  const firstOption = document.createElement("option");
  firstOption.value = "";
  firstOption.innerText = "Selecionar usuário";
  select.appendChild(firstOption);
  usersData.forEach((data) => {
    const option = document.createElement("option");
    option.value = data.uuid;
    option.innerText = data.username;
    select.appendChild(option);
  });
}
export function managementModalEvents() {
  const managementModal = document.querySelector("#manage");
  const admissibleUsersSelect =
    managementModal.querySelector("#admissable-users");
  const form = managementModal.querySelector("form");
  const hiringButton = managementModal.querySelector("[data-action=hire]");
  admissibleUsersSelect.addEventListener("change", async (event) => {
    hiringButton.dataset.id = event.target.value;
  });
  hiringButton.addEventListener("click", async (event) => {
    if (form.checkValidity()) {
      event.preventDefault();
      const hired = await hiringUser(
        event.target.dataset.id,
        event.target.dataset.departId
      );
      if (!Object.hasOwn(hired, "error")) {
        toast("Funcionário contratado com sucesso", true);
        const admissibleUserData = await getAdmissibleUsers();
        generateAdmissableUsersSelectOptions(
          admissibleUsersSelect,
          admissibleUserData
        );
        const allDepartmentEmployees = await getCurrentDepartmentEmployees(
          event.target.dataset.departId
        );
        await renderEmployees(allDepartmentEmployees);
        await renderUsersSection();
      }
    }
  });
}
async function hiringUser(user_uuid, department_uuid) {
  const hiringInfo = {
    user_uuid: user_uuid,
    department_uuid: department_uuid,
  };

  const hired = await hireUser(hiringInfo);

  return hired;
}
async function dismissEmployee(employeeID) {
  const result = await dismissUser(employeeID);
  return result;
}
async function filterCurrentUser(usersData) {
  const { uuid } = await getCurrentUserInfo();
  const filteredData = usersData.filter((user) => user.uuid != uuid);
  return filteredData;
}
async function filterAdmin(usersData) {
  const filteredData = usersData.filter((user) => user.is_admin == false);
  return filteredData;
}

export function renderEditionUserModal() {
  const editModal = document.querySelector("#edit-user");
  const userName = editModal.querySelector("[name=name]");
  const userMail = editModal.querySelector("[name=email]");
  const userPassword = editModal.querySelector("[name=password]");

  userName.value = "";
  userMail.value = "";
  userPassword.value = "";
}

export async function renderCoworkersSection() {
  const coworkersSection = document.querySelector("main");
  coworkersSection.innerHTML = "";

  const hired = await checkIfHired();
  if (hired) {
    const sectionHeader = await createCoworkerSectionHeader();
    coworkersSection.appendChild(sectionHeader);
    const departmentInfo = await getDepartmentCoworkers();
    const coWorkers = await filterCurrentUser(departmentInfo[0].users);
    if (coWorkers.length == 0) {
      const warning = document.createElement("h2");
      warning.innerText = "Você é o único contratado neste departamento";
      warning.classList.add("title4", "bolder","hired-info__warning")
      coworkersSection.appendChild(warning);
    } else {
      const coworkersList = document.createElement("ul");
      coworkersList.classList.add("hired-info__coworkers")
      coWorkers.forEach((coworker) => {
        const card = createCoworkerCard(coworker);
        coworkersList.appendChild(card);
      });
      coworkersSection.appendChild(coworkersList);
    }
  } else {
    const warning = document.createElement("h2");
    warning.innerText = "Você ainda não foi contratado";
    warning.classList.add("title4", "bolder", "hired-info__warning")
    coworkersSection.appendChild(warning);
  }
}
function createCoworkerCard({ username, professional_level }) {
  const card = document.createElement("li");
  card.classList.add("hired-info__coworker")

  const coworkerName = document.createElement("h2");
  coworkerName.classList.add("text4","bolder")
  coworkerName.innerText = username;

  const coworkerLevel = document.createElement("p");
  coworkerLevel.classList.add("text4")
  coworkerLevel.innerText = capitalizeInfo(professional_level);

  card.append(coworkerName, coworkerLevel);

  return card;
}
async function createCoworkerSectionHeader() {
  const { name, departments } = await getCurrentUserCompanyDepartments();
  const { department_uuid } = await getCurrentUserInfo();
  const currentDepartment = departments.find(
    (department) => department.uuid == department_uuid
  );

  const headerInfo = `${name} - ${currentDepartment.name}`;

  const header = document.createElement("header");
  header.innerText = headerInfo;
  header.classList.add("title2", "bolder","hired-info__company")

  return header;
}
async function checkIfHired() {
  const { department_uuid } = await getCurrentUserInfo();
  if (department_uuid == null) {
    return false;
  }
  return true;
}
export async function renderUserHeader() {
  const { username, email, professional_level, kind_of_work } =
    await getCurrentUserInfo();

  const userHeader = document.querySelector("section");
  const userName = userHeader.querySelector("[data-type=user-name]");
  const userMail = userHeader.querySelector("[data-type=user-mail]");
  const userLevel = userHeader.querySelector("[data-type=user-level]");
  const userKindOfWork = userHeader.querySelector(
    "[data-type=user-kind-of-work]"
  );

  userName.innerText = username;
  userMail.innerText = `Email: ${email}`;
  userLevel.innerText = capitalizeInfo(professional_level);

  if (kind_of_work != null) {
    userKindOfWork.innerText = capitalizeInfo(kind_of_work);
  }
}
