import {
  toast,
  generateCompaniesSelectOptions,
  renderCompanyDepartmentSection,
  renderUsersSection,
  openModal,
  closeModal,
  selectCurrentModalClose,
  renderDepartmentCreationModal,
  renderDepartments,
  managementModalEvents
} from "./render.js";
import {
  validateUser,
  getAllCompanies,
  createDepartment,
  updateDepartmentDescription,
  deleteDepartment,
  deleteEmployeeInfo,
  updateEmployeeInfo
} from "./requests.js";

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
    if (!control) {
      window.location.replace("./userPanel.html");
    }
  } else {
    window.location.replace("../../index.html");
  }
}
authorization();

async function handleSelectOptions() {
  const selectCompany = document.querySelector("#company");
  const company = await getAllCompanies();
  generateCompaniesSelectOptions(selectCompany, company);
  selectCompany.value = "";
  await renderCompanyDepartmentSection(true);
  selectCompany.addEventListener("change", async (event) => {
    const companyID = event.target.value;
    if (companyID == "") {
      await renderCompanyDepartmentSection(true);
    } else {
      renderCompanyDepartmentSection(false, companyID);
    }
  });
}
handleSelectOptions();

renderUsersSection();

function createDepartmentModalEvent() {
  const createButton = document.querySelector("[data-action=create-depart]");
  createButton.addEventListener("click", async (event) => {
    renderDepartmentCreationModal();
  });
}
createDepartmentModalEvent();
function modalEvents() {
  const departCreationModal = document.querySelector("#create-depart");
  const departManagementModal = document.querySelector("#manage");
  const deleteModal = document.querySelector("#delete");
  const editUserModal = document.querySelector("#edit-user");
  const editDepartModal = document.querySelector("#edit-depart");

  const createDepartButton = document.querySelectorAll(
    "[data-action=create-depart]"
  );

  openModal(createDepartButton, departCreationModal);

  closeModal(selectCurrentModalClose(departCreationModal), departCreationModal);
  closeModal(
    selectCurrentModalClose(departManagementModal),
    departManagementModal
  );
  closeModal(selectCurrentModalClose(deleteModal), deleteModal);
  closeModal(selectCurrentModalClose(editUserModal), editUserModal);
  closeModal(selectCurrentModalClose(editDepartModal), editDepartModal);
}
modalEvents();

async function departCreationActions() {
  const modal = document.querySelector("#create-depart");

  const modalContent = document.querySelector(
    "#create-depart > .modal__content"
  );
  const select = modalContent.querySelector("select");
  const actionButton = modalContent.querySelector("button");
  const newDepartName = modalContent.querySelector("input");
  const newDepartDescription = modalContent.querySelector("textarea");
  const newDepartInfo = {};

  select.addEventListener("change", (event) => {
    actionButton.dataset.id = select.value;
  });

  actionButton.addEventListener("click", async (event) => {
    if (modalContent.checkValidity()) {
      event.preventDefault();

      newDepartInfo.name = newDepartName.value;
      newDepartInfo.description = newDepartDescription.value;
      newDepartInfo.company_uuid = event.target.dataset.id;

      const newDepart = await createDepartment(newDepartInfo);

      if (!Object.hasOwn(newDepart, "error")) {
        toast("Departamento criado com sucesso", true);
        renderDepartments();
        modal.close();
      }
      newDepartName.value = "";
      newDepartDescription.value = "";
      select.value = "";
    }
  });
}
departCreationActions();

async function editDepartment(departmentID) {
  const editModal = document.querySelector("#edit-depart");
  const descriptionValue = editModal.querySelector("textarea").value;
  const newDescriptionInfo = { description: descriptionValue };
  const newDescription = await updateDepartmentDescription(
    departmentID,
    newDescriptionInfo
  );
  if (!Object.hasOwn(newDescription, "error")) {
    toast("Departamento atualizado com sucesso", true);
    renderDepartments();
    editModal.close();
  }
}

async function editDepartmentModalEvent() {
  const editModal = document.querySelector("#edit-depart");
  const actionButton = editModal.querySelector(".modal__content > button");
  actionButton.addEventListener("click", async (event) => {
    await editDepartment(event.target.dataset.id);
  });
}
editDepartmentModalEvent();

async function deleteAction(department = true, ID) {
  if (department) {
    await deleteDepartment(ID);
    toast("Departamento excluído com sucesso", true);
    renderDepartments();
    renderUsersSection()
  } else {
    await deleteEmployeeInfo(ID);
    toast("Usuário excluído com sucesso", true);
    renderUsersSection();
  }
}

async function deleteEvents() {
  const deleteModal = document.querySelector("#delete");
  const actionButton = deleteModal.querySelector("[data-action=delete]");
  actionButton.addEventListener("click", async (event) => {
    if (event.target.dataset.type == "department") {
      deleteAction(true, event.target.dataset.id);
    } else {
      deleteAction(false, event.target.dataset.id);
    }
    deleteModal.close();
  });
}
deleteEvents();

async function editUserInfo(employeeID){
  const editUserModal = document.querySelector("#edit-user");

  const kindOfWork = editUserModal.querySelector("#kind-of-work")
  const professionalLevel = editUserModal.querySelector("#professional-level")

  const newInfo = {
    kind_of_work: kindOfWork.value,
    professional_level: professionalLevel.value
  }
  const result = await updateEmployeeInfo(employeeID,newInfo)

  return result
}

async function editUserEvent(){
  const editUserModal = document.querySelector("#edit-user");
  const form = editUserModal.querySelector("form")
  const actionButton = editUserModal.querySelector("[data-action=edit-user]");
  actionButton.addEventListener("click", async (event) => {
    if(form.checkValidity()){
      event.preventDefault()
      const updated = await editUserInfo(event.target.dataset.id)
      if(!Object.hasOwn(updated, "error")){
        toast("Informações atualizadas com sucesso!", true)
        await renderUsersSection()
        editUserModal.close()
      }
    }
  })
}
editUserEvent()

managementModalEvents();