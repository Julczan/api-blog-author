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
