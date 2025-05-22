import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useState, useRef, useEffect } from 'react';
import styles from './quillEditor.module.css';
import PropTypes from 'prop-types';

const QuillEditor = ({ clearTrigger }) => {
    const [content, setContent] = useState('');
    const editorRef = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        if (editorRef.current) {
            quillInstance.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['image', 'code-block'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['clean']
                    ]
                },
                placeholder: 'Write your note here...',
            });
            quillInstance.current.on('text-change', () => {
                const text = quillInstance.current.root.innerText;
                setContent(text);
            });
        }
        // Cleanup on unmount
        return () => {
            if (quillInstance.current) {
                quillInstance.current = null;
            }
        };
    }, []);

    // Clear editor when clearTrigger changes
    useEffect(() => {
        if (quillInstance.current) {
            quillInstance.current.setText('');
        }
        setContent('');
    }, [clearTrigger]);

    const handleNoteEditorSubmit = (e) => {
        e.preventDefault();
        const note = {
            content: content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        console.log(note);
        // Here you can send the note to your backend or perform any other action
    };

    return (
        <form className={styles.noteForm} onSubmit={handleNoteEditorSubmit}>
            <div ref={editorRef} id="noteEditor"></div>
            <div>
                <button type="submit">save</button>
                <button type="button">cancel</button>
            </div>
        </form>
    )
}

QuillEditor.propTypes = {
    clearTrigger: PropTypes.number
};

export default QuillEditor;