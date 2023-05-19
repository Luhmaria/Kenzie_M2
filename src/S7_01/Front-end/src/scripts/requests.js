const baseURL = "http://localhost:6278";
const token = localStorage.getItem("@kenzieEmpresas:token");
const requestHeaders = {
  "content-type": "application/json",
  Authorization: `Bearer ${token}`,
};

export async function createUser(userInfo) {
  const request = await fetch(`${baseURL}/auth/register`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(userInfo),
  });
  const user = await request.json();

  return user;
}

export async function getAccess(userInfo) {
  const request = await fetch(`${baseURL}/auth/login`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(userInfo),
  });
  const token = await request.json();

  return token;
}

export async function getAllCompanies() {
  const request = await fetch(`${baseURL}/companies`, {
    method: "GET",
    headers: requestHeaders,
  });
  const companies = await request.json();

  return companies;
}

export async function getCompaniesBySector(sector) {
  const request = await fetch(`${baseURL}/companies/${sector}`, {
    method: "GET",
    headers: requestHeaders,
  });
  const companies = await request.json();

  return companies;
}

export async function getAllSectors() {
  const request = await fetch(`${baseURL}/sectors`, {
    method: "GET",
    headers: requestHeaders,
  });
  const sectors = await request.json();

  return sectors;
}

export async function validateUser() {
  const request = await fetch(`${baseURL}/auth/validate_user`, {
    method: "GET",
    headers: requestHeaders,
  });
  const userType = await request.json();

  return userType;
}

export async function validateLogin(token) {
  const request = await fetch(`${baseURL}/auth/validate_user`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const userType = await request.json();

  return userType.is_admin;
}

export async function getCurrentUserInfo() {
  const request = await fetch(`${baseURL}/users/profile`, {
    method: "GET",
    headers: requestHeaders,
  });
  const user = await request.json();

  return user;
}

export async function getDepartmentCoworkers() {
  const request = await fetch(`${baseURL}/users/departments/coworkers`, {
    method: "GET",
    headers: requestHeaders,
  });
  const coworkers = await request.json();

  return coworkers;
}

export async function getCurrentUserCompanyDepartments() {
  const request = await fetch(`${baseURL}/users/departments`, {
    method: "GET",
    headers: requestHeaders,
  });
  const currentUserCompanyDepartments = await request.json();

  return currentUserCompanyDepartments;
}

export async function updateCurrentUserInfo(userNewInfo) {
  const request = await fetch(`${baseURL}/users`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(userNewInfo),
  });
  const userInfo = await request.json();

  return userInfo;
}

export async function getAllUsers() {
  const request = await fetch(`${baseURL}/users`, {
    method: "GET",
    headers: requestHeaders,
  });
  const users = await request.json();

  return users;
}

export async function getAdmissibleUsers() {
  const request = await fetch(`${baseURL}/admin/out_of_work`, {
    method: "GET",
    headers: requestHeaders,
  });
  const users = await request.json();

  return users;
}

export async function updateEmployeeInfo(employeeID, employeeInfo) {
  const request = await fetch(`${baseURL}/admin/update_user/${employeeID}`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(employeeInfo),
  });
  const updatedInfo = await request.json();

  return updatedInfo;
}

export async function deleteEmployeeInfo(employeeID) {
  await fetch(`${baseURL}/admin/delete_user/${employeeID}`, {
    method: "DELETE",
    headers: requestHeaders,
  });
}

export async function registerCompany(companyInfo) {
  const request = await fetch(`${baseURL}/companies`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(companyInfo),
  });
  const newCompany = await request.json();

  return newCompany;
}

export async function getAllDepartments() {
  const request = await fetch(`${baseURL}/departments`, {
    method: "GET",
    headers: requestHeaders,
  });
  const departments = await request.json();

  return departments;
}

export async function getCompanyDepartments(companyID) {
  const request = await fetch(`${baseURL}/departments/${companyID}`, {
    method: "GET",
    headers: requestHeaders,
  });
  const departments = await request.json();

  return departments;
}

export async function createDepartment(departmentInfo) {
  const request = await fetch(`${baseURL}/departments`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(departmentInfo),
  });
  const newDepartment = await request.json();

  return newDepartment;
}

export async function hireUser(hiringInfo) {
  const request = await fetch(`${baseURL}/departments/hire/`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(hiringInfo),
  });
  const newEmployee = await request.json();

  return newEmployee;
}

export async function dismissUser(userID) {
  const request = await fetch(`${baseURL}/departments/dismiss/${userID}`, {
    method: "PATCH",
    headers: requestHeaders,
  });
  const exEmployee = await request.json();

  return exEmployee;
}

export async function updateDepartmentDescription(
  departmentID,
  departmentDescription
) {
  const request = await fetch(`${baseURL}/departments/${departmentID}`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(departmentDescription),
  });
  const newDescription = await request.json();

  return newDescription;
}

export async function deleteDepartment(departmentID) {
  await fetch(`${baseURL}/departments/${departmentID}`, {
    method: "DELETE",
    headers: requestHeaders,
  });
}
