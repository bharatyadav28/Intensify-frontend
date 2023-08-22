import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
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

import { loader as CourseLoader } from "./pages/Courses";
import { loader as HomePageLoader } from "./pages/Home";
import { notifySuccess } from "./utlils";

function App() {
  const dispatch = useDispatch();
  const { validUser } = useIsAuthenticated();

  useEffect(() => {
    dispatch(retreiveCourses());
    dispatch(retreiveCurrentUser());
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
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
      element: <Login />,
    },
    {
      path: "/user/verify-email",
      element: <VerifyUser />,
    },
  ]);

  return (
    <div className="App">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
