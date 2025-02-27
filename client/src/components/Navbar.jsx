import { useNavigate } from "react-router-dom";
import logo from "../assets/react.svg"; // Ensure you have the correct path to your logo

const Navbar = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const handleCreatePostcard = () => {
    navigate("/add-postcard");
  };

  return (
    <nav className="bottom">
      <button onClick={handleHome}>
        <i>home</i>
        <span>Home</span>
      </button>
      <button onClick={handleCreatePostcard}>
        <i>create</i>
        <span>Create</span>
      </button>
      <button>
        <img src={logo} alt="Profile" />
        <span>Profile</span>
      </button>
    </nav>
  );
};

export default Navbar;
