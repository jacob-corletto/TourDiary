import { useNavigate } from "react-router-dom";
// import logo from "../assets/react.svg"; // Ensure you have the correct path to your logo
// import me from "../assets/me.png"; // Ensure you have the correct path to your image

const Navbar = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const handleCreatePostcard = () => {
    navigate("/add-postcard");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const isHome = window.location.pathname === "/" ? "active" : "";
  const isCreate = window.location.pathname === "/add-postcard" ? "active" : "";
  const isProfile = window.location.pathname === "/profile" ? "active" : "";

  return (
    <div className="tabs large">
      <a className={isHome} onClick={handleHome}>
        <i>home</i>
        <span>Home</span>
      </a>
      <a className={isCreate} onClick={handleCreatePostcard}>
        <i>create</i>
        <span>Create</span>
      </a>
      <a className={isProfile} onClick={handleProfile}>
        {/* <img className="" src={me} alt="Profile" /> */}
        <i>person</i>
        <span>Profile</span>
      </a>
    </div>
  );
};

export default Navbar;
