import api from "../../components/apis/api";
import useLogout from "./useLogout";

const fetchUserData = async () => {
  try {
    const response = await api("/users/getuserdata", "GET", useLogout);

    if (response.status === 200) {
      const userData = response.data.user;
      const userNoteData = response.data.notes;
      return { userData, userNoteData };
    } else {
      return response.data.message;
    }
  } catch (error) {
    console.log("Error fetching user data:", error);
  }
};

export { fetchUserData };
