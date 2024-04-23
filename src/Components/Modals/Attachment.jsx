import { useRef, useCallback, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

const Attachment = ({ setIsMenuOpen }) => {
  const [files, setFiles] = useState([]);
  const containerRef = useRef(null);

  const handleMenuClose = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  const listVariants = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Set the stagger delay between child animations
      },
    },
    hidden: {
      opacity: 0,
    },
  };

  const itemVariants = {
    visible: {
      opacity: 1,
      y: 0,
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("files", files);
    const stringList = files.join("##"); //The type that will be saved in the database
    console.log(stringList);

    const newList = stringList.split("##"); //Revert to a normal list
    console.log("New List", newList);
  };

  const onDrop = useCallback((acceptedFiles) => {
    for (const file of acceptedFiles) {
      setFiles((old) => [...old, file.name]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      onClick={handleMenuClose}
      className='fixed top-1/2 left-1/2 inset-0 -translate-x-[50%] -translate-y-[50%] grid place-content-center backdrop-blur-sm  h-screen w-screen z-50'
    >
      <div
        ref={containerRef}
        className='bg-neutral-800 border border-neutral-700 shadow-xl rounded-md text-neutral-100 p-10 w-[600px] max-h-[600px]'
      >
        <h1 className='border-b mb-8 text-2xl pb-1'>Add Attachment</h1>
        {files.length ? (
          <motion.div
            initial='hidden'
            animate='visible'
            variants={listVariants}
            className='max-h-[400px] overflow-y-scroll scroll-bar-webkit'
          >
            {files.map((file, index) => (
              <motion.div
                variants={itemVariants}
                key={index}
                className='bg-neutral-700/30 border border-neutral-600 w-full py-1.5 rounded-sm px-2 mt-2'
              >
                {file}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <>
            <div
              {...getRootProps()}
              className={`border border-neutral-500 bg-neutral-500/20 h-72 rounded-md grid place-content-center hover:bg-violet-400/20 hover:border-violet-400 group transition duration-100 cursor-pointer ${
                isDragActive && "border-violet-400 bg-violet-400/20"
              }`}
            >
              <input {...getInputProps()} />
              <FaFileUpload
                className={`text-6xl text-neutral-500/50 group-hover:text-violet-500/50 transition duration-100 group-hover:animate-bounce ${
                  isDragActive && "animate-bounce text-violet-500/50"
                }`}
              />
            </div>
          </>
        )}
        <div className='flex justify-between place-items-center mt-4'>
          <button
            onClick={handleSubmit}
            className='bg-green-800 text-neutral-100 py-1.5 w-[40%] rounded-md hover:bg-green-700 hover:scale-95 transition duration-200'
          >
            Submit
          </button>
          <button
            onClick={() => setIsMenuOpen(false)}
            className='bg-red-800 text-neutral-100 px-2 py-1.5 w-[40%] rounded-md hover:bg-red-700 hover:scale-95 transition duration-200'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attachment;
