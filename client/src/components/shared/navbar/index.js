import React, { useState } from 'react';
import styles from "./navbar.module.scss";
import { Icon } from '@iconify/react';
import Input from '../../atoms/input';

function Navbar() {
  const [searchText, setSearchText] = useState("");

  return (
    <header className={styles.header}>
        <article className={styles['search-bar']}>
            <Icon icon={"wpf:search"} />
            <Input 
            placeholder="Search Note" 
            type="text" 
            className={styles["field"]}
            value={searchText} 
            onChange={(e)=>setSearchText(e.target.value)} />
            {/* SearchBar */}
        </article>
        <div className={styles.theme}>
            <Icon icon={"meteocons:sunset-fill"} />
        </div>
    </header>
  )
}

export default Navbar;