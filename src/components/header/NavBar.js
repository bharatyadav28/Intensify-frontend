import React from "react";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsListUl, BsCaretDownFill as ExpandIcon } from "react-icons/bs";

import classes from "./NavBar.module.css";
import logo from "../../assests/logo.png";
import useHttp from "../../hooks/use-http";
import { IconContext } from "react-icons";
import { BsSearch as SearchIcon } from "react-icons/bs";
import { notifySuccess } from "../../utlils";
import { currentUserActions } from "../../store/current-user";
import { LoadingPageOverlay } from "../../pages/LoadingPage";
import { ClockSpinner as LoadingSpinner } from "../UI/LoadingSpinner";
import CartHeaderIcon from "./CartHeaderIcon";
import useIsAuthenticated from "../../hooks/isAuthenticated";
import mylearningApi from "../../store/apis/mylearning-api";
import cartApi from "../../store/apis/cart-api";
import courseVideosApi from "../../store/apis/course-videos";

const NavBar = ({ clearLoginStorage }) => {
  const [showNav, setShowNav] = useState(false);
  const currentUser = useSelector((state) => state.currentUser.user);
  const dispatch = useDispatch();
  const { isLoading, error, dbConnect, setError } = useHttp();

  const { validUser, setValidUser } = useIsAuthenticated();

  if (isLoading) {
    return (
      <LoadingPageOverlay>
        <LoadingSpinner />
      </LoadingPageOverlay>
    );
  }

  // notifySuccess(currentUser?.name);
  const handleShowNav = () => {
    setShowNav((prevState) => !prevState);
  };

  let screenWidth = window.screen.width;
  const navLinkVisible = showNav || screenWidth >= 992;

  const handleLogout = () => {
    const postRequest = (data) => {
      notifySuccess("Logout Successfull");
      localStorage.removeItem("login");
      clearLoginStorage();
      dispatch(currentUserActions.removeUser());
      dispatch(mylearningApi.util.resetApiState());
      dispatch(cartApi.util.resetApiState());
      dispatch(courseVideosApi.util.resetApiState());
      setValidUser(false);
    };
    dbConnect({ url: "/api/v1/auth/logout", method: "delete" }, postRequest);
  };

  let authLink = "";
  if (!currentUser) {
    authLink = <Link to="/login">Login</Link>;
  } else {
    authLink = <Link onClick={handleLogout}>Logout</Link>;
  }

  return (
    <ul className={`${classes.navbar}`}>
      <li className={classes.logo}>
        <div className="d-flex ">
          <Link to="/">
            <img src={logo} alt="Logo" width={"40px"} height={"50px"} />
          </Link>
          <button
            onClick={handleShowNav}
            className="ms-auto me-2 d-lg-none justify-content-end p-0 border-0 bg-white"
          >
            <IconContext.Provider
              value={{
                size: "30px",
              }}
            >
              <BsListUl height="10px" />
            </IconContext.Provider>
          </button>
        </div>
      </li>
      {navLinkVisible && (
        <li className="mr-auto">
          {/* <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            to="/"
          >
            Home
          </NavLink> */}
          <Link to="/">Home</Link>
        </li>
      )}

      {navLinkVisible && (
        <li className={classes.dropdown}>
          <button className={classes.dropbtn}>
            Courses <ExpandIcon />
          </button>
          <div className={classes["dropdown-content"]}>
            <NavLink
              to="/courses/64c2214d136235bc26ea8b23"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Embeded System
            </NavLink>
            <NavLink
              to="/courses/64bf82f86ad2e8a53b6c2dd4"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              IOT(Internet Of Things)
            </NavLink>
            <NavLink
              to="/courses/64c22d415065e53026065109"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              PCB Designs
            </NavLink>

            <NavLink
              to="/courses/64c22e1e5065e53026065119"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              IOT Web Development
            </NavLink>

            <NavLink
              to="/courses/64c22e845065e53026065129"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              IOT Mobile Development
            </NavLink>
          </div>
        </li>
      )}

      {navLinkVisible && (
        <li className="ms-lg-auto me-lg-2 ">
          <Link to="/courses?page=1">
            <SearchIcon size={20} />
          </Link>
        </li>
      )}

      {validUser && navLinkVisible && (
        <li className=" me-lg-2 ">
          <Link to="/mylearning">My Learning</Link>
        </li>
      )}

      {navLinkVisible && (
        <li className=" me-lg-2 ">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <CartHeaderIcon />
          </NavLink>
        </li>
      )}

      {navLinkVisible && <li className=" me-lg-2 ">{authLink}</li>}

      {/* {navLinkVisible && (
        <div>
          <li className="ms-lg-auto me-lg-2 ">
            <Link to="/courses">
              <SearchIcon />
            </Link>
          </li>
          <li className="ms-lg-auto me-lg-2 ">
            <Link to="/">Login</Link>
          </li>
        </div>
      )} */}
    </ul>
  );
};

export default NavBar;
