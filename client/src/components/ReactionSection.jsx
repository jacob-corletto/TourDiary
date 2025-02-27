import { useState } from "react";
import { FaThumbsUp, FaHeart, FaLaugh } from "react-icons/fa";
import api from "../services/api";

const ReactionSection = ({ postcardId, initialReactions }) => {
  const [reactions, setReactions] = useState(initialReactions);

  const handleAddReaction = async (type) => {
    try {
      const response = await api.post(`/postcards/${postcardId}/reactions`, {
        type,
      });
      const newReaction =
        response.data.reactions[response.data.reactions.length - 1];
      setReactions((prevReactions) => [...prevReactions, newReaction]);
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  const getReactionCount = (type) => {
    return reactions.filter((reaction) => reaction.type === type).length;
  };

  return (
    <div className="reactions">
      <FaThumbsUp onClick={() => handleAddReaction("like")} />
      <span>{getReactionCount("like")}</span>
      <FaHeart onClick={() => handleAddReaction("love")} />
      <span>{getReactionCount("love")}</span>
      <FaLaugh onClick={() => handleAddReaction("laugh")} />
      <span>{getReactionCount("laugh")}</span>
    </div>
  );
};

export default ReactionSection;
