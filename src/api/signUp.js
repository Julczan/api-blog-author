export const signUp = async ({ domain, formdata }) => {
  const route = "/user/signup";

  const response = await fetch(domain + route, {
    method: "POST",
    body: JSON.stringify(formdata),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (response.status >= 400) {
    const errorData = await response.json();
    return Promise.reject(errorData);
  }
  return response.json();
};
