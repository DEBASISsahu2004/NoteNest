import styles from "./input.module.css";
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';

const Input = ({ label, inputType, type, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.inputContainer}>
            <label htmlFor={inputType}>{label}</label>
            <div className={styles.inputWrapper}>
                <input type={type === 'password' && showPassword ? 'text' : type} id={inputType} placeholder={placeholder} />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => togglePasswordVisibility()}
                        className={styles.toggleButton}
                    >
                        {!showPassword ? <Eye /> : <EyeClosed />}
                    </button>
                )}
            </div>
        </div>
    )
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
}

export default Input