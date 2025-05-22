import styles from './navbar.module.css';
import useLogout from '../userData/useLogout';
import { fetchUserData } from '../userData/userData';
import Logodark from '../../assets/images/logo-dark.svg';
import Logolight from '../../assets/images/logo-light.svg';
import { toggleTheme } from '../../redux/actions/themeActions';
import { updateProfilePic } from '../../redux/actions/userActions';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sun, Moon, UserRoundPlus } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = useLogout();
  const [navStates, setNavStates] = useState({ aboutDropdown: false, loginDropdown: false });

  const theme = useSelector((state) => state.theme.theme);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const profilePic = useSelector((state) => state.user.profilePic);
  const menuRef = useRef(null);

  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchUserData();
      if (data?.userData?.profilepic) {
        dispatch(updateProfilePic(data.userData.profilepic));
      }
    };
    if (isLoggedIn) {
      getUserData();
    } else {
      handleLogout();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setNavStates((prevState) => ({ ...prevState, loginDropdown: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleAboutToggle = () => {
    setNavStates((prevState) => ({ ...prevState, aboutDropdown: !prevState.aboutDropdown }));
  };

  const handleLoginToggle = () => {
    setNavStates((prevState) => ({ ...prevState, loginDropdown: !prevState.loginDropdown }));
  };

  return (
    <>
      <nav className={styles.navContainer}>

        <div className={styles.aboutContainer}>
          <a href="/">
            <img className={styles.logo} src={theme === 'dark' ? Logodark : Logolight} alt="logo" />
          </a>
          {!isLoggedIn && (
            <div className={styles.aboutDropdown} onMouseEnter={() => handleAboutToggle()} onMouseLeave={() => handleAboutToggle()}>
              <p className={`${styles.aboutButton} ${navStates.aboutDropdown ? styles.active : ''}`}>
                Why NoteNest?
              </p>
              <div className={`${styles.aboutContent} ${navStates.aboutDropdown ? styles.active : ''}`}>
                <p><span>Seamless Note Taking: </span>Effortlessly create, edit, and manage notes with a rich text editor.</p>
                <p><span>Visual Creativity: </span>Integrated whiteboard to sketch and visualize ideas directly within your notes.</p>
                <p><span>Personalized Experience: </span>Choose between modern dark and light themes to suit your style.</p>
                <p><span>Cross-Device Compatibility: </span>Access your notes anytime, anywhere, on any device.</p>
              </div>
            </div>
          )}
        </div>

        <div className={styles.authButtonContainer}>
          {!isLoggedIn && (
            <>
              <a href="/login" className={styles.authButton}>LOGIN</a>
              <a href="/signup" className={styles.authButton}>SIGN UP</a>
            </>
          )}

          <button className={styles.themeButton} onClick={handleToggleTheme}>
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>

          {isLoggedIn && (
            <a href="/profile" className={styles.avatarButton}>
              <img src={profilePic} alt="avatar" />
            </a>
          )}

          {!isLoggedIn && (
            <div ref={menuRef} className={styles.menuContainer}>
              <button onClick={handleLoginToggle} className={styles.menuButton}>
                <UserRoundPlus />
              </button>
              {navStates.loginDropdown && (
                <div className={styles.menuDropdown}>
                  <a href="/login" className={styles.menuItem}>LOGIN</a>
                  <a href="/signup" className={styles.menuItem}>SIGN UP</a>
                </div>
              )}
            </div>
          )}
        </div>

      </nav>
    </>
  );
};

export default Navbar;