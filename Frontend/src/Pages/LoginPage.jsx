import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import FormInputs from "../Components/Register Inputs/FormInputs";
import { validatedEmail, validationLogin } from "../Forms Validation/Validation";
import { Message } from "../Components";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showMessage, setShowMessage] = useState(["", "", false]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validationLogin(email, password)) {
      setShowMessage(["All fields are required", "error", true]);
    }
    if (!validatedEmail(email)) {
      setShowMessage(["Invalid Email format.", "error", true]);
      return;
    }
    //Show the message with success
    setShowMessage(["login successfully", "success", true]);
  };

  return (
    <main className='grid place-content-center h-screen overflow-hidden'>
      <div className='w-96  bg-neutral-800 border border-neutral-700 rounded-md p-4 shadow-xl shadow-neutral-950'>
        <h1 className='text-neutral-100 text-center pt-2 text-3xl font-bold'>Login</h1>
        <form action='#' className='flex flex-col gap-2 mt-5'>
          <FormInputs registerData={[email, setEmail]} title='Email' type='email' />
          <FormInputs registerData={[password, setPassword]} title='Password' type='password' />
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
