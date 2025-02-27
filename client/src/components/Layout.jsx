import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="responsive">{children}</main>
    </>
  );
};

export default Layout;
