import styles from "../account.module.css";
import Logodark from "../../../assets/images/logo-dark.svg";
import Logolight from "../../../assets/images/logo-light.svg";
import Googlelogo from "../../../assets/images/google-logo.svg";
import { useSelector } from 'react-redux';
import Input from "../../../components/inputfield/Input";

const SignUp = () => {
  const theme = useSelector((state) => state.theme.theme);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('form submitted');
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formName}>
        <h1>SignUp</h1>
        <a href="/">
          <img src={theme === "dark" ? Logodark : Logolight} alt="logo" />
        </a>
      </div>

      <form onSubmit={handleFormSubmit}>
        <Input label="Username" inputType="firstname" type="text" placeholder="John" />
        <Input label="Email" inputType="email" type="email" placeholder="example@gamil.com" />
        <button type="submit" className={styles.formSubmitButton}>Verify</button>
      </form>

      <div className={styles.separator}>
        <span>or</span>
        <hr />
      </div>

      <button className={styles.googleButton}>
        <img src={Googlelogo} alt="google logo" />
        Continue with Google
      </button>

      <div className={styles.formFooter}>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  )
}

export default SignUp