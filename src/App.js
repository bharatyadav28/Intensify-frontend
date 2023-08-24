import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import ErrorPage from "./pages/ErrorPage";
import AllCourses from "./pages/AllCourses";
import { Signup, Login } from "./pages/Auth";
import VerifyUser from "./components/auth/VerifyUser";
import retreiveCourses from "./store/courses-action";
import retreiveCurrentUser from "./store/current-user-action";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./components/stripe/PaymentSuccess";
import MyLearning from "./components/myLearning/MyLearning";
import useIsAuthenticated from "./hooks/isAuthenticated";
import { ClockSpinner } from "./components/UI/LoadingSpinner";
import { LoadingPageOverlay } from "./pages/LoadingPage";

import { loader as CourseLoader } from "./pages/Courses";
import { loader as HomePageLoader } from "./pages/Home";
import { notifySuccess } from "./utlils";
import favicon from "./assests/IntensifyPic.png";

function App() {
  const dispatch = useDispatch();
  const { user: currentUser, isLoading: currentUserLoading } = useSelector(
    (state) => state.currentUser
  );

  const [newLogin, setNewLogin] = useState(false);
  const [initalLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    dispatch(retreiveCourses());
  }, []);

  useEffect(() => {
    dispatch(retreiveCurrentUser());
  }, [newLogin]);

  const handleLoginStorage = () => {
    let isLoggedIn = localStorage.getItem("login");

    if (isLoggedIn) {
      setNewLogin(true);
    } else {
      setNewLogin(false);
    }
  };

  const loadSite = initalLoading && (
    <LoadingPageOverlay>
      <img className="load-img" src={favicon} />
    </LoadingPageOverlay>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setInitialLoading(false);
    }, 1000 * 2);

    return () => clearInterval(interval);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root clearLoginStorage={handleLoginStorage} />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: HomePageLoader,
        },
        {
          path: "courses",
          element: <AllCourses />,
        },

        {
          path: "courses/:id",
          element: <Courses />,
          loader: CourseLoader,
        },
        {
          path: "cart",
          element: (
            // <Authenticated>
            <Cart />
            // </Authenticated>
          ),
        },
        {
          path: "payment",

          children: [
            {
              index: true,
              element: <Checkout />,
            },
            {
              path: "success",
              element: <PaymentSuccess />,
            },
          ],
        },
        {
          path: "mylearning",
          element: <MyLearning />,
        },
      ],
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login createLoginStorage={handleLoginStorage} />,
    },
    {
      path: "/user/verify-email",
      element: <VerifyUser />,
    },
  ]);

  return (
    <div className="App">
      {loadSite}

      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
