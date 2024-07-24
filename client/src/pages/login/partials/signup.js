import React, { useState } from "react";
import Input from "../../../components/atoms/input";
import Button from "../../../components/atoms/button";
import styles from "./partials.module.scss";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSignup = () => {
        if(!email.length || !password.length || !name.length){
            toast.error("Somerequired fields are empty");
            return;
        }

        fetch('http://localhost:7070/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if(data.success === 201) {
                toast.success('Registered successfully!'); 
                props.handleSwitch();
            } 
            else {
                toast.error(data?.message);
            }
        }).catch((err) => {
            console.log(err);
            toast.error('Registration Failed');
        })
    }

  return (
    <div className={styles.form}>
        <Button 
        text="Join with Google"
        icon="bi:google"
        className={styles.google}
        isDisabled={true}
        />
        <div className={styles.option}>
            <span>or Join with email address</span>
        </div>
        <article className={styles.details}>
            <Input type="name" placeholder={"Full Name"} value={name} onChange={(e)=> setName(e.target.value)}/>

            <Input type="email" placeholder={"Type your Email"} value={email} onChange={(e)=> setEmail(e.target.value)}/>

            <Input type="password" placeholder={"Type your Password"} value={password} onChange={(e)=> setPassword(e.target.value)}/>
            
            <Button 
            text="Join with Email"
            icon="material-symbols:login"
            className={styles.emailButton}
            handleClick={handleSignup}
            />
        </article>
    </div>
  )
}

export default Signup;