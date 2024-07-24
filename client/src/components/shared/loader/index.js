import React from 'react';
import styles from "./loader.module.scss";
import BrandLogo from '../brand';
import ProgessBar from '../../atoms/progess-bar';

function Loader() {
  return (
    <article className={styles.container}>
        <BrandLogo />
        <ProgessBar />
    </article>
  )
}

export default Loader;