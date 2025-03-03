import Navbar from "./Navbar";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Layout = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  return (
    <>
      {!loading && user && <Navbar />}
      <main className="responsive">{children}</main>
    </>
  );
};

export default Layout;
