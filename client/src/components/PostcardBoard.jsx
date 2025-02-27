import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import CommentSection from "./CommentSection";
import ReactionSection from "./ReactionSection";

const PostcardBoard = ({ postcards }) => {
  const { user } = useContext(AuthContext);

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
          <ReactionSection
            postcardId={postcard._id}
            initialReactions={postcard.reactions}
          />
          <CommentSection
            postcardId={postcard._id}
            initialComments={postcard.comments}
            user={user}
          />
        </div>
      ))}
    </div>
  );
};

export default PostcardBoard;
