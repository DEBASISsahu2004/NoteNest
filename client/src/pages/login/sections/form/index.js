import React, { useState } from "react";
import styles from "./form.module.scss";
import BrandLogo from "../../../../components/shared/brand";
import Signin from "../../partials/signin";
import Signup from "../../partials/signup";

function Form(){
    const [active, setActive] = useState('signin');

    return (
        <section className={styles["form-contianer"]}>
            <BrandLogo />
            {active === 'signin' ? <Signin /> : <Signup handleSwitch={()=> setActive("signin")}/>}
            {active === 'signin' ?
                <p>Not a resgistered user? <span onClick={() => setActive("signup")}>Signup Now.</span></p> :
                <p>Already a user? <span onClick={() => setActive("signin")}>Signin Now.</span></p>
            }
        </section>
    );
}

export default Form;