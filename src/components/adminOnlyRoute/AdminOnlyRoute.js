import React from "react";
import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/features/authSlice";
import { Link } from "react-router-dom";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "test@gmail.com") {
    return children;
  }
  return (
    <section style={{ height: "80vh" }}>
      <div className='container'>
        <h2>Permission denied!</h2>
        <p>This page can only be viewed by an admin user.</p>
        <br />
        <Link to='/'>
          <button className='--btn '>&larr; Back to Home</button>
        </Link>
      </div>
    </section>
  );
};
export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "test@gmail.com") {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
