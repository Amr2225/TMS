import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import FormInputs from "../Components/Register Inputs/FormInputs";
import { validatedEmail, validationLogin } from "../Forms Validation/Validation";
import { Message } from "../Components";
import apis from "../services/api";
import { setAuthToken, getAuthToken } from "../services/auth/auth";
import { useDispatch } from "react-redux";
import { setData } from "../Redux/UserReducer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(["", "", false]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (getAuthToken().token) navigate("/");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validationLogin(email, password)) {
      setShowMessage(["All fields are required", "error", true]);
    }
    if (!validatedEmail(email)) {
      setShowMessage(["Invalid Email format.", "error", true]);
      return;
    }

    try {
      const res = await apis.auth.post("/Login", {
        email: email,
        password: password,
      });
      console.log(res.data);
      const userData = setAuthToken(res.data);
      //User Data taken from token
      dispatch(
        setData({
          email: userData.email,
          id: userData.nameid,
          userName: userData.unique_name,
          role: userData.role,
        })
      );

      setShowMessage(["login successfully", "success", true]);
      if (userData.role == "developer") {
        setTimeout(() => {
          navigate("/"); //to be changened later
        }, 500);
      } else if (userData.role == "team-leader") {
        setTimeout(() => {
          navigate("/"); // to changened later
        }, 500);
      }
    } catch (err) {
      if (err.response.status === 400) setShowMessage([err.response.data, "error", true]);
      else console.error("Error: ", err);
    }
  };

  return (
    <main className='grid place-content-center h-screen overflow-hidden'>
      <div className='w-96  bg-neutral-800 border border-neutral-700 rounded-md p-4 shadow-xl shadow-neutral-950'>
        <h1 className='text-neutral-100 text-center pt-2 text-3xl font-bold'>Login</h1>
        <form action='#' className='flex flex-col gap-2 mt-5'>
          <FormInputs Data={[email, setEmail]} title='Email' type='email' />
          <FormInputs Data={[password, setPassword]} title='Password' type='password' />
          <button
            type='submit'
            onClick={handleLogin}
            className='bg-neutral-50 hover:bg-neutral-300 hover:scale-95 text-neutral-950 px-3 py-2 mt-2 w-[70%] mx-auto rounded-md transition-all duration-200'
          >
            Login
          </button>
          <span className='text-sm text-center text-neutral-100/50 '>
            Don't have an account
            <Link
              to={"/register"}
              className='underline cursor-pointer hover:bg-neutral-100 hover:text-neutral-950 px-1 py-0.5 transition duration-200 rounded-sm hover:no-underline'
            >
              Sign Up
            </Link>
          </span>
        </form>
      </div>
      <AnimatePresence>
        {showMessage[2] && (
          <Message message={showMessage[0]} status={showMessage[1]} setMessage={setShowMessage} />
        )}
      </AnimatePresence>
    </main>
  );
};

export default LoginPage;
