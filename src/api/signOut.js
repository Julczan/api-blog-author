export const signOut = () => {
  localStorage.removeItem("Authorization");
  localStorage.removeItem("User");
};
