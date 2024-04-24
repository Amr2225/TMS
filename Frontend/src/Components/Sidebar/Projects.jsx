import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const Projects = ({ id, title }) => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  return (
    <div className='flex justify-between items-center '>
      <p className='hover:text-neutral-50'>{title}</p>
      <div
        className='relative'
        onMouseEnter={() => setIsContextMenuOpen(true)}
        onMouseLeave={() => setIsContextMenuOpen(false)}
      >
        <BsThreeDots className='text-neutral-100 hover:bg-neutral-600/40 ' />
        <AnimatePresence>
          {isContextMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              className='bg-neutral-800 border border-neutral-700 text-neutral-100 flex flex-col gap-4 place-items-start p-4 rounded-md shadow-2xl shadow-neutral-900 absolute left-3 top-0 z-50'
            >
              <button className='hover:underline'>Edit</button>
              <button className='text-red-400 hover:underline'>Delete</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
