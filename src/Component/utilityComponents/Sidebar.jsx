import React from "react";
import { FaBook, FaUserAlt, FaPen } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import "./sidebar.scss";

function Sidebar(props) {
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;

  return (
    <aside>
      <ul>
        <li>
          <Link to="/">
            <FaBook size="1em" /> Stories
          </Link>
        </li>
        <li>
          {" "}
          <Link to="/authors">
            <FaUserAlt size="1em" /> Authors
          </Link>{" "}
        </li>

        {userInfo ? (
          <React.Fragment>
            <li>
              {" "}
              <Link to="/mystories">
                <FaBook size="1em" /> My Stories
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/write">
                <FaPen size="1em" /> Write
              </Link>{" "}
            </li>
          </React.Fragment>
        ) : null}

        {userInfo ? null : (
          <li>
            <Link to="/login">
              <IoLogIn size="1.3em" /> SignIn
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
