import React from "react";
import { useParams, Link } from "react-router-dom";

function EditPost({
  posts,
  handleEdit,
  editBody,
  setEditBody,
  editTitle,
  setEditTitle,
}) {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  React.useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="editTitle">Title:</label>
            <input
              id="editTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="editBody">Post:</label>
            <textarea
              id="editBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post not found</h2>
          <p>Well, that's disappointing</p>
          <p>
            <Link to="/">Return to the Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
}

export default EditPost;
