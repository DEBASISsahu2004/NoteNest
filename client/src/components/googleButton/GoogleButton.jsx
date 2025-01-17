import styles from './googlebutton.module.css';
import Googlelogo from "../../assets/images/google-logo.svg";
import { useGoogleLogin } from '@react-oauth/google';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../apis/api';
import { login } from '../../redux/actions/authActions';
import getRandomProfilePic from '../randomprofilepic/randomprofilepic';

const GoogleButton = () => {

    const theme = useSelector((state) => state.theme.theme);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const googlelogin = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            fetchUserData(tokenResponse.access_token);
        },
    });

    const fetchUserData = async (accessToken) => {
        try {

            const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            toast.info('Logging in..., this might take some time', { theme: theme === 'dark' ? 'dark' : 'light' });

            const profilepic = await getRandomProfilePic();
            const response2 = await api('/api/users/googleAuth', 'POST', { email: data.email, name: data.given_name, profilepic });
            if (response2.status === 200) {
                localStorage.setItem('username', data.given_name);
                toast.success('Logged in with Google', { theme: theme === 'dark' ? 'dark' : 'light' });
                dispatch(login());
                navigate('/dashboard');
            } else {
                toast.error('Failed to login with Google', { theme: theme === 'dark' ? 'dark' : 'light' });
                console.error("Failed to login with Google:", response2.message);
            }

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    return (
        <button className={styles.googleButton} onClick={() => googlelogin()}>
            <img src={Googlelogo} alt="google logo" />
            Continue with Google
        </button>
    );
};

export default GoogleButton;