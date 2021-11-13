import React, { useState } from "react";
import { FaBookReader, FaCaretDown } from "react-icons/fa";
import { BiMenuAltLeft } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./nav.scss";

const Dropdown = (props) => {
  const { signoutHandler } = props;

  return (
    <div className="dropdown">
      <ul className="dropdown-content">
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="#" onClick={signoutHandler}>
            SignOut
          </Link>
        </li>
      </ul>
    </div>
  );
};

function Nav(props) {
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;

  const [toggle, setToggle] = useState(false);

  const DropdownHandler = () => {
    setToggle(!toggle);
  };
  const defaultImageLink = "uploads/default.jpeg";
  return (
    <nav>
      <div className="toggle-menu">
        <BiMenuAltLeft size="2em" onClick={props.handleToggleClick} />
      </div>

      <div className="nav-brand">
        <Link to="/stories" className="nav__brand__link">
          <FaBookReader />
          <h1>Stories</h1>
        </Link>
      </div>
      <ul>
        {userInfo ? (
          <div onClick={DropdownHandler}>
            <img
              src={
                userInfo.profileImage === '' ? defaultImageLink : userInfo.profileImage
              }
              alt="profile"
              className="nav__profileAvatar"
            />

            {toggle && (
              <Dropdown
                userInfo={userInfo}
                signoutHandler={props.signoutHandler}
              />
            )}
          </div>
        ) : (
          <li className="nav__item">
            <Link to="/login" className="nav__link">
              SignIn
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
