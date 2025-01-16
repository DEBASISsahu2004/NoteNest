import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ element }) => {
    const theme = useSelector((state) => state.theme.theme);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    if (!isLoggedIn) {
        toast.error('You need to login first', { theme: theme === 'dark' ? 'dark' : 'light' });
    }
    return isLoggedIn ? element : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
};

export default ProtectedRoute;