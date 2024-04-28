import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import FormInputs from "../Components/Register Inputs/FormInputs";
import { validatePassword, validation, validatedEmail } from "../Forms Validation/Validation";
import { Message } from "../Components";
import apis from "../services/api";
import { getAuthToken } from "../services/auth/auth";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showMessage, setShowMessage] = useState(["", "", false]);
  const navigate = useNavigate();

  useEffect(() => {
    if (getAuthToken().token) navigate("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation(firstName, lastName, password)) {
      setShowMessage(["All fields are required", "error", true]);
      return;
    }

    if (!validatedEmail(email)) {
      setShowMessage(["Email is invalid", "error", true]);

      return;
    }

    if (!validatePassword(password, confirmPassword)) {
      setShowMessage(["Password Doesn't Match", "error", true]);
      return;
    }

    //Adding the user to the database
    await apis.auth
      .post("/Register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        roleId: 1,
      })
      .then(() => {
        setShowMessage(["Account Created Successfully", "success", true]); //Show the message with success
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((err) => {
        if (err.status == 400) setShowMessage([err.response.data, "error", true]);
        else console.error(err);
      });
  };

  return (
    <main className='grid place-content-center h-screen overflow-hidden'>
      <div className='w-96  bg-neutral-800 border border-neutral-700 rounded-md p-4 shadow-xl shadow-neutral-950'>
        <h1 className='text-neutral-100 text-center pt-2 text-3xl font-bold'>Register</h1>
        <form action='#' className='flex flex-col gap-2 mt-5'>
          <FormInputs registerData={[firstName, setFirstName]} title='First Name' type='text' />
          <FormInputs registerData={[lastName, setLastName]} title='Last Name' type='text' />
          <FormInputs registerData={[email, setEmail]} title='Email' type='email' />
          <FormInputs registerData={[password, setPassword]} title='Password' type='password' />
          <FormInputs
            registerData={[confirmPassword, setConfirmPassword]}
            title='Confirm Password'
            type='password'
          />
          <button
            type='submit'
            onClick={handleSubmit}
            className='bg-neutral-50 hover:bg-neutral-300 hover:scale-95 text-neutral-950 px-3 py-2 mt-2 w-[70%] mx-auto rounded-md transition-all duration-200'
          >
            Create Account
          </button>
          <span className='text-sm text-center text-neutral-100/50 '>
            Have an account
            <Link
              to={"/login"}
              className='underline cursor-pointer hover:bg-neutral-100 hover:text-neutral-950 px-1 py-0.5 transition duration-200 rounded-sm hover:no-underline'
            >
              Log in
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

export default RegisterPage;
