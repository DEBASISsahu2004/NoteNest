const api = async (url, method = "GET", body = null, handleLogout = null) => {
  const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${VITE_APP_API_URL}${url}`, options);

    if (response.status === 403 && handleLogout) {
      handleLogout();
      console.log("User token not found, Please login again");
      return;
    }

    const status = response.status;
    const data = await response.json();

    return { status, data };
  } catch (error) {
    return error;
  }
};

export default api;
