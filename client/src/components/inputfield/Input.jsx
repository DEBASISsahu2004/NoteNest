import styles from "./input.module.css";
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';

const Input = ({ label, name, type, placeholder, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.inputContainer}>
            <label htmlFor={name}>{label}</label>
            <div className={styles.inputWrapper}>
                <input type={type === 'password' && showPassword ? 'text' : type} id={name} name={name} placeholder={placeholder} value={value} onChange={onChange} />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
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
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default Input