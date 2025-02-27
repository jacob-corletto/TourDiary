import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostcardForm from "./pages/PostcardForm";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import "beercss";
import "material-dynamic-colors";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<ProtectedRoute element={<HomePage />} />}
            />
            <Route
              path="/add-postcard"
              element={<ProtectedRoute element={<PostcardForm />} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute element={<ProfilePage />} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
