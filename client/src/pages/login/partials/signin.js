import React, { useState } from "react";
import Input from "../../../components/atoms/input";
import Button from "../../../components/atoms/button";
import { useNavigate } from "react-router-dom";
import styles from "./partials.module.scss";
import utils from "../../../utils/localstorage"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignin = () => {
        if(!email.length || !password.length ){
            toast.error('Please fill out all fields');
            return;
        }

      fetch('http://localhost:7070/api/users/signin', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({email, password }),
      })
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
          if(data.success === 200) {
              toast.success('User Logged in successfully!'); 
              console.log(data);
              utils.addToLocalStorage('auth_key', data.token);

              navigate('/notes');
          } else {
              toast.error(data.message);
          }
      }).catch((err) => {
          console.log(err);
          toast.error('Login Failed');
      })
  }

  return (
    <div className={styles.form}>
      <Button 
      text="Join with Google"
      icon="bi:google"
      className={styles.google}
      isDiabled={true}
      />
      <div className={styles.option}>
          <span>or Join with email address</span>
      </div>
      <article className={styles.details}>
          <Input type="email" placeholder={"Type your Email"} value={email} onChange={(e)=> setEmail(e.target.value)}/>
          <Input type="password" placeholder={"Type your Password"} value={password} onChange={(e)=> setPassword(e.target.value)}/>
          <Button 
          text="Join with Email"
          icon="material-symbols:login"
          className={styles.emailButton}
          handleClick={handleSignin}
          />
      </article>
  </div>
  )
}

export default Signin;