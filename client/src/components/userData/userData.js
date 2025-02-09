import api from "../../components/apis/api";
import { toast } from "react-toastify";

const fetchUserData = async (theme) => {
  try {
    const response = await api("/users/getuserdata", "GET");

    if (response.status === 200) {
      const userData = response.data.user;
      const userNoteData = response.data.notes;
      return { userData, userNoteData };
    } else {
      return response.data.message;
    }
  } catch (error) {
    console.log("Error fetching user data:", error);
    toast.error("Error fetching user data, try again 😵‍💫", {
      theme: theme === "dark" ? "dark" : "light",
    });
  }
};

export { fetchUserData };
