import { createBrowserRouter } from "react-router-dom";
import { DevHomePage, HomePage, LoginPage, RegisterPage } from "../Pages";
import { TasksBoard } from "../Components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "/dashboard",
        element: <TasksBoard />,
      },
      {
        path: "/tdashboard",
        element: <DevHomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dev",
    element: <DevHomePage />,
  },
  {
    path: "*",
    element: (
      <h1 className='text-center mt-10 text-3xl text-neutral-50 font-bold'>404 Not Found</h1>
    ),
  },
]);

export default router;
