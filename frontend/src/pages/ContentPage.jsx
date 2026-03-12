import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import styles from "../css/contentPage.module.css";

import {ChevronLeft} from 'lucide-react';

function ContentPage() {
  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  
  const colors = [
    { hex: "#FFEB3B" },
    { hex: "#C8E6C9" },
    { hex: "#BBDEFB" },
    { hex: "#E1BEE7" },
    { hex: "#F8BBD0" },
  ];

  useEffect(() => {
    async function fetchNote() {
      try {
        setLoading(true);
        const note = await api.get(`/notes/${id}`);
        setNote(note.data);
      } catch (error) {
        toast.error("Failed to fetch note content");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
    document.title = "OpenNotes Content";
  }, []); // FETCH NOTE DATA

  useEffect(() => {
    if (!note.title || !note.content) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [note]); // VALIDATE FORM

  async function handleSave(e) {
    e.preventDefault();
    try {
      await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
        theme: note.theme
      });

      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update note");
    }
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.nav}>
          <div className={styles.exit} onClick={() => navigate("/")}>
            <ChevronLeft className={styles.exitIcon} />
            <p>Exit</p>
          </div>
          <h1>Editor</h1>
        </div>

        <div className={styles.main}>
          <form onSubmit={handleSave} style={{ backgroundColor: note.theme }}>
            <input
              type="text"
              placeholder="Enter Title"
              value={note.title}
              onChange={(e) => setNote({...note, title: e.target.value})}
            />
            <textarea
              placeholder="Enter Text"
              value={note.content}
              onChange={(e) => setNote({...note, content: e.target.value})}
            ></textarea>

            <div className={styles.colorSelector}>
              {colors.map((color, index) => (
                <div
                  className={styles.selection}
                  style={{ backgroundColor: color.hex }}
                  key={index}
                  onClick={() => setNote({...note, theme: color.hex})}
                ></div>
              ))}
            </div>

            <button type="submit" disabled={!valid}>{loading ? "Updating.." : "Save Changes"}</button>
          </form>
        </div>
      </div>
    </>
  );
}
export default ContentPage;


