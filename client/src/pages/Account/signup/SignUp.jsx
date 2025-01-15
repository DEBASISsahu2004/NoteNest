import styles from "../account.module.css";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import Sun from '../../../assets/images/icons/sun.svg';
import Moon from '../../../assets/images/icons/moon.svg';
import Logodark from "../../../assets/images/logo-dark.svg";
import Logolight from "../../../assets/images/logo-light.svg";
import Input from "../../../components/inputfield/Input";
import { toggleTheme } from '../../../redux/actions/themeActions';
import BrandName from "../../../components/brand-name/BrandName";
import GoogleButton from "../../../components/googleButton/GoogleButton";

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

const SignUp = () => {
  console.log(VITE_APP_API_URL);
  const theme = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();

  const [timer, setTimer] = useState();
  const [userDetails, setUserDetails] = useState({ username: '', email: '', password: '', confirmPassword: '', otp: '' });
  const [formPage, setFormPage] = useState('enterEmail');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

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
  }, [formPage, timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const { email } = userDetails;

    let validationErrors = {};
    if (email === '') {
      toast.error('Please enter your email', { theme: theme === 'dark' ? 'dark' : 'light' });
      validationErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email', { theme: theme === 'dark' ? 'dark' : 'light' });
      validationErrors.email = 'Please enter a valid email';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    toast.info('Verifying email...', { theme: theme === 'dark' ? 'dark' : 'light' });

    try {
      const response = await fetch(`${VITE_APP_API_URL}/api/users/sendotp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success('OTP sent to email', { theme: theme === 'dark' ? 'dark' : 'light' });
        setFormPage('verifyOTP');
        setTimer(300);
      } else {
        toast.error(data.message || 'Error verifying email', { theme: theme === 'dark' ? 'dark' : 'light' });
      }
    } catch (error) {
      console.log('Error verifying email:', error);
      toast.error('Error verifying email', { theme: theme === 'dark' ? 'dark' : 'light' });
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    const { email, otp } = userDetails;

    let validationErrors = {};
    if (otp === '') {
      toast.error('Please enter the OTP', { theme: theme === 'dark' ? 'dark' : 'light' });
      validationErrors.otp = 'OTP is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await fetch(`${VITE_APP_API_URL}/api/users/verifyotp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success('OTP verified successfully', { theme: theme === 'dark' ? 'dark' : 'light' });
        setFormPage('setPassword');
      } else {
        toast.error(data.message || 'Error verifying OTP', { theme: theme === 'dark' ? 'dark' : 'light' });
      }
    } catch (error) {
      console.log('Error verifying OTP:', error);
      toast.error('Error verifying OTP', { theme: theme === 'dark' ? 'dark' : 'light' });
    }
  };

  const handleCredSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = userDetails;

    let validationErrors = {};
    if (username === '') {
      validationErrors.username = 'Username is required';
    }

    if (password === '' || password.length < 4) {
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
      toast.error('Please fill in all required fields', { theme: theme === 'dark' ? 'dark' : 'light' });
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await fetch(`${VITE_APP_API_URL}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success('Account created successfully', { theme: theme === 'dark' ? 'dark' : 'light' });
        localStorage.setItem('username', username);
        navigate('/demo');
      } else {
        toast.error(data.message || 'Error creating account', { theme: theme === 'dark' ? 'dark' : 'light' });
      }
    } catch (error) {
      console.log('Error creating account:', error);
      toast.error('Error creating account', { theme: theme === 'dark' ? 'dark' : 'light' });
    }
  };

  const resendOtp = async () => {
    toast.info('Resending OTP...', { theme: theme === 'dark' ? 'dark' : 'light' });
    try {
      const { email } = userDetails;

      const response = await fetch(`${VITE_APP_API_URL}/api/users/resendotp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success('OTP sent to email', { theme: theme === 'dark' ? 'dark' : 'light' });
        setTimer(300);
      } else {
        toast.error(data.message || 'Error resending OTP', { theme: theme === 'dark' ? 'dark' : 'light' });
        resendOtp();
      }

    } catch (error) {
      console.log('Error resending OTP:', error);
      toast.error('Error resending OTP', { theme: theme === 'dark' ? 'dark' : 'light' });
    }
  }

  return (
    <div className={styles.formWrapper}>
      {formPage === 'enterEmail' && (
        <div className={styles.formContainer}>
          <div className={styles.formHeading}>
            <div className={styles.formTitle}>
              <h1>Create Account</h1>
              <a href="/">
                <img src={theme === "dark" ? Logodark : Logolight} alt="logo" />
              </a>
            </div>
            <p className={styles.formSubtitle}>Provide your email to start creating your account.</p>
          </div>

          <form onSubmit={handleEmailSubmit}>
            <div>
              <Input label="Email" name="email" type="email" placeholder="example@gmail.com" value={userDetails.email} onChange={handleInputChange} />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>
            <button type="submit" className={styles.formSubmitButton}>Verify</button>
          </form>

          <div className={styles.separator}>
            <span>or</span>
            <hr />
          </div>

          <GoogleButton />

          <div className={styles.formFooter}>
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
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

          <form onSubmit={handleOTPSubmit}>
            <Input label="OTP" name="otp" type="text" placeholder="123456" value={userDetails.otp} onChange={handleInputChange} />
            {errors.otp && <p className={styles.error}>{errors.otp}</p>}

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
              <button type="submit" className={styles.formSubmitButton}>Next</button>
            </div>
          </form>
        </div>
      )}

      {formPage === 'setPassword' && (
        <div className={styles.formContainer}>
          <div className={styles.formHeading}>
            <div className={styles.formTitle}>
              <h1>Set Password</h1>
              <a href="/">
                <img src={theme === "dark" ? Logodark : Logolight} alt="logo" />
              </a>
            </div>
            <p className={styles.formSubtitle}>Create a strong password to secure your account.</p>
          </div>

          <form onSubmit={handleCredSubmit}>
            <div className={styles.credentialsWrapper}>
              <div>
                <Input label="Username" name="username" type="text" placeholder="Your username" value={userDetails.username} onChange={handleInputChange} />
                {errors.username && <p className={styles.error}>{errors.username}</p>}
              </div>

              <div>
                <Input label="New Password" name="password" type="password" placeholder="Enter more than 4 character" value={userDetails.password} onChange={handleInputChange} autocomplete="new-password" />
                {errors.password && <p className={styles.error}>{errors.password}</p>}
              </div>

              <div>
                <Input label="Confirm Password" name="confirmPassword" type="password" placeholder="Enter more than 4 character" value={userDetails.confirmPassword} onChange={handleInputChange} autocomplete="new-password" />
                {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <button type="button" onClick={() => {
                setUserDetails((prevDetails) => ({ ...prevDetails, username: '', password: '', confirmPassword: '' }));
                setFormPage('enterEmail')
                setErrors({})
              }
              } className={styles.backButton}>Back</button>
              <button type="submit" className={styles.formSubmitButton}>Submit</button>
            </div>
          </form>
        </div>
      )}

      <BrandName className={styles.brandName} />

      <button className={styles.themeButton} onClick={handleToggleTheme}>
        <img className={theme === 'dark' ? styles.dark : styles.light} src={theme === 'dark' ? Sun : Moon} alt="theme icon" />
      </button>
    </div>
  )
}

export default SignUp