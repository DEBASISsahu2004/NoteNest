import styles from "./profile.module.css";
import Navbar from "../../../components/navbar/Navbar";
import BrandName from "../../../components/brand-name/BrandName";
import api from "../../../components/apis/api";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Profile = () => {
  const theme = useSelector((state) => state.theme.theme);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api('/api/users/profile', 'GET');

        if (response.status === 200) {
          setUserData(response.data);
          console.log("using data:", response.data);
        } else {
          console.log(response.data.message);
          toast.error('Error getting user data', { theme: theme === 'dark' ? 'dark' : 'light' });
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={styles.ProfileContainer}>
      <Navbar />
      <div className={styles.ProfileContent}>
        <div>
          <img src={userData.profilepic} alt="Profile" />
          <div>
            <div>
              <h2>{userData.username}</h2>
              <p>{userData.email}</p>
            </div>

            <button>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <BrandName />
    </div>
  )
}

export default Profile