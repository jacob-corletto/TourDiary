import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPostcard } from "../services/api";
import "../styles/PostcardForm.css"; // Ensure you have the correct path to your CSS file

const PostcardForm = () => {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null); // State for photo preview
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file)); // Create a preview URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("photo", photo);
    formData.append("message", message);
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
    <>
      <h1 className=" small padding center-align rubik-bubbles-regular">
        Make a Postcard
      </h1>
      <form onSubmit={handleSubmit} className="postcard-form">
        <fieldset>
          <legend>Create a Postcard</legend>
          <div className="field border label">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label>Title</label>
          </div>

          <div className="field border label textarea">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <label>Message</label>
            <span className="helper">Write a loving message</span>
          </div>
          <div className=" padding field border grid items-center">
            <p className="s2">Photo</p>
            <button className=" s2 circle transparent">
              <input
                type="file"
                accept="image/*;capture=camera"
                onChange={handlePhotoChange}
                className=""
              />
              <i>image</i>
            </button>
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </fieldset>
      </form>
      {photoPreview && (
        <div className="photo-preview">
          <img src={photoPreview} alt="Photo Preview" />
        </div>
      )}
    </>
  );
};

export default PostcardForm;
