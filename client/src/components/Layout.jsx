import Navbar from "./Navbar";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Layout = ({ children }) => {
  const { loading } = useContext(AuthContext);
  return (
    <>
      {!loading && <Navbar />}
      <main className="responsive">{children}</main>
    </>
  );
};

export default Layout;
