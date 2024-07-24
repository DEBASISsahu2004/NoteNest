import React from "react";
import styles from "./button.module.scss";
import { Icon } from "@iconify/react";

function Button(props){
    const {text, icon, handleClick, className, isDisabled} = props;
    return(
        <article className={`${styles.button} ${className}`} onClick={handleClick} disabled={isDisabled}>
            {icon?<Icon icon={icon} />: null}
            {text?<h3>{text}</h3>: null}
        </article>
                
    );
}


export default Button;