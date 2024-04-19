import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInfo } from "react-icons/fa";

import FormInputs from "../Components/Register Inputs/FormInputs";
import { validatePassword, validation } from "../Forms Validation/Validation";
import { Message } from "../Components";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showMessage, setShowMessage] = useState(["", "", false]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validation(firstName, lastName, email, password)) {
      setShowMessage(["All fields are required", "error", true]);
      return;
    }
    if (!validatePassword(password, confirmPassword)) {
      setShowMessage(["Password Doesn't Match", "error", true]);
      return;
    }

    //Show the message with success
    setShowMessage(["Account Created Successfully", "success", true]);
  };

  return (
    <main className='grid place-content-center h-screen overflow-hidden'>
      <div className='w-96 h-96 bg-neutral-800 border border-neutral-700 rounded-md p-4 shadow-xl shadow-neutral-950'>
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