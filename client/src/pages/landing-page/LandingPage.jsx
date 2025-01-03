import styles from './landingPage.module.css'
import Navbar from "../../components/navbar/Navbar"
import BrandName from "../../components/brand-name/BrandName"

const LandingPage = () => {
  const handleClick = () => {
    window.location.href = '/login'
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
      <BrandName className={styles.brandName} />
    </div>
  )
}

export default LandingPage