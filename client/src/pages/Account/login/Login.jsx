import styles from "../account.module.css";
import Logodark from "../../../assets/images/logo-dark.svg";
import Logolight from "../../../assets/images/logo-light.svg";
import Googlelogo from "../../../assets/images/google-logo.svg";
import { useSelector } from 'react-redux';
import Input from "../../../components/inputfield/Input";

const Login = () => {
  const theme = useSelector((state) => state.theme.theme);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('form submitted');
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formName}>
        <h1>Login</h1>
        <a href="/">
          <img src={theme === "dark" ? Logodark : Logolight} alt="logo" />
        </a>
      </div>

      <form onSubmit={handleFormSubmit}>
        <Input label="Email" inputType="email" type="email" placeholder="example@gmail.com" />
        <div className={styles.passwordContainer}>
          <Input label="Password" inputType="password" type="password" placeholder="******" />
          <button type="button" className={styles.forgotPasswordButton}>forgot password?</button>
        </div>
        <button type="submit" className={styles.formSubmitButton}>Login</button>
      </form>

      <div className={styles.separator}>
        <span>or</span>
        <hr />
      </div>

      <button className={styles.googleButton}>
        <img src={Googlelogo} alt="google logo" />
        Continue with Google
      </button>

      <p className={styles.formFooter}>Don&apos;t have an account? <a href="/signup">Sign up</a></p>

    </div>
  )
}

export default Login