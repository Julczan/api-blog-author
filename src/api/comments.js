export const getComments = async (domain, postId) => {
  const response = await fetch(`${domain}/author/posts/${postId}/comments`);
  return response.json();
};

export const addComment = async ({ domain, postId, text }) => {
  const route = `/autor/posts/${postId}/comments`;

  const response = await fetch(domain + route, {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: {
      "Content-type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
  });
  if (response.status >= 400) {
    const errorData = await response.json();
    return Promise.reject(errorData.error);
  }
  return response.json();
};

export const editComment = async ({ domain, postId, commentId, newText }) => {
  const response = await fetch(
    `${domain}/author/posts/${postId}/comments/${commentId}`,
    {
      method: "PUT",
      body: JSON.stringify({ text: newText }),
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("Authorization"),
      },
    },
  );
  if (response.status >= 400) {
    const errorData = await response.json();
    return Promise.reject(errorData.error);
  }
  return response.json();
};

export const deleteComment = async ({ domain, postId, commentId }) => {
  const response = await fetch(
    `${domain}/author/posts/${postId}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    },
  );
  if (response.status >= 400) {
    const errorData = await response.json();
    return Promise.reject(errorData.error);
  }
  return response.json();
};
