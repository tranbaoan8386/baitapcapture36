import { Route } from "react-router-dom";
import HomePage from "../pages/home";
import MovieDetailPage from "../pages/movie-detail";
import HomeTemplate from "../templates/HomeTemplate";
import AuthTemplate from "../templates/AuthTemplate";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import AuthCheck, { roleUser } from "../HOC/AuthCheck";
import UserInfoPage from "../pages/info-user";
import AdminTemplate from "../templates/AdminTemplate";
import AdminHomePage from "../pages/Admin/home/index";
import MovieAdminPage from "../pages/Admin/movie";
import BookingPage from "../pages/BookingPage/BookingPage";
import CreateShowtime from "../pages/Admin/showtime/CreateShowtime";
import EditUser from "../pages/Admin/editUser";
import AddUser from "../pages/Admin/addUser";
import AddMovie from "../pages/Admin/addMove";
import UpdateMovie from "../pages/Admin/updateMove";

const routers = [
  {
    path: "/",
    element: <HomeTemplate />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "detail/:movieId",
        element: (
          <AuthCheck isNeedLogin={true}>
            <MovieDetailPage />
          </AuthCheck>
        ),
      },
      {
        path: "booking/:showtimeId",
        element: (
          <AuthCheck isNeedLogin={true}>
            <BookingPage />
          </AuthCheck>
        ),
      },
      {
        path: "info",
        element: (
          <AuthCheck isNeedLogin={true}>
            <UserInfoPage />
          </AuthCheck>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthTemplate />,
    children: [
      {
        path: "login",
        element: (
          <AuthCheck isNeedLogin={false}>
            <LoginPage />
          </AuthCheck>
        ),
      },
      {
        path: "register",
        element: (
          <AuthCheck isNeedLogin={false}>
            <RegisterPage />
          </AuthCheck>
        ),
      },
    ],
  },
  {
    element: <AdminTemplate />,
    path: "admin",
    children: [
      {
        path: "",
        element: (
          <AuthCheck isNeedLogin={true} pagePermission={roleUser.ADMIN}>
            <AdminHomePage />
          </AuthCheck>
        ),
      },
      {
        path: "movie",
        element: (
          <AuthCheck isNeedLogin={true} pagePermission={roleUser.ADMIN}>
            <MovieAdminPage />
          </AuthCheck>
        ),
      },
      {
        path: "add-movie",
        element: (
          <AuthCheck isNeedLogin={true} pagePermission={roleUser.ADMIN}>
            <AddMovie />
          </AuthCheck>
        ),
      },
      {
        path: "update-movie/:maPhim",
        element: (
          <AuthCheck isNeedLogin={true} pagePermission={roleUser.ADMIN}>
            <UpdateMovie />
          </AuthCheck>
        ),
      },

      {
        path: "create-showtime/:maPhim",
        element: (
          <AuthCheck isNeedLogin={true} pagePermission={roleUser.ADMIN}>
            <CreateShowtime />
          </AuthCheck>
        ),
      },
      {
        path: "add-user",
        element: (
          <AuthCheck isNeedLogin={true} pagePermission={roleUser.ADMIN}>
            <AddUser />
          </AuthCheck>
        ),
      },
      {
        path: "edit/:taiKhoan",
        element: (
          <AuthCheck isNeedLogin={true} pagePermission={roleUser.ADMIN}>
            <EditUser />
          </AuthCheck>
        ),
      },
    ],
  },
];

export const renderRoutes = () => {
  return routers.map((template, index) => (
    <Route key={index} path={template.path} element={template.element}>
      {template.children &&
        template.children.map((item, indexChild) => (
          <Route key={indexChild} path={item.path} element={item.element} />
        ))}
    </Route>
  ));
};
