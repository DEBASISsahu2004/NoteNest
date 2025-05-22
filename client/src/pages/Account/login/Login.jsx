import styles from "../account.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Sun, Moon } from 'lucide-react';

import Logodark from "../../../assets/images/logo-dark.svg";
import Logolight from "../../../assets/images/logo-light.svg";
import Input from "../../../components/inputfield/Input";
import { toggleTheme } from '../../../redux/actions/themeActions';
import BrandName from "../../../components/brand-name/BrandName";
import GoogleButton from "../../../components/googleButton/GoogleButton";
import api from '../../../components/apis/api';
import { login } from '../../../redux/actions/authActions';

const Login = () => {
  const theme = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({ email: '', password: '', confirmPassword: '', otp: '' });
  const [formPage, setFormPage] = useState('loginForm');
  const [timer, setTimer] = useState();
  const [errors, setErrors] = useState({});

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  }

  useEffect(() => {
    if (formPage === 'verifyOTP') {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [timer]);

  // Format time function
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Login function
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const formButton = e.target.querySelector('button[type="submit"]');
    formButton.innerText = 'Logging in... ⌛';
    formButton.disabled = true;
    formButton.style.cursor = 'not-allowed';

    const { email, password } = userDetails;

    let validationErrors = {};
    if (email === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = 'Please enter a valid email';
    }

    if (password.length < 4) {
      validationErrors.password = 'Password must be at least 4 characters';
    }

    // As the object does not have any property like length to calculate the size, we first convert the object to array using Object.keys() and than use the length function
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await api('/users/login', 'POST', { email, password });

      formButton.innerText = 'Login';
      formButton.disabled = false;
      formButton.style.cursor = 'pointer';

      if (response.status === 200) {
        dispatch(login());
        navigate('/dashboard');
      } else {
        console.log(response.data.message);
        toast.error(response.data.message, { theme: theme === 'dark' ? 'dark' : 'light' });
      }
    } catch (error) {
      console.log('Error logging in:', error);
      toast.error('Error logging in, try again 😵‍💫', { theme: theme === 'dark' ? 'dark' : 'light' });
    }
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    const formButton = e.target.querySelector('button[type="submit"]');
    formButton.innerText = 'Sending OTP... ⌛';
    formButton.disabled = true;
    formButton.style.cursor = 'not-allowed';

    const { email } = userDetails;

    let validationErrors = {};
    if (email === '') {
      validationErrors.email = 'Email cannot be empty';
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      validationErrors.email = 'Please enter a valid email';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await api('/users/verifyemail', 'POST', { email });

      formButton.innerText = 'Send OTP';
      formButton.disabled = false;
      formButton.style.cursor = 'pointer';

      if (response.status === 200) {
        toast.success(response.data.message, { theme: theme === 'dark' ? 'dark' : 'light' });
        setFormPage('verifyOTP');
        setTimer(300);
      } else {
        console.log(response.data.message);
        toast.error(response.data.message, { theme: theme === 'dark' ? 'dark' : 'light' });
      }
    } catch (error) {
      console.log('Error verifying email:', error);
      toast.error('Error verifying email, try again 😵‍💫', { theme: theme === 'dark' ? 'dark' : 'light' });
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    const formButton = e.target.querySelector('button[type="submit"]');
    formButton.innerText = 'Verifying OTP... ⌛';
    formButton.disabled = true;
    formButton.style.cursor = 'not-allowed';

    const { email, otp } = userDetails;

    let validationErrors = {};
    if (otp === '') {
      validationErrors.otp = 'OTP is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await api('/users/verifyotp', 'POST', { email, otp });
      
      formButton.innerText = 'Verify OTP';
      formButton.disabled = false;
      formButton.style.cursor = 'pointer';

      if (response.status === 200) {
        toast.success(response.data.message, { theme: theme === 'dark' ? 'dark' : 'light' });
        setFormPage('enterPassword');
      } else {
        console.log(response.data.message);
        toast.error(response.data.message, { theme: theme === 'dark' ? 'dark' : 'light' });
      }
    } catch (error) {
      console.log('Error verifying OTP:', error);
      toast.error('Error verifying OTP, try again 😵‍💫', { theme: theme === 'dark' ? 'dark' : 'light' });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const formButton = e.target.querySelector('button[type="submit"]');
    formButton.innerText = 'Resetting Password... ⌛';
    formButton.disabled = true;
    formButton.style.cursor = 'not-allowed';

    const { email, password, confirmPassword } = userDetails;

    let validationErrors = {};
    if (password.length < 4) {
      validationErrors.password = 'Password must be at least 4 characters';
    }

    if (confirmPassword === '' || confirmPassword.length < 4) {
      validationErrors.confirmPassword = 'Password must be at least 4 characters';
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match', { theme: theme === 'dark' ? 'dark' : 'light' });
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    toast.info('Changing password... ⌛', { theme: theme === 'dark' ? 'dark' : 'light' });

    try {
      const response = await api('/users/resetpassword', 'POST', { email, password });
      
      formButton.innerText = 'Reset';
      formButton.disabled = false;
      formButton.style.cursor = 'pointer';

      if (response.status === 200) {
        toast.success(response.data.message, { theme: theme === 'dark' ? 'dark' : 'light' });
        setUserDetails((prevDetails) => ({ ...prevDetails, email: '', password: '', confirmPassword: '', otp: '' }));
        setFormPage('loginForm');
      } else {
        console.log(response.data.message);
        toast.error(response.data.message, { theme: theme === 'dark' ? 'dark' : 'light' });
      }
    } catch (error) {
      console.log('Error resetting password:', error);
      toast.error('Error resetting password, try again 😵‍💫', { theme: theme === 'dark' ? 'dark' : 'light' });
    }
  }

  const resendOtp = async () => {
    toast.info('Resending OTP...', { theme: theme === 'dark' ? 'dark' : 'light' });
    try {
      const { email } = userDetails;

      const response = await api('/users/resendotp', 'POST', { email });

      if (response.status === 200) {
        toast.success(response.data.message, { theme: theme === 'dark' ? 'dark' : 'light' });
        setTimer(300);
      } else {
        console.log(response.data.message);
        toast.error(response.data.message, { theme: theme === 'dark' ? 'dark' : 'light' });
      }

    } catch (error) {
      console.log('Error resending OTP:', error);
      toast.error('Error resending OTP, try again 😵‍💫', { theme: theme === 'dark' ? 'dark' : 'light' });
    }
  }

  return (
    <div className={styles.formWrapper}>
      {formPage === 'loginForm' && (
        <div className={styles.formContainer}>
          <div className={styles.formHeading}>
            <div className={styles.formTitle}>
              <h1>Login</h1>
              <a href="/">
                <img src={theme === "dark" ? Logodark : Logolight} alt="logo" />
              </a>
            </div>
            <p className={styles.formSubtitle}>Enter your email and password to login.</p>
          </div>

          <form onSubmit={handleLoginSubmit}>
            <div>
              <Input label="Email" name="email" type="email" placeholder="example@gmail.com" value={userDetails.email} onChange={handleInputChange} />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            <div className={styles.passwordContainer}>
              <Input label="Password" name="password" type="password" placeholder="******" value={userDetails.password} onChange={handleInputChange} autocomplete="current-password" />

              <div className={styles.passwordFunctions}>
                {errors.password && <p className={styles.error}>{errors.password}</p>}
                <button type="button" onClick={() => setFormPage('enterEmail')} className={styles.forgotPasswordButton}>forgot password?</button>
              </div>
            </div>
            <button type="submit" className={styles.formSubmitButton}>Login</button>
          </form>

          <div className={styles.separator}>
            <span>or</span>
            <hr />
          </div>

          <GoogleButton />

          <div className={styles.formFooter}>
            <p>Don&apos;t have an account? <a href="/signup">Sign up</a></p>
          </div>
        </div>
      )}

      {formPage === 'enterEmail' && (
        <div className={styles.formContainer}>
          <div className={styles.formHeading}>
            <div className={styles.formTitle}>
              <h1>Forgot Password</h1>
              <a href="/">
                <img src={theme === "dark" ? Logodark : Logolight} alt="logo" />
              </a>
            </div>
            <p className={styles.formSubtitle}>Enter your email to reset your password.</p>
          </div>

          <form onSubmit={handleEmailSubmit}>
            <div>
              <Input label="Email" name="email" type="email" placeholder="example@gmail.com" value={userDetails.email} onChange={handleInputChange} />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            <div className={styles.buttonWrapper}>
              <button type="button" onClick={() => {
                setUserDetails((prevDetails) => ({ ...prevDetails, email: '' }));
                setFormPage('loginForm');
                setErrors({});
              }} className={styles.backButton}>Back</button>
              <button type="submit" className={styles.formSubmitButton}>Send OTP</button>
            </div>
          </form>
        </div>
      )}

      {formPage === 'verifyOTP' && (
        <div className={styles.formContainer}>
          <div className={styles.formHeading}>
            <div className={styles.formTitle}>
              <h1>Verify OTP</h1>
              <a href="/">
                <img src={theme === "dark" ? Logodark : Logolight} alt="logo" />
              </a>
            </div>
            <p className={styles.formSubtitle}>Check your email for the OTP and enter it below.</p>
          </div>

          <form onSubmit={handleOtpSubmit}>
            <div>
              <Input label="OTP" name="otp" type="text" placeholder="123456" value={userDetails.otp} onChange={handleInputChange} />
              {errors.otp && <p className={styles.error}>{errors.otp}</p>}
            </div>

            <div className={styles.otpFunctions}>
              <p>OTP expires in: {formatTime(timer)}</p>
              <button type="button" onClick={resendOtp} className={styles.resetOtpButton}>Resend OTP</button>
            </div>

            <div className={styles.buttonWrapper}>
              <button type="button" onClick={() => {
                setUserDetails((prevDetails) => ({ ...prevDetails, otp: '' }));
                setFormPage('enterEmail');
                setErrors({});
              }} className={styles.backButton}>Back</button>
              <button type="submit" className={styles.formSubmitButton}>Verify OTP</button>
            </div>
          </form>
        </div>
      )}

      {formPage === 'enterPassword' && (
        <div className={styles.formContainer}>
          <div className={styles.formHeading}>
            <div className={styles.formTitle}>
              <h1>Reset Password</h1>
              <a href="/">
                <img src={theme === "dark" ? Logodark : Logolight} alt="logo" />
              </a>
            </div>
            <p className={styles.formSubtitle}>Enter the OTP sent to your email and set a new password.</p>
          </div>

          <form onSubmit={handlePasswordSubmit}>

            <div>
              <Input label="New Password" name="password" type="password" placeholder="******" value={userDetails.password} onChange={handleInputChange} autocomplete="new-password" />
              {errors.password && <p className={styles.error}>{errors.password}</p>}
            </div>

            <div>
              <Input label="Confirm Password" name="confirmPassword" type="password" placeholder="******" value={userDetails.confirmPassword} onChange={handleInputChange} autocomplete="new-password" />
              {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
            </div>

            <div className={styles.buttonWrapper}>
              <button type="button" onClick={() => {
                setUserDetails((prevDetails) => ({ ...prevDetails, otp: '', password: '', confirmPassword: '' }));
                setFormPage('enterEmail');
                setErrors({});
              }} className={styles.backButton}>Back</button>
              <button type="submit" className={styles.formSubmitButton}>Reset</button>
            </div>
          </form>
        </div>
      )}

      <BrandName className={styles.brandName} />

      <button className={styles.themeButton} onClick={handleToggleTheme}>
        {theme === "dark" ? <Sun /> : <Moon />}
      </button>
    </div>
  );
}

export default Login;