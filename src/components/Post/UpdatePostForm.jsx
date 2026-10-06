import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import { updatePost } from "../../api/posts";
import styles from "./UpdatePostForm.module.css";

function UpdatePostForm({
  domain,
  postId,
  initialTitle,
  initialText,
  setIsEditing,
}) {
  const editorRef = useRef(null);
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(initialTitle);

  const mutation = useMutation({
    mutationKey: ["updatePost", domain, postId],
    mutationFn: (domain, postId, title, text) =>
      updatePost(domain, postId, title, text),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["post"] });
      setIsEditing(false);
    },
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  function onSubmit(e) {
    e.preventDefault();
    if (editorRef.current) {
      const text = editorRef.current.getContent();

      mutation.mutate({ domain, postId, title, text });
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Editing Post</h2>

      {mutation.isPending && (
        <div className={styles.loadingMsg}>Saving changes...</div>
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
            <div className={styles.errorMsg}>{mutation.error.error}</div>
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
            id="text"
            name="text"
            tinymceScriptSrc="/tinymce/tinymce.min.js"
            licenseKey="gpl"
            initialValue={initialText}
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
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "media",
                "table",
                "help",
                "preview",
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
            onClick={() => setIsEditing(false)}
            disabled={mutation.isPending}
          >
            Cancel
          </button>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={mutation.isPending || !title.trim()}
          >
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePostForm;
