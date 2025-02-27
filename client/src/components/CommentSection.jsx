import { useState } from "react";
import api from "../services/api";

const CommentSection = ({ postcardId, initialComments, user }) => {
  const [comments, setComments] = useState(initialComments);

  const handleAddComment = async (text) => {
    try {
      const response = await api.post(`/postcards/${postcardId}/comments`, {
        text,
      });
      const newComment =
        response.data.comments[response.data.comments.length - 1];
      setComments((prevComments) => [...prevComments, newComment]);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="comments">
      {comments.map((comment) => (
        <p key={comment._id}>
          <strong>{comment.user.username}:</strong> {comment.text}
        </p>
      ))}
      {user && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const text = e.target.elements.comment.value;
            handleAddComment(text);
            e.target.reset();
          }}
        >
          <input type="text" name="comment" placeholder="Add a comment" />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default CommentSection;
