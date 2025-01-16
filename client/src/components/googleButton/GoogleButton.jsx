import styles from './googlebutton.module.css'
import Googlelogo from "../../assets/images/google-logo.svg";
import { useGoogleLogin } from '@react-oauth/google';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../apis/api';

const GoogleButton = () => {

    const theme = useSelector((state) => state.theme.theme);
    const navigate = useNavigate();

    const login = useGoogleLogin({
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

            const response2 = await api('/api/users/googleAuth', 'POST', { email: data.email, name: data.name });

            if (response2.status === 200) {
                localStorage.setItem('username', data.given_name);
                toast.success('Logged in with Google', { theme: theme === 'dark' ? 'dark' : 'light' });
                navigate('/demo');
            } else {
                toast.error('Failed to login with Google', { theme: theme === 'dark' ? 'dark' : 'light' });
                console.error("Failed to login with Google:", response2.message);
            }

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    return (
        <button className={styles.googleButton} onClick={() => login()}>
            <img src={Googlelogo} alt="google logo" />
            Continue with Google
        </button>
    );
};

export default GoogleButton;