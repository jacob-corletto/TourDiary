import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPostcard } from "../services/api";

const PostcardForm = () => {
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");
  const [voiceMemo, setVoiceMemo] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("message", message);
    formData.append("voiceMemo", voiceMemo);
    formData.append(
      "location",
      JSON.stringify({ type: "Point", coordinates: [51.505, -0.09] })
    ); // Example location, replace with actual location data

    try {
      await addPostcard(formData);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPhoto(e.target.files[0])}
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a message..."
      ></textarea>
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setVoiceMemo(e.target.files[0])}
      />
      <button type="submit">Add Postcard</button>
    </form>
  );
};

export default PostcardForm;
