import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import api from "../services/api";
import appleSoni from "../assets/appleSoni.jpeg";
import bunnySoni from "../assets/bunnySoni.jpg";
import cowSoni from "../assets/cowSoni.jpeg";
import durianSoni from "../assets/durianSoni.jpeg";
import flowerSoni from "../assets/flowerSoni.jpeg";
import penguinSoni from "../assets/penguinSoni.jpeg";
import StrawberrySoni from "../assets/StrawberrySoni.jpeg";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const pictures = [
    appleSoni,
    bunnySoni,
    cowSoni,
    durianSoni,
    flowerSoni,
    penguinSoni,
    StrawberrySoni,
  ];
  const { token, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    profilePicture: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handlePictureChange = (e) => {
    const { value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      profilePicture: value,
    }));
    console.log("Selected picture:", value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(
        "/users/profile",
        { ...profile },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Profile updated successfully!");
      setProfile(response.data);
      console.log("Profile updated:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Error updating profile.");
    }
  };

  const handleLogout = () => {
    logout();
    Navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="rubik-bubbles-regular center-align">Profile Page</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Update Profile</legend>
          {message && <p className="message">{message}</p>}
          <div className="field border label">
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              required
            />
            <label>Username</label>
          </div>
          <div className="field border label">
            <legend>Profile Picture</legend>
            <nav>
              {pictures.map((picture, index) => (
                <label key={index} className="checkbox icon">
                  <input
                    type="radio"
                    name="profilePicture"
                    value={picture}
                    checked={profile.profilePicture === picture}
                    onChange={handlePictureChange}
                  />
                  <span>
                    <i>
                      <img src={picture} alt={`Profile option ${index}`} />
                    </i>
                    <i>
                      <i>check</i>
                    </i>
                  </span>
                </label>
              ))}
            </nav>
          </div>
          <button type="submit">Update Profile</button>
        </fieldset>
      </form>
      {/* 
      {profile.profilePicture && (
        <div>
          <h3>Profile Picture</h3>
          <img src={profile.profilePicture} alt="Profile" />
        </div>
      )} */}
      <article className="medium no-padding">
        <button className="center middle large" onClick={handleLogout}>
          Logout
        </button>
      </article>
    </div>
  );
};

export default ProfilePage;
