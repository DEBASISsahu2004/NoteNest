import styles from './landingPage.module.css'
import Navbar from "../../components/navbar/Navbar"
import BrandName from "../../components/brand-name/BrandName"

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <BrandName className={styles.brandName} />
    </>
  )
}

export default LandingPage