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
import Input from "../../../components/inputfield/Input";
import useLogout from "../../../components/userData/useLogout";

const Profile = () => {
  const theme = useSelector((state) => state.theme.theme);
  const profilePic = useSelector((state) => state.user.profilePic);
  const dispatch = useDispatch();
  const handleLogout = useLogout();
  
  const [userData, setUserData] = useState({});
  const [userNoteData, setUserNoteData] = useState([]);
  
  const [selectedProfilePic, setSelectedProfilePic] = useState('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchUserData();
      console.log('got data');
      if (data) {
        console.log('this is data: ', data);
        setUserData(data.userData);
        setUserNoteData(data.userNoteData);
      } else {
        dispatch(logout());
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
      const response = await api('/users/changeprofilepic', 'POST', { profilepic: selectedProfilePic }, handleLogout);
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
      const response = await api('/users/changeusername', 'POST', { username: newUsername }, handleLogout);
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

  const handleCurrentPassword = async (e) => {
    e.preventDefault();
    console.log(e.target.currentpassword.value);

    try {
      const response = await api('/users/checkpassword', 'POST', { password: e.target.currentpassword.value }, handleLogout);
      const message = response.data.message;
      if (response.status === 200) {
        toast.success(message, { theme: theme === 'dark' ? 'dark' : 'light' });
        console.log('Password correct');
      } else {
        toast.error(message, { theme: theme === 'dark' ? 'dark' : 'light' });
        console.log('Password incorrect');
      }
    } catch (error) {
      console.error('Error checking password:', error);
      toast.error('Error checking password, try again 😵‍💫', { theme: theme === 'dark' ? 'dark' : 'light' });
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
            <button type="button" onClick={() => {
              setChangePassword(true);
            }} className={styles.changePasswordButton}>Change Password</button>
            <a href="/dashboard" className={styles.dashboardButton}>Back to dashboard</a>
            <button type="button" onClick={handleLogout} className={styles.logoutButton}>Logout</button>
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


      {changePassword && (
        <section className={styles.changePasswordSection}>
          <div className={styles.FormContainer}>
            <h1 className={styles.title}>Change Password</h1>

            <form className={styles.currentPasswordForm} onSubmit={handleCurrentPassword}>
              <Input name="currentpassword" type="password" placeholder="Enter Current Password" />
              <div className={styles.buttonContainer}>
                <button type="button" className={styles.cancelButton} onClick={() => {
                  setChangePassword(false);
                }}>Cancel</button>
                <button type="submit" className={styles.saveButton}>Next</button>
              </div>
            </form>


          </div>
        </section>
      )}
    </div>
  );
};

export default Profile;