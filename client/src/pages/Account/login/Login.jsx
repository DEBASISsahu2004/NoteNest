import styles from "../account.module.css";
import { useState } from "react";
import Logodark from "../../../assets/images/logo-dark.svg";
import Logolight from "../../../assets/images/logo-light.svg";
import Googlelogo from "../../../assets/images/google-logo.svg";
import { useSelector } from 'react-redux';
import Input from "../../../components/inputfield/Input";

const Login = () => {
  const [userDetails, setUserDetails] = useState({ email: '', password: '', confirmPassword: '', otp: '' });
  const [formPage, setFormPage] = useState({ forgotPassword: false, resetPassword: false });
  const theme = useSelector((state) => state.theme.theme);

  const handlebackClick = (moveTo) => {
    switch (moveTo) {
      case 'login':
        setFormPage({ forgotPassword: false, resetPassword: false });
        break;
      case 'toforgotpassword':
        setFormPage({ ...formPage, resetPassword: false });
        break;
      default:
        break;
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(userDetails);
    console.log('form submitted');
    setUserDetails({ email: '', password: '', confirmPassword: '', otp: '' });
  }

  return (
    !formPage.forgotPassword ? (
      <div className={styles.formContainer}>
        <div className={styles.formName}>
          <h1>Login</h1>
          <a href="/">
            <img src={theme === "dark" ? Logodark : Logolight} alt="logo" />
          </a>
        </div>

        <form onSubmit={handleFormSubmit}>
          <Input label="Email" name="email" type="email" placeholder="example@gmail.com" value={userDetails.email} onChange={handleInputChange} />
          <div className={styles.passwordContainer}>
            <Input label="Password" name="password" type="password" placeholder="******" value={userDetails.password} onChange={handleInputChange} autocomplete="current-password" />
            <button type="button" onClick={() => setFormPage({ ...formPage, forgotPassword: true })} className={styles.forgotPasswordButton}>forgot password?</button>
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
    ) : (
      !formPage.resetPassword ? (
        <div className={styles.formContainer}>
          <div className={styles.formName}>
            <h1>Forgot Password</h1>
            <a href="/">
              <img src={theme === "dark" ? Logodark : Logolight} alt="logo" />
            </a>
          </div>

          <form onSubmit={handleFormSubmit}>
            <Input label="Email" name="email" type="email" placeholder="example@gmail.com" value={userDetails.email} onChange={handleInputChange} />
            <div className={styles.buttonWrapper}>
              <button type="button" onClick={() => handlebackClick("login")} className={styles.backButton}>Back</button>
              <button type="submit" onClick={() => setFormPage((prevData) => ({ ...prevData, resetPassword: true }))} className={styles.formSubmitButton}>Verify</button>
            </div>
          </form>

          <p className={styles.formFooter}>Don&apos;t have an account? <a href="/signup">Sign up</a></p>

        </div>
      ) : (
        <div className={styles.formContainer}>
          <div className={styles.formName}>
            <h1>Reset Password</h1>
            <a href="/">
              <img src={theme === "dark" ? Logodark : Logolight} alt="logo" />
            </a>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className={styles.otpContainer}>
              <Input label="OTP" name="otp" type="text" placeholder="123456" value={userDetails.otp} onChange={handleInputChange} />
              <button type="button" onClick={() => console.log("resend otp")} className={styles.resetOtpButton}>Resend OTP</button>
            </div>
            <Input label="New Password" name="password" type="password" placeholder="******" value={userDetails.password} onChange={handleInputChange} autocomplete="new-password" />
            <Input label="Confirm Password" name="confirmPassword" type="password" placeholder="******" value={userDetails.confirmPassword} onChange={handleInputChange} autocomplete="new-password" />
            <div className={styles.buttonWrapper}>
              <button type="button" onClick={() => handlebackClick("toforgotpassword")} className={styles.backButton}>Back</button>
              <button type="submit" className={styles.formSubmitButton}>Update</button>
            </div>
          </form>

          <p className={styles.formFooter}>Don&apos;t have an account? <a href="/signup">Sign up</a></p>

        </div>
      )
    )
  );
}

export default Login