import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    return isLoggedIn ? element : <Navigate to="/" />;
};

ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
};

export default ProtectedRoute;