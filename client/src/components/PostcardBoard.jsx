import { useContext, useState } from "react";
import { FaThumbsUp, FaHeart, FaLaugh } from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import api from "../services/api";

const PostcardBoard = ({ postcards }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState({});
  const [reactions, setReactions] = useState({});

  const handleAddComment = async (postcardId, text) => {
    try {
      const response = await api.post(`/postcards/${postcardId}/comments`, {
        text,
      });
      const newComment =
        response.data.comments[response.data.comments.length - 1];
      setComments((prevComments) => ({
        ...prevComments,
        [postcardId]: [...(prevComments[postcardId] || []), newComment],
      }));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleAddReaction = async (postcardId, type) => {
    try {
      const response = await api.post(`/postcards/${postcardId}/reactions`, {
        type,
      });
      const newReaction =
        response.data.reactions[response.data.reactions.length - 1];
      setReactions((prevReactions) => ({
        ...prevReactions,
        [postcardId]: [...(prevReactions[postcardId] || []), newReaction],
      }));
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  const getReactionCount = (postcardId, type) => {
    const postcardReactions = reactions[postcardId] || [];
    return postcardReactions.filter((reaction) => reaction.type === type)
      .length;
  };

  return (
    <div className="postcard-board">
      {postcards.map((postcard) => (
        <div key={postcard._id} className="postcard">
          <img
            src={`data:image/jpeg;base64,${postcard.photoUrl}`}
            alt="Postcard"
          />
          <p>{postcard.message}</p>
          <p>Posted by: {postcard.user.username}</p>
          {postcard.voiceMemoUrl && (
            <audio
              controls
              src={`data:audio/wav;base64,${postcard.voiceMemoUrl}`}
            ></audio>
          )}
          <div className="reactions">
            <FaThumbsUp
              onClick={() => handleAddReaction(postcard._id, "like")}
            />
            <span>{getReactionCount(postcard._id, "like")}</span>
            <FaHeart onClick={() => handleAddReaction(postcard._id, "love")} />
            <span>{getReactionCount(postcard._id, "love")}</span>
            <FaLaugh onClick={() => handleAddReaction(postcard._id, "laugh")} />
            <span>{getReactionCount(postcard._id, "laugh")}</span>
          </div>
          <div className="comments">
            {(comments[postcard._id] || postcard.comments).map((comment) => (
              <p key={comment._id}>
                <strong>{comment.user.username}:</strong> {comment.text}
              </p>
            ))}
            {user && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const text = e.target.elements.comment.value;
                  handleAddComment(postcard._id, text);
                  e.target.reset();
                }}
              >
                <input type="text" name="comment" placeholder="Add a comment" />
                <button type="submit">Submit</button>
              </form>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostcardBoard;
