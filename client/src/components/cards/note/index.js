import React, { useState } from 'react';
import styles from "./note.module.scss";
import formatDate from '../../../utils/formatDate';
import Button from '../../atoms/button';
import utils from "../../../utils/localstorage";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Note(props) {
    const {text, date, color} = props;
    const [expand, setExpand] = useState(false);
    const [noteText, setNoteText] = useState("");

    const handleSave = ()=>{
      const authToken=utils.getFromLocalStorage('auth_key');
      if(!authToken){
        toast.error('Login to save notes!');
        return;
      }
      if(!noteText.length || noteText.split(' ').length <2 ){
        toast.error('Note should atleast contain two words!');
        return;
      }
      
      fetch('http://localhost:7070/api/notes', {
        method: 'POST',
        headers:{
          "Content-Type":"application/json",
          authorization:authToken
        },
        body:JSON.stringify({
          text:noteText,
          color
        }),
      })
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
          if(data.success === 200) {
              toast.success('Note added successfully!');
          } else {
              toast.error(data.message);
          }
      }).catch((err) => {
          toast.error('Note creation Failed');
      })
    }

  return (
    <article className={styles.container} style={{backgroundColor: color}}>
      <div className={styles.content}>
        {
          !text.length ? (<textarea value={noteText} onChange={(e)=> setNoteText(e.target.value)} className={styles.textarea}/>) : (<>
            <p className={expand ? styles.expanded: ""}>
              {text}
            </p>
            {
              text.length > 150 ? <button onClick={()=>setExpand((prev)=>!prev)}>read {expand ? "less": "more"}</button>: null
              }
          </>)
        }
      </div>
      <footer className={styles.footer}>
        <div>{formatDate(date)}</div>
        {noteText.length ? <Button text="Save" className={styles.saveBtn} handleClick={handleSave}/> : null}
      </footer>
    </article>
  )
}

export default Note;