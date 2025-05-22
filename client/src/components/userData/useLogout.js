import api from "../apis/api";
import { logout } from "../../redux/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const useLogout = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await api("/users/logout", "POST");
      const message = response.data.message;
      if (response.status === 200) {
        await dispatch(logout());
      } else {
        console.error("Logout failed:", message);
        toast.error(message, { theme: theme === "dark" ? "dark" : "light" });
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out, try again 😵‍💫", {
        theme: theme === "dark" ? "dark" : "light",
      });
    }
  };

  return handleLogout;
};

export default useLogout;
