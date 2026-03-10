import { useState, useEffect } from "react"
import api from '../lib/axios.js';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

import NoteCard from "../components/NoteCard.jsx";
import styles from '../css/homePage.module.css';

import {Pencil} from 'lucide-react';
import {UserRound} from 'lucide-react';
import {Plus} from 'lucide-react'

function HomePage() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        async function fetchNotes() {
            try {
                setLoading(true)
                const note = await api.get('/notes');

                setNotes(note.data);
            } catch (error) {
                toast.error('Failed to fetch notes')
                console.log(error)
            }finally{
                setLoading(false)
            }
        }

        fetchNotes();

        document.title = 'OpenNotes Home';
    }, []);

    useEffect(() => {
        const handleResize = () => window.innerWidth >= 768 ? setIsMobile(false) : setIsMobile(true);
        
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return(
        <div className={styles.wrapper}>
            <nav>
                <img src="/logo.png" alt="logo" className={styles.logo}/>
                {!isMobile && <input type="search" placeholder='Search note' className={styles.searchBar}/>}
                <div className={styles.user}>
                    <UserRound className={styles.userIcon}/>
                </div>
            </nav>

            {isMobile && <div className={styles.inputContainer}>
                <input type="search" placeholder='Search note' className={styles.searchBar}/>    
            </div>}

            <main>  
                {notes.length <= 0 && 
                <div className={styles.emptyState}>
                    <img src="/emptyState.png"/>
                    
                    <h1>Your Notepad is Empty.</h1>

                    {isMobile ? <p>Tap here to add your first note!</p> : <p>Click here to add your first note!</p>}

                    <div className={styles.createBtn} onClick={() => navigate('/create')}>
                        <Plus className={styles.createIcon}></Plus>Create Note
                    </div>
                </div>
                }

                {loading && <div>Loading...</div>}

                {notes.map((note) => (
                    <NoteCard noteProp={note} key={note._id} setNotesProp={setNotes}></NoteCard>
                ))}

                <button className={styles.pencilBtn} onClick={() => navigate('/create')}>
                    <Pencil className={styles.pencilIcon}/>
                </button>
            </main>
        </div>
    )
}

export default HomePage