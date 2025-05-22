import styles from './googlebutton.module.css';
import Googlelogo from "../../assets/images/google-logo.svg";
import { useGoogleLogin } from '@react-oauth/google';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../apis/api';
import { login } from '../../redux/actions/authActions';
import { getRandomProfilePic } from '../randomprofilepic/randomprofilepic';

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
            const googleResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!googleResponse.ok) {
                throw new Error(`HTTP error! status: ${googleResponse.status}`);
            }
            const googleData = await googleResponse.json();

            toast.info('Logging in... this might take some time ⌛', { theme: theme === 'dark' ? 'dark' : 'light' });

            const profilepic = getRandomProfilePic();

            const response = await api('/users/googleAuth', 'POST', { email: googleData.email, name: googleData.given_name, profilepic });

            if (response.status === 200) {
                dispatch(login());
                navigate('/dashboard');
            } else {
                console.error(response.data.message);
                toast.error(response.data.message, { theme: theme === 'dark' ? 'dark' : 'light' });
            }
        } catch (error) {
            console.error('Error while loggin in', error);
            toast.error('Error while loggin in, try again 😵‍💫', { theme: theme === 'dark' ? 'dark' : 'light' });
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