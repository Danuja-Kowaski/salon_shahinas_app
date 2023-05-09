/**
 * Get logged in user
 */
export const getLoggedInUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
};

/**
 * getSavedEmployees
 */
export const getSavedEmployees = () => {
    const employees = JSON.parse(localStorage.getItem("employees"));
    return employees;
};

/**
 * getSavedClients
 */
export const getSavedClients = () => {
    const clients = JSON.parse(localStorage.getItem("clients"));
    return clients;
};
