import { useState } from "react";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "../css/createPage.module.css";

//lucide react icons
import { ChevronLeft } from "lucide-react";

function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [theme, setTheme] = useState("#FFEB3B");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const colors = [
    { hex: "#FFEB3B" },
    { hex: "#C8E6C9" },
    { hex: "#BBDEFB" },
    { hex: "#E1BEE7" },
    { hex: "#F8BBD0" },
  ];

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);

      if (!title || !content) return toast.error("All field are required");

      await api.post("/notes", { title, content, theme });
      toast.success("Note created successfully");

      navigate("/");
    } catch (error) {
      toast.error("Failed to create note");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  document.title = 'OpenNotes Create';

  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <div className={styles.exit} onClick={() => navigate('/')}>
          <ChevronLeft className={styles.exitIcon}/>
          <p>Exit</p>
        </div>

        <h1>Create</h1>
      </div>

      <div className={styles.main}>
        <form onSubmit={handleSubmit} style={{backgroundColor: theme}}>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Enter Text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <div className={styles.colorSelector}>
            {colors.map((color, index) => (
              <div className={styles.selection}
              style={{backgroundColor: color.hex}} 
              key={index}
              onClick={() => setTheme(color.hex)}
              >
              </div>
            ))}
          </div>

          <button type="submit">{loading ? "Saving.." : "Create"}</button>

        </form>
      </div>

    </div>

  );
}

export default CreatePage;
