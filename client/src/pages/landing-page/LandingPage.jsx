import styles from './landingPage.module.css'
import Navbar from "../../components/navbar/Navbar"
import BrandName from "../../components/brand-name/BrandName"

import { useSelector } from 'react-redux'

const LandingPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleClick = () => {
    if (isLoggedIn) {
      // Redirect to the dashboard if the user is already logged in
      window.location.href = '/demo';
    } else {
      // Redirect to the login page if the user is not logged in
      window.location.href = '/login';
    }
  }

  return (
    <div className={styles.LandingPage}>
      <Navbar />
      <div className={styles.LandingPageContent}>
        <div className={styles.LandingPageHeader}>
          <h1 className={styles.heading}>Nest Your Ideas</h1>
          <h1 className={styles.heading}>with <span>NoteNest</span></h1>
        </div>

        <p className={styles.description}>&quot;Switch between text and whiteboard modes effortlessly. It&apos;s not just notes; it&apos;s your creative playground.&quot;</p>

        <button onClick={handleClick} className={styles.callToActionButton}>
          Start Nesting
        </button>
      </div>
      <BrandName />
    </div>
  )
}

export default LandingPage