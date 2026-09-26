import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import { addPost } from "../../api/posts";
import { useNavigate } from "react-router";

function PostForm({ domain }) {
  const editorRef = useRef(null);

  const [title, setTitle] = useState("");
  //   const [text, setText] = useState("");
  const navigate = useNavigate();

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

  //   const handleTextChange = (e) => {
  //     setText(e.target.value);
  //   };

  const queryClient = useQueryClient();

  function onSubmit(e) {
    e.preventDefault();
    if (editorRef.current) {
      const text = editorRef.current.getContent();
      mutation.mutate({ domain, title, text });
    }
  }

  return (
    <>
      {mutation.isPending && "Adding comment..."}
      {mutation.error &&
        mutation.error.map((err) => <p key={err.msg}>{err.msg}</p>)}
      <form name="postForm" onSubmit={onSubmit}>
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
        {/* <textarea
          id="text"
          name="text"
          value={text}
          onChange={handleTextChange}
          placeholder="coolcoder99"
          type="text"
          autoComplete="no"
          required
        /> */}

        <Editor
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          licenseKey="gpl"
          onInit={(_evt, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
            menubar: false,
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
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default PostForm;
