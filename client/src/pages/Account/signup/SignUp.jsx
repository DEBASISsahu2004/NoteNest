import styles from "../account.module.css";
import { useState, useEffect } from 'react';
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
import { getRandomProfilePic } from "../../../components/randomprofilepic/randomprofilepic";

const SignUp = () => {
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
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    const formButton = e.target.querySelector('button[type="submit"]'); 
    formButton.disabled = true;
    formButton.innerText = 'Sending OTP...';
    formButton.style.cursor = 'not-allowed';

    const { email } = userDetails;

    let validationErrors = {};
    if (email === '') {
      validationErrors.email = 'Email cannot be empty';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = 'Please enter a valid email';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await api('/users/sendotp', 'POST', { email });

      formButton.disabled = false;
      formButton.innerHTML = 'Verify';
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
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    const formButton = document.querySelector('button[type="submit"]');
    formButton.disabled = true;
    formButton.innerText = 'Verifying... ⌛';
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

      formButton.disabled = false;
      formButton.innerHTML = 'Next';
      formButton.style.cursor = 'pointer';

      if (response.status === 200) {
        toast.success(response.data.message, { theme: theme === 'dark' ? 'dark' : 'light' });
        setFormPage('setPassword');
      } else {
        console.log(response.data.message);
        toast.error(response.data.message, { theme: theme === 'dark' ? 'dark' : 'light' });
      }
    } catch (error) {
      console.log('Error verifying OTP:', error);
      toast.error('Error verifying OTP, try again 😵‍💫', { theme: theme === 'dark' ? 'dark' : 'light' });
    }
  };

  const handleCredSubmit = async (e) => {
    e.preventDefault();

    const formButton = document.querySelector('button[type="submit"]');
    formButton.disabled = true;
    formButton.innerText = 'Creating...';
    formButton.style.cursor = 'not-allowed';

    const { username, email, password, confirmPassword } = userDetails;

    let validationErrors = {};
    if (username === '') {
      validationErrors.username = 'Username is required';
    }

    if (password.length < 4) {
      validationErrors.password = 'Password must be at least 4 characters';
    }

    if (confirmPassword.length < 4) {
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

    try {
      const profilepic = await getRandomProfilePic();
      const response = await api('/users/signup', 'POST', { username, email, password, profilepic });

      formButton.disabled = false;
      formButton.innerHTML = 'Submit';
      formButton.style.cursor = 'pointer';

      if (response.status === 200) {
        dispatch(login());
        navigate('/dashboard');
      } else {
        console.log(response.data.message);
        toast.error(response.data.message, { theme: theme === 'dark' ? 'dark' : 'light' });
      }
    } catch (error) {
      console.log('Error creating account:', error);
      toast.error('Error creating account, try again 😵‍💫', { theme: theme === 'dark' ? 'dark' : 'light' });
    }
  };

  const resendOtp = async () => {
    toast.info('Resending OTP... ⌛', { theme: theme === 'dark' ? 'dark' : 'light' });
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
        {theme === "dark" ? <Sun /> : <Moon />}
      </button>
    </div>
  )
}

export default SignUp