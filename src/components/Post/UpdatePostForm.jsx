import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import { updatePost } from "../../api/posts";

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
    <>
      {mutation.isPending && "Updating post..."}
      {mutation.error &&
        (Array.isArray(mutation.error) ? (
          mutation.error.map((err) => <p key={err.msg}>{err.msg}</p>)
        ) : (
          <p>{mutation.error.error}</p>
        ))}
      <form name="postForm" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Post title</label>
          <input
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="coolcoder99"
            type="text"
            autoComplete="no"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="text">Post text</label>
          <Editor
            id="text"
            name="text"
            tinymceScriptSrc="/tinymce/tinymce.min.js"
            licenseKey="gpl"
            initialValue={initialText}
            onInit={(_evt, editor) => (editorRef.current = editor)}
            init={{
              height: 500,
              menubar: false,
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
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>

        <button type="submit">Submit</button>
        <button onClick={() => setIsEditing(false)} type="button">
          Cancel
        </button>
      </form>
    </>
  );
}

export default UpdatePostForm;
