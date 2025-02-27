import { useState } from "react";
import api from "../services/api";

const CommentSection = ({ postcardId, initialComments, user }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  // console.log("Initial comments:", initialComments);
  // console.log("comments:", comments.user.username);
  // comments.forEach((comment) => {
  //   console.log(comment.user.username);
  // });
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await api.post(`/postcards/${postcardId}/comments`, {
        text: newComment,
      });
      const addedComment =
        response.data.comments[response.data.comments.length - 1];
      setComments((prevComments) => [...prevComments, addedComment]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="comment-section">
      <h5>Comments</h5>
      <ul className="list border">
        {comments.map((comment) => (
          <li key={comment._id} className="padding">
            <div className="flex items-center">
              {comment.user && comment.user.photoUrl ? (
                <img
                  className="circle"
                  src={`data:image/jpeg;base64,${comment.user.photoUrl}`}
                  alt={comment.user.username}
                />
              ) : (
                <button className="circle">
                  {comment.user ? comment.user.username[0] : "?"}
                </button>
              )}
              <div className="max">
                <h6 className="small">
                  {comment.user ? comment.user.username : "Unknown User"}
                </h6>
                <p>{comment.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {user && (
        <form onSubmit={handleAddComment} className="padding">
          <div className="field border label">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
              required
            />
            <label>Comment</label>
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentSection;
