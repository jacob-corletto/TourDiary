import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPostcards } from "../services/api";
import AuthContext from "../context/AuthContext";
import PostcardBoard from "../components/PostcardBoard";
import LoadingScreen from "../components/LoadingScreen";
import me from "../assets/me.png"; // Ensure you have the correct path to your image
// import "../styles/HomePage.css"; // Ensure you have the correct path to your CSS file

const HomePage = () => {
  const [postcards, setPostcards] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    } else if (user) {
      const loadPostcards = async () => {
        const data = await fetchPostcards();
        setPostcards(data);
        setIsLoading(false);
      };

      loadPostcards();
    }
  }, [user, loading, navigate]);

  const handleCreatePostcard = () => {
    navigate("/add-postcard");
  };

  if (loading || isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="container">
      {/* <img src={me} alt="" /> */}
      <h1 className="extra large middle-align center-align round rubik-bubbles-regular">
        Tour {<img className="large" src={me} />} Diary
      </h1>
      <p>
        Your one-stop solution to document and share your travel experiences.
      </p>

      {postcards.length === 0 ? (
        <article className="full-screen-article extra large middle-align center-align">
          <div>
            <i className="extra">mail</i>
            <h5>You have no Postcards</h5>
            <p>Click the button to start</p>
            <div className="space"></div>
            <nav className="center-align">
              <button onClick={handleCreatePostcard}>Create Postcard</button>
            </nav>
          </div>
        </article>
      ) : (
        <PostcardBoard postcards={postcards} />
      )}
    </div>
  );
};

export default HomePage;
