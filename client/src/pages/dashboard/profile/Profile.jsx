import styles from "./profile.module.css";
import Navbar from "../../../components/navbar/Navbar";
import api from "../../../components/apis/api";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchUserData } from '../../../components/userData/userData';
import { updateProfilePic, updateUsername } from '../../../redux/actions/userActions';
import { images } from "../../../components/randomprofilepic/randomprofilepic";
import { UserPen } from 'lucide-react';
import { logout } from '../../../redux/actions/authActions';
// import { useNavigate } from 'react-router-dom';

const Profile = () => {
  // const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  const profilePic = useSelector((state) => state.user.profilePic);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({});
  const [userNoteData, setUserNoteData] = useState([]);
  const [selectedProfilePic, setSelectedProfilePic] = useState('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchUserData(theme);
      if (data) {
        setUserData(data.userData);
        setUserNoteData(data.userNoteData);
      }
    };
    getUserData();
  }, []);

  const handleProfilepicClick = () => {
    document.querySelector(`.${styles.selectProfilePic}`).style.display = 'grid';
  };

  const handleSelectImage = (e) => {
    setSelectedProfilePic(e.target.src);
  };

  const handleSavePic = async () => {
    document.querySelector(`.${styles.selectProfilePic}`).style.display = 'none';
    try {
      const response = await api('/users/changeprofilepic', 'POST', { profilepic: selectedProfilePic });
      const message = response.data.message;
      if (response.status === 200) {
        toast.success(message, { theme: theme === 'dark' ? 'dark' : 'light' });
        dispatch(updateProfilePic(selectedProfilePic));
      } else {
        toast.error(message, { theme: theme === 'dark' ? 'dark' : 'light' });
      }
    } catch (error) {
      console.error('Error changing profile pic:', error);
      toast.error('Error changing profile pic, try again 😵‍💫', { theme: theme === 'dark' ? 'dark' : 'light' });
    }
  };

  const handleCancelPic = () => {
    setSelectedProfilePic('');
    document.querySelector(`.${styles.selectProfilePic}`).style.display = 'none';
  };

  const handleUsernameClick = () => {
    setIsEditingUsername(true);
    setNewUsername(userData.username);
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleSaveUsername = async () => {
    try {
      const response = await api('/users/changeusername', 'POST', { username: newUsername });
      const message = response.data.message;

      console.log(message);
      if (response.status === 200) {
        toast.success(message, { theme: theme === 'dark' ? 'dark' : 'light' });
        dispatch(updateUsername(newUsername));
        setUserData({ ...userData, username: newUsername });
        setIsEditingUsername(false);
      } else {
        toast.error(message, { theme: theme === 'dark' ? 'dark' : 'light' });
      }
    } catch (error) {
      console.error('Error changing username:', error);
      toast.error('Error changing username, try again 😵‍💫', { theme: theme === 'dark' ? 'dark' : 'light' });
    }
  };

  const handleCancelUsername = () => {
    setIsEditingUsername(false);
  };

  if (!userData || Object.keys(userData).length === 0) {
    return (
      <div className={styles.ProfileContainer}>
        <Navbar />
        <div className={styles.ProfileContent}>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      const response = await api('/users/logout', 'POST');
      const message = response.data.message;
      if (response.status === 200) {
        toast.success(message, { theme: theme === 'dark' ? 'dark' : 'light' });
        dispatch(logout());
      } else {
        toast.error(message, { theme: theme === 'dark' ? 'dark' : 'light' });
      }
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error logging out, try again 😵‍💫', { theme: theme === 'dark' ? 'dark' : 'light' });
    }
  }

  return (
    <div className={styles.ProfileContainer}>
      <Navbar />
      <div className={styles.ProfileContent}>
        <div className={styles.imageSection}>
          <img onClick={handleProfilepicClick} className={styles.profilePic} src={selectedProfilePic || profilePic} alt="profile pic" />
          <div className={styles.selectProfilePic}>
            <div className={styles.profilePicContainer}>
              {images.map((image, index) => (
                <img onClick={handleSelectImage} key={index} src={image} alt="profile pic" />
              ))}
            </div>
            <div className={styles.profileButtons}>
              <button className={styles.profilePicSaveButton} type="button" onClick={handleSavePic}>save</button>
              <button className={styles.profilePicCancelButton} type="button" onClick={handleCancelPic}>cancel</button>
            </div>
          </div>
        </div>

        <div className={styles.userDetails}>
          <div className={styles.userCredentials}>
            <h2 className={styles.userName}>
              {isEditingUsername ? (
                <>
                  <input className={styles.changeNameInputField} type="text" value={newUsername} onChange={handleUsernameChange} />
                  <button className={styles.changeNameSaveButton} onClick={handleSaveUsername}>Save</button>
                  <button className={styles.changeNameCancelButton} onClick={handleCancelUsername}>Cancel</button>
                </>
              ) : (
                <>
                  {userData.username} <UserPen className={styles.editUserName} onClick={handleUsernameClick} />
                </>
              )}
            </h2>
            <h4 className={styles.userEmail}>{userData.email}</h4>
          </div>

          <div className={styles.userStats}>
            <div className={styles.stats}>
              <h2 className={styles.title}>Total Notes</h2>
              <p>{userNoteData.length}</p>
            </div>
            <div className={styles.stats}>
              <h2 className={styles.title}>Favourites</h2>
              <p className={styles.value}>{userNoteData.filter((userNote) => userNote.isFavorite).length}</p>
            </div>
          </div>

          <div className={styles.actionButtonContainer}>
            <button type="button" className={styles.changePasswordButton}>Change Password</button>
            <button type="button" onClick={handleLogout} className={styles.logoutButton}>Logout</button>
            <a href="/dashboard" className={styles.dashboardButton}>Back to dashboard</a>
          </div>
        </div>

        <div className={styles.noteDetails}>
          <div className={styles.noteType}>
            <h2>All Notes</h2>
            <h2>Favourite Notes</h2>
          </div>

          <div className={styles.noteList}>
            no notes
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;