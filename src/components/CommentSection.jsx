import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addCommentAsync,
  deleteCommentAsync,
} from "../redux/comments/commentsSlice";
import styles from "./CommentSection.module.css";

const CommentSection = ({ productId, comments }) => {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      dispatch(addCommentAsync({ productId, description: newComment }));
      setNewComment("");
    }
  };

  const handleDelete = (commentId) => {
    dispatch(deleteCommentAsync(commentId));
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li className={styles.list} key={comment.id}>
            {comment.description}
            <button onClick={() => handleDelete(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form className={styles.form} onSubmit={handleSubmit}>
        <textarea value={newComment} onChange={handleChange} />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
