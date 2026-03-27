import formatDate from "../util/formatDate";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios.js";
import {sileo} from 'sileo';
import styles from "../css/noteCard.module.css";
import { Trash2 } from "lucide-react";

function NoteCard({ noteProp, setNotesProp }) {
  async function handleDelete(e, noteId) {
    e.stopPropagation();
    await api.delete(`/notes/${noteId}`);
    sileo.success({title: 'Deleted successfully'});
    setNotesProp((n) => n.filter((n) => n._id !== noteId));
    sileo;
  }

  const navigate = useNavigate();

  return (
    <>
      <div
        className={styles.noteCard}
        onClick={() => navigate(`/content/${noteProp._id}`)}
        style={{backgroundColor: noteProp.theme}}
      >
        <h1>{noteProp.title}</h1>

        <p>{formatDate(new Date(noteProp.createdAt))}</p>

        <div
          onClick={(e) => handleDelete(e, noteProp._id)}
          className={styles.deleteBtn}
          >

          <Trash2 className={styles.deleteIcon} />
        </div>
      </div>
    </>
  );
}

export default NoteCard;
