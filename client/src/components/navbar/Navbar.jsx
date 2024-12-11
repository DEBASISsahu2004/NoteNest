// import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/actions/themeActions';
import styles from './navbar.module.css';
import Logodark from '../../assets/images/logo-dark.svg';
import Logolight from '../../assets/images/logo-light.svg';
import { Sun, Moon, Menu } from 'lucide-react';
import Avatar1 from '../../assets/images/avatars/avatar1.svg';

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleToggleMenu = () => {
    console.log('menu');
  }

  return (
    <>

      <div className={styles.navContainer}>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={theme === 'dark' ? Logodark : Logolight} alt="logo" />
          {!isLoggedIn && (
            <button className={styles.aboutButton}>
              Why NoteNest?
            </button>
          )}
        </div>

        {isLoggedIn && (
          <h1 className={styles.greeting}>Hello Debasis</h1>
        )}

        <div className={styles.authContainer}>
          {!isLoggedIn && (
            <>
              <button className={styles.authButton}>LOGIN</button>
              <button className={styles.authButton}>SIGN UP</button>
            </>
          )}
          <button className={styles.svgButton} onClick={handleToggleTheme}>
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          {isLoggedIn && (
            <button className={styles.avatarButton}>
              <img src={Avatar1} alt="avatar" />
            </button>
          )}
          {!isLoggedIn && (<button className={styles.svgButton} onClick={handleToggleMenu}>
            <Menu className={styles.menu} />
          </button>)}
        </div>

      </div>
      <hr />
    </>
  );
};

export default Navbar;