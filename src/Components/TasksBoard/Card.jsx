import { AnimatePresence, motion } from "framer-motion";
import DropIndicator from "./DropIndicator";

import { LiaCommentSolid } from "react-icons/lia";
import { useState } from "react";

const Card = ({ title, id, column, TransferData }) => {
  const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false);
  const handleClick = () => {
    alert("test");
  };

  //The all the developers
  const developers = [
    {
      id: 1,
      name: "Amr Mohamed",
      taskId: 2,
    },
    {
      id: 2,
      name: "Walid",
      taskId: 3,
    },
  ];

  // Assigned developers to each task
  const assignedDevelopers = developers.filter((developer) => developer.taskId === id);

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        onClick={handleClick}
        onDragStart={(e) => TransferData(e, { title, id, column })}
        draggable='true'
        className='cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 
      active:cursor-grabbing'
      >
        <p className='text-sm text-neutral-100'>{title}</p>
        <div className='flex justify-between mt-1'>
          <div className='flex ml-2'>
            {assignedDevelopers.map((developer) => (
              <span
                key={developer.id}
                className={`w-5 h-5 shadow-icons -ml-2  bg-neutral-50 text-neutral-950 rounded-full grid place-content-center text-xs`}
              >
                {developer.name[0]}
              </span>
            ))}
            <span
              className={`w-5 h-5 shadow-icons -ml-2 bg-violet-400 hover:bg-violet-500 cursor-pointer text-neutral-50 rounded-full grid place-content-center text-xs`}
            >
              {"+" + assignedDevelopers.length}
            </span>
          </div>
          <div
            className='relative'
            onMouseEnter={() => setIsCommentMenuOpen(true)}
            onMouseLeave={() => setIsCommentMenuOpen(false)}
          >
            <LiaCommentSolid className='bg-blue-200/90 w-6 h-6 p-1 rounded-sm ' />
            <AnimatePresence>
              {isCommentMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  style={{ x: "-50%" }}
                  className='rounded border border-neutral-700 bg-neutral-800 p-3 absolute text-neutral-100 text-sm left-1/2 top-8 z-10 w-max'
                >
                  3 Comments
                  <div className='w-full h-4 bg-transparent absolute -top-4 left-0' />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Card;
