import { useState, useEffect } from "react"
import api from '../lib/axios.js';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

import NoteCard from "../components/NoteCard.jsx";
import styles from '../css/homePage.module.css';

import {Pencil} from 'lucide-react';
import {UserRound} from 'lucide-react';

function HomePage() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(false);

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
        const handleResize = () => window.innerWidth > 768 && setIsMobile(false);
        
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return(
        <div className="wrapper">
            <nav>
                <h1>OpenNotes</h1>
                <div className={styles.user}>
                    <UserRound className={styles.userIcon}/>
                </div>
            </nav>
            <main>  
                <input type="search" className={styles.searchBar}/>

                {notes.length <= 0 && <h1>No notes yet</h1>}
                {loading && <div>Loading...</div>}
                {notes.map((note) => (
                    <NoteCard noteProp={note} key={note._id} setNotesProp={setNotes}></NoteCard>
                ))}

                <button className={styles.createBtn} onClick={() => navigate('/create')}><Pencil className={styles.pencilIcon}/></button>
            </main>
        </div>
    )
}

export default HomePage