const baseUrl = "http://localhost:3333";
const token = localStorage.getItem("@petinfo:token") || "";
const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export async function getAccess(user) {
  const request = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(user),
  });
  const token = await request.json();

  return token;
}

export async function createUser(userInfo) {
  const request = await fetch(`${baseUrl}/users/create`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(userInfo),
  });
  const user = await request.json();

  return user;
}

export async function getCurrentUserInfo() {
  const request = await fetch(`${baseUrl}/users/profile`, {
    method: "GET",
    headers: requestHeaders,
  });
  const user = await request.json();

  return user;
}

export async function getAllPosts() {
  const request = await fetch(`${baseUrl}/posts`, {
    method: "GET",
    headers: requestHeaders,
  });
  const posts = await request.json();
  return posts;
}
export async function createPost(postInfo) {
  const request = await fetch(`${baseUrl}/posts/create`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(postInfo),
  });
  const post = await request.json();
  return post;
}
export async function updatePost(postID, postInfo) {
  const request = await fetch(`${baseUrl}/posts/${postID}`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(postInfo),
  });
  const post = await request.json();
  return post;
}

export async function deletePost(postID) {
  const request = await fetch(`${baseUrl}/posts/${postID}`, {
    method: "DELETE",
    headers: requestHeaders,
  });
  const post = await request.json();

  return post;
}
