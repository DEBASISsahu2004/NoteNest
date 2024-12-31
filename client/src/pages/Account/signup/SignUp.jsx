import styles from "../account.module.css";
import Logodark from "../../../assets/images/logo-dark.svg";
import Logolight from "../../../assets/images/logo-light.svg";
import Googlelogo from "../../../assets/images/google-logo.svg";
import { useSelector } from 'react-redux';
import Input from "../../../components/inputfield/Input";
import { useState } from 'react';

const SignUp = () => {
  const theme = useSelector((state) => state.theme.theme);

  const [userDetails, setUserDetails] = useState({ username: '', email: '', password: '' });
  const [formPage, setFormPage] = useState({ verifyEmail: false });

  // const handlebackClick = () => {
  //   setFormPage({ forgotPassword: false, resetPassword: false });
  // }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(userDetails);
    console.log('form submitted');
    setFormPage((prevData) => ({ ...prevData, verifyEmail: true }));
  }

  return (
    !formPage.verifyEmail ? (
      <div className={styles.formContainer}>
        <div className={styles.formName}>
          <h1>SignUp</h1>
          <a href="/">
            <img src={theme === "dark" ? Logodark : Logolight} alt="logo" />
          </a>
        </div>

        <form onSubmit={handleFormSubmit}>
          <Input label="Username" name="username" type="text" placeholder="John" value={userDetails.username} onChange={handleInputChange} autocomplete="username" />
          <Input label="Email" name="email" type="email" placeholder="example@gmail.com" value={userDetails.email} onChange={handleInputChange} />
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
    ) : (
      <div className={styles.formContainer}>
        <div className={styles.formName}>
          <h1>Set Password</h1>
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
            <button type="button" onClick={() => setFormPage((prevDetails) => ({ ...prevDetails, verifyEmail: false }))} className={styles.backButton}>Back</button>
            <button type="submit" className={styles.formSubmitButton}>Update</button>
          </div>
        </form>

        <p className={styles.formFooter}>Don&apos;t have an account? <a href="/signup">Sign up</a></p>

      </div>
    )
  )
}

export default SignUp