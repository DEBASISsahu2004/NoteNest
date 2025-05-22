import { FilePen, Search, Trash2, PanelRightOpen, PanelRightClose } from "lucide-react";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import Navbar from "../../components/navbar/Navbar";
import styles from "./dashboard.module.css";
import { fetchUserData } from "../../components/userData/userData";
import api from "../../components/apis/api";
import { logout } from '../../redux/actions/authActions';
import useLogout from "../../components/userData/useLogout";
import QuillEditor from "../../components/quillEditor/QuillEditor";


const Dashboard = () => {
  const dispatch = useDispatch();
  const handleLogout = useLogout();

  //state variables for new note title and content
  const [isEditingTitle, setIsEditingTitle] = useState(false);    // check if the title is being edited
  const [noteData, setNoteData] = useState({
    title: '',
    content: '',
  });   // store the title and content of the note


  const [userNoteData, setUserNoteData] = useState([]);   // store the note data of the user

  const [toggleSideBar, setToggleSideBar] = useState(false);    // toggle the sidebar

  const [clearEditorTrigger, setClearEditorTrigger] = useState(false);    // trigger to clear the editor

  // getting user data
  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchUserData();

      if (data) {
        setUserNoteData(data.userNoteData);
      } else {
        dispatch(logout());
      }
    };
    getUserData();
  }, []);

  // function to handle creating a new note
  const handleCreateNewNote = () => {
    if (noteData.content !== '') {
      api('/users/updatenote', 'POST', noteData, handleLogout);
    }
    setNoteData({
      title: '',
      content: '',
    });
    setClearEditorTrigger(true);
  };

  const handleDelete = async (noteId) => {
    try {
      const response = await api(`/users/deletenote/${noteId}`, 'DELETE', {}, handleLogout);
      const message = response.data.message;
      if (response.status === 200) {
        toast.success(message, { theme: 'light' });
        setUserNoteData(userNoteData.filter(note => note._id !== noteId));
      } else {
        toast.error(message, { theme: 'light' });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.dashboardContainer}>
      <Navbar />
      <div className={styles.dashboardContent}>

        <div className={styles.sidebar}>

          <div className={styles.sidebarHeader}>
            <button className={styles.newNoteButton} onClick={handleCreateNewNote}>
              <FilePen className={styles.newNoteIcon} />
            </button>

            <h2 className={styles.dashboardTitle}>Notes</h2>

            <button className={styles.toggleSidebarButton} onClick={() => setToggleSideBar(!toggleSideBar)}>
              {toggleSideBar ? <PanelRightClose className={styles.toggleSidebatIcon} /> : <PanelRightOpen className={styles.toggleSidebatIcon} />}
            </button>
          </div>

          <form className={styles.searchContainer}>
            <button type="submit" className={styles.searchButton}>
              <Search className={styles.searchIcon} />
            </button>

            <input type="text" placeholder="Search your note..." className={styles.searchInput} />
          </form>

          <div className={styles.notesContainer}>
            {userNoteData.length === 0 ? (
              <>
                {/* <p className={styles.noNotesMessage}>No notes available</p> */}
                <div className={styles.note}>
                  <h3 className={styles.noteTitle}>yoolknjonjonljnkjlnkjnkjbnkjoo</h3>
                  <p className={styles.noteContent}>yessjgkctycycugcyfcjjycfjhfccfjjychjgcgfcs</p>
                  <Trash2
                    className={styles.deleteIcon}
                  />
                </div>
                <div className={styles.note}>
                  <h3 className={styles.noteTitle}>yoolknjonjonljnkjlnkjnkjbnkjoo</h3>
                  <p className={styles.noteContent}>yessjgkctycycugcyfcjjycfjhfccfjjychjgcgfcs</p>
                  <Trash2
                    className={styles.deleteIcon}
                  />
                </div>
                <div className={styles.note}>
                  <h3 className={styles.noteTitle}>yoolknjonjonljnkjlnkjnkjbnkjoo</h3>
                  <p className={styles.noteContent}>yessjgkctycycugcyfcjjycfjhfccfjjychjgcgfcs</p>
                  <Trash2
                    className={styles.deleteIcon}
                  />
                </div>
                <div className={styles.note}>
                  <h3 className={styles.noteTitle}>yoolknjonjonljnkjlnkjnkjbnkjoo</h3>
                  <p className={styles.noteContent}>yessjgkctycycugcyfcjjycfjhfccfjjychjgcgfcs</p>
                  <Trash2
                    className={styles.deleteIcon}
                  />
                </div>
                <div className={styles.note}>
                  <h3 className={styles.noteTitle}>yoolknjonjonljnkjlnkjnkjbnkjoo</h3>
                  <p className={styles.noteContent}>yessjgkctycycugcyfcjjycfjhfccfjjychjgcgfcs</p>
                  <Trash2
                    className={styles.deleteIcon}
                  />
                </div>
                <div className={styles.note}>
                  <h3 className={styles.noteTitle}>yoolknjonjonljnkjlnkjnkjbnkjoo</h3>
                  <p className={styles.noteContent}>yessjgkctycycugcyfcjjycfjhfccfjjychjgcgfcs</p>
                  <Trash2
                    className={styles.deleteIcon}
                  />
                </div>
              </>
            ) : (
              userNoteData.map((note) => (
                <div key={note._id} className={styles.note}>
                  <h3 className={styles.noteTitle}>{note.title}</h3>
                  <p className={styles.noteContent}>{note.content}</p>
                  <Trash2
                    className={styles.deleteIcon}
                    onClick={() => handleDelete(note._id)}
                  />
                </div>
              ))
            )}
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            Logout
          </button>
        </div>

        <div className={styles.mainContent}>

          <div className={styles.mainHeader}>
            {toggleSideBar ? (
              <button className={styles.toggleSidebarButton} onClick={() => setToggleSideBar(!toggleSideBar)}>
                {toggleSideBar ? <PanelRightClose className={styles.sidebarToggleIcon} /> : <PanelRightOpen className={styles.sidebarToggleIcon} />}
              </button>
            ) : null}

            <h2 className={styles.noteTitle} onClick={(() => setIsEditingTitle(true))}>
              {isEditingTitle ? (
                <input
                  type="text"
                  value={noteData.title}
                  autoFocus
                  onChange={e => setNoteData(prev => ({ ...prev, title: e.target.value }))}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      setIsEditingTitle(false);
                    }
                  }}
                  className={styles.editTitleInput}
                />
              ) : (
                noteData.title === '' ? 'Untitled' : noteData.title
              )}
            </h2>

            {/* <h2 className={styles.noteTitle}>
              {noteData.title === '' ? 'Untitled' : noteData.title}
            </h2> */}

            {/* <h2 className={styles.noteTitle} onClick={() => setIsEditingTitle(true)} style={{cursor: 'pointer'}}>
              {isEditingTitle ? (
                <input
                  type="text"
                  value={tempTitle}
                  autoFocus
                  onChange={e => setTempTitle(e.target.value)}
                  onBlur={() => {
                    setNoteData(prev => ({ ...prev, title: tempTitle }));
                    setIsEditingTitle(false);
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      setNoteData(prev => ({ ...prev, title: tempTitle }));
                      setIsEditingTitle(false);
                    }
                  }}
                  className={styles.editTitleInput}
                  style={{fontSize: 'inherit', fontWeight: 'inherit', width: '100%'}}
                />
              ) : (
                noteData.title === '' ? 'Untitled' : noteData.title
              )}
            </h2> */}

          </div>

          <QuillEditor clearTrigger={clearEditorTrigger} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard