import React from "react";
import styles from "./brand.module.scss";
import BrandLightImg from "../../../assets/brand-light.svg";
import BrandDarkImg from "../../../assets/brand-dark.svg";

function BrandLogo(props){
    const {logoOnly, type="light", className} = props;
    return(
        <article className={`${styles.brand} ${className}`}>
            <img src={type === "light" ? BrandLightImg : BrandDarkImg} alt="brand-logo" />
            {!logoOnly ? (
                <h1>
                    NOTE<span>nest</span>
                </h1>
            ) : null}
        </article>
    );
}

export default BrandLogo;