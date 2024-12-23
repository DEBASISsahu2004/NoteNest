import styles from './brandname.module.css'
import PropTypes from 'prop-types';

const BrandName = ({ className }) => {
  return (
    <p className={`${styles.brandNameLarge} ${className}`}>NOTENEST</p>
  )
}

BrandName.propTypes = {
  className: PropTypes.string
}

export default BrandName