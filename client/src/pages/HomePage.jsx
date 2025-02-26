import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPostcards } from "../services/api";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
  const [postcards, setPostcards] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    } else if (user) {
      const loadPostcards = async () => {
        const data = await fetchPostcards();
        setPostcards(data);
      };

      loadPostcards();
    }
  }, [user, loading, navigate]);

  const handleCreatePostcard = () => {
    navigate("/add-postcard");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to Tour Diary</h1>
      <p>
        Your one-stop solution to document and share your travel experiences.
      </p>
      <button onClick={handleCreatePostcard}>Create New Postcard</button>
      <div className="postcard-board">
        {postcards.map((postcard) => (
          <div key={postcard._id} className="postcard">
            <img
              src={`data:image/jpeg;base64,${postcard.photoUrl}`}
              alt="Postcard"
            />
            <p>{postcard.message}</p>
            <p>Posted by: {postcard.user.username}</p>{" "}
            {/* Display the username */}
            {postcard.voiceMemoUrl && (
              <audio
                controls
                src={`data:audio/wav;base64,${postcard.voiceMemoUrl}`}
              ></audio>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
