import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import { addPost } from "../../api/posts";
import { useNavigate } from "react-router";
import styles from "./PostForm.module.css";

function PostForm({ domain }) {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["post", domain],
    mutationFn: (domain, title, text) => addPost(domain, title, text),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  function onSubmit(e) {
    e.preventDefault();
    if (editorRef.current) {
      const text = editorRef.current.getContent();

      mutation.mutate({ domain, title, text });
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Create New Post</h1>

      {mutation.isPending && (
        <div className={styles.loadingMsg}>Saving post...</div>
      )}

      {mutation.error && (
        <div className={styles.errorContainer}>
          {Array.isArray(mutation.error) ? (
            mutation.error.map((err) => (
              <div key={err.msg} className={styles.errorMsg}>
                {err.msg}
              </div>
            ))
          ) : (
            <div className={styles.errorMsg}>
              {mutation.error.error || mutation.error.message}
            </div>
          )}
        </div>
      )}

      <form className={styles.form} name="postForm" onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.visuallyHidden}>
            Post Title
          </label>
          <input
            className={styles.titleInput}
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter an engaging title..."
            type="text"
            autoComplete="off"
            required
            disabled={mutation.isPending}
          />
        </div>

        <div className={styles.editorWrapper}>
          <Editor
            tinymceScriptSrc="/tinymce/tinymce.min.js"
            licenseKey="gpl"
            onInit={(_evt, editor) => (editorRef.current = editor)}
            init={{
              height: 600,
              menubar: false,
              skin: "oxide-dark",
              content_css: "dark",
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "preview",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | fullscreen preview | help",
              content_style: `
                body { 
                  font-family: system-ui, -apple-system, sans-serif; 
                  font-size: 16px; 
                  background-color: #121212; 
                  color: #f4f4f5; 
                  line-height: 1.6;
                  margin: 1rem;
                }
                a { color: #818cf8; }
                h1, h2, h3, h4, h5, h6 { color: #ffffff; }
              `,
            }}
          />
        </div>

        <div className={styles.actionButtons}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => navigate("/")}
            disabled={mutation.isPending}
          >
            Cancel
          </button>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
