/**
 * Get logged in user
 */
export const getLoggedInUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
};
