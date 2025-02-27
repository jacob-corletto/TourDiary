import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPostcards } from "../services/api";
import AuthContext from "../context/AuthContext";
import PostcardBoard from "../components/PostcardBoard";

const HomePage = () => {
  const [postcards, setPostcards] = useState([]);
  const { user, loading, logout } = useContext(AuthContext);
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

  const handleLogout = () => {
    logout();
    navigate("/login");
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
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleCreatePostcard}>Create New Postcard</button>
      <PostcardBoard postcards={postcards} />

      <div className="footer">
        <p>© 2023 Tour Diary. All rights reserved.</p>
      </div>
    </div>
  );
};

export default HomePage;
