import { createBrowserRouter } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage } from "../Pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: (
      <h1 className='text-center mt-10 text-3xl text-neutral-50 font-bold'>404 Not Found</h1>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;
