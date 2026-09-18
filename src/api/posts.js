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
    throw new Error(errorData.message || "An error occurred");
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
