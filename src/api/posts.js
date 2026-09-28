export const getPosts = async (domain) => {
  const response = await fetch(`${domain}/author/posts`, {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  });
  if (response.status >= 400) {
    const errorData = await response.json();
    return Promise.reject(errorData.error);
  }
  return response.json();
};

export const getPost = async (domain, postId) => {
  const response = await fetch(`${domain}/author/posts/${postId}`, {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  });
  if (response.status >= 400) {
    const errorData = await response.json();
    return Promise.reject(errorData.error);
  }
  return response.json();
};

export const publishPost = async ({ domain, postId }) => {
  const response = await fetch(`${domain}/author/posts/${postId}/publish`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  });
  if (response.status >= 400) {
    const errorData = await response.json();
    return Promise.reject(errorData.error);
  }
  return response.json();
};

export const addPost = async ({ domain, title, text }) => {
  const response = await fetch(`${domain}/posts`, {
    method: "POST",
    body: JSON.stringify({ title: title, text: text }),
    headers: {
      "Content-type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
  });
  if (response.status >= 400) {
    const errorData = await response.json();
    return Promise.reject(errorData);
  }
  return response.json();
};

export const updatePost = async ({ domain, postId, title, text }) => {
  const response = await fetch(`${domain}/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify({ title: title, text: text }),
    headers: {
      "Content-type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
  });
  if (response.status >= 400) {
    const errorData = await response.json();
    return Promise.reject(errorData);
  }
  return response.json();
};

export const deletePost = async ({ domain, postId }) => {
  const response = await fetch(`${domain}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
  });
  if (response.status >= 400) {
    const errorData = await response.json();
    return Promise.reject(errorData);
  }
  return response.json();
};
