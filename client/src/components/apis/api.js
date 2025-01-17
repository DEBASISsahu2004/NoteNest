const api = async (url, method = "GET", body = null) => {
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

    const status = response.status;

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${status}`);
    }

    const data = await response.json();

    return { status, data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return Promise.reject(error.message);
  }
};

export default api;
