import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import api from "../services/api";

const ProfilePage = () => {
  const { user, token } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    profilePicture: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Error updating profile.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Profile Page</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className=" padding field border grid items-center">
          <p className="s2">Photo</p>
          <button className=" s2 circle transparent">
            <input
              type="file"
              accept="image/*;capture=camera"
              //   onChange={}
              className=""
            />
            <i>image</i>
          </button>
        </div>
        <button type="submit">Update Profile</button>
      </form>
      {profile.profilePicture && (
        <div>
          <h3>Profile Picture</h3>
          <img src={profile.profilePicture} alt="Profile" />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
