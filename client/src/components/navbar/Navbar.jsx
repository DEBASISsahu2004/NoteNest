import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/actions/themeActions';
import styles from './navbar.module.css';
import Logodark from '../../assets/images/logo-dark.svg';
import Logolight from '../../assets/images/logo-light.svg';
import { Sun, Moon, UserRoundPlus } from 'lucide-react';
import Avatar1 from '../../assets/images/avatars/avatar1.svg';

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  console.log(isLoggedIn);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleAboutEnter = () => {
    const aboutContent = document.querySelector(`.${styles.aboutContent}`);
    const aboutButton = document.querySelector(`.${styles.aboutButton}`);
    if (aboutContent && aboutButton) {
      aboutContent.style.display = 'flex';
      aboutButton.style.borderRadius = '8px 8px 0 0';
      aboutButton.style.backgroundColor = 'rgba(var(--secondary))';
    }
  };

  const handleAboutLeave = () => {
    const aboutContent = document.querySelector(`.${styles.aboutContent}`);
    const aboutButton = document.querySelector(`.${styles.aboutButton}`);
    if (aboutContent && aboutButton) {
      aboutContent.style.display = 'none';
      aboutButton.style.borderRadius = '8px';
      aboutButton.style.backgroundColor = 'transparent';
    }
  };

  const handleMenuEnter = () => {
    const menuDropdown = document.querySelector(`.${styles.menuDropdown}`);
    if (menuDropdown) {
      menuDropdown.style.display = 'flex';
    }
  };

  const handleMenuLeave = () => {
    const menuDropdown = document.querySelector(`.${styles.menuDropdown}`);
    if (menuDropdown) {
      menuDropdown.style.display = 'none';
    }
  };

  return (
    <>
      <nav className={styles.navContainer}>

        <div className={styles.aboutContainer}>
          <a href="/">
            <img className={styles.logo} src={theme === 'dark' ? Logodark : Logolight} alt="logo" />
          </a>
          {!isLoggedIn && (
            <div className={styles.aboutDropdown}>
              <button onMouseEnter={handleAboutEnter} onMouseLeave={handleAboutLeave} className={styles.aboutButton}>
                Why NoteNest?
              </button>
              <div onMouseEnter={handleAboutEnter} onMouseLeave={handleAboutLeave} className={styles.aboutContent}>
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
            <button className={styles.avatarButton}>
              <img src={Avatar1} alt="avatar" />
            </button>
          )}

          {!isLoggedIn && (
            <div className={styles.menuContainer}>
              <button onMouseEnter={handleMenuEnter} onMouseLeave={handleMenuLeave} className={styles.menuButton}>
                <UserRoundPlus />
              </button>
              <div onMouseEnter={handleMenuEnter} onMouseLeave={handleMenuLeave} className={styles.menuDropdown}>
                <a href="/login" className={styles.menuItem}>LOGIN</a>
                <a href="/signup" className={styles.menuItem}>SIGN UP</a>
              </div>
            </div>
          )}
        </div>

      </nav>
    </>
  );
};

export default Navbar;